import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import Poster from '../components/Poster';
import Activities from '../components/Activities';
import Clock from '../components/Clock';
import BoardText from '../components/BoardText';
import Quotes from '../components/Quotes';
import Ad from '../components/Ad';

/**
 * Utility function to change dates from activities to actual Date objects
 */
function setDate(activity) {
  return Object.assign(
    {},
    activity,
    { has_start_time: activity.start_date.indexOf('T') > -1 },
    { has_end_time: activity.end_date && activity.end_date.indexOf('T') > -1 },
    { start_date: new Date(activity.start_date) },
    activity.end_date ? { end_date: new Date(activity.end_date) } : null
  );
}

/**
 * Main app entrypoint.
 */
export default class App extends Component {

  static propTypes = {
    /**
     * The interval in milliseconds that indicates how often to reload the
     * activities and advertisements from koala
     */
    loadInterval: PropTypes.number,
    /**
     * The interval in milliseconds that indicates how often we switch to
     * a next activity or advertisement
     */
    nextInterval: PropTypes.number,
    /**
     * The api root of the koala Api. an example is http://koala.svsticky.nl/api
     * for the Sticky Utrecht Koala instance
     */
    apiRoot: PropTypes.string.isRequired
  };

  /**
   * Default values for properties
   */
  static defaultProps = {
    loadInterval: parseInt(process.env.LOAD_INTERVAL),
    nextInterval: parseInt(process.env.NEXT_INTERVAL)
  };

  constructor(props) {
    super(props);

    this.activitiesEndpoint = process.env.ACTIVITY_ENDPOINT;
    this.adsEndpoint = process.env.AD_ENDPOINT;

    this.state = {
      current: "activities",
      activities: [],
      ads: [],
      index: 0
    }
  }

  loadData() {
    // See https://davidwalsh.name/fetch

    // get activities
    fetch(this.activitiesEndpoint)
      // fix activity dates and sort them on start_date
      .then(resp => resp.json())
      .then(activities => activities.map(setDate).sort((a, b) => a.start_date - b.start_date))
      .then(activities =>
        fetch(this.adsEndpoint)
          .then(resp => resp.json())
          .then(ads => {
            // make sure that we don't start scrolling activities or ads when
            // there are no activities or ads to scroll through.
            const currentActivity = activities.length > 0 ? 0 : null;
            const currentAd = currentActivity === null && ads.length > 0 ? 0 : null;
            this.setState({ activities: activities.filter(act => act.poster), ads, currentActivity, currentAd });
          }));
  }

  currentPoster() {
    let activity = this.state.activities[this.state.index];
    return activity ? activity.poster : "";
  }

  next() {
    switch (this.state.current) {
      case "activities":
        if (this.state.index >= this.state.activities.length - 1) {
          this.setState({
            current: "advertisement",
            index: 0
          });
        } else {
          this.setState({
            index: this.state.index + 1
          });
        }
        break;
      case "advertisement":
        if (this.finishedState) {
          this.finishedState = false;
          this.setState({
            current: "boardText",
            index: 0
          });
        } else {
          this.setState({
            index: this.state.index + 1
          });
        }
        break;
      case "boardText":
        this.setState({
          current: "quotes"
        });
        break;
      case "quotes":
        this.setState({
          current: "activities"
        });
        break;
      default:
        return;
    }
  }

  componentDidMount() {
    // set up intervals.
    // every this.props.loadInterval, new events are loaded from koala.
    // every this.props.nextInterval, we switch to the next ad or activity to display
    this.dataLoader =
      setInterval(this.loadData.bind(this), this.props.loadInterval);

    this.loadData();

    this.activityChanger =
      setInterval(this.next.bind(this), this.props.nextInterval);

  }

  componentWillUnmount() {
    clearInterval(this.dataLoader);
    clearInterval(this.activityChanger);
  }

  renderContent() {
    switch (this.state.current) {
      case "activities":
        return (
          <Activities 
            activities={this.state.activities} 
            currentActivity={this.state.index} 
            poster={this.currentPoster()}
          />
        );
      case "advertisement":
        return (
          <Ad 
            current={this.state.index} 
            onChange={() => {
              this.finishedState = true;
            }} 
          />
        );
      case "boardText":
        return <BoardText />
      case "quotes":
        return <Quotes />
      default:
        return;
    }
  }

  render() {
    return (
      <div className='app'>
        <div className="topbar">
          <div className='logo'>
            <img src={process.env.LOGO} />
          </div>
          <Clock />
        </div>
        {this.renderContent()}
      </div>
    );
  }
}
