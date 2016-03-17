import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import Poster from '../components/Poster';
import Activities from '../components/Activities';

/**
 * Utility function to change dates from activities to actual Date objects
 */
function setDate(activity) {
  return Object.assign(
    {},
    activity,
    { start_date: new Date(activity.start_date) },
    activity.end_date ? { end_date : new Date(activity.end_date) } : null
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
    loadInterval: 15*60*1000,
    nextInterval: 5*1000
  };

  constructor(props) {
    super(props);

    this.activitiesEndpoint = `${this.props.apiRoot}/activities`;
    this.adsEndpoint = `${this.props.apiRoot}/advertisements`;

    this.state = {
      currentActivity: null,
      currentAd: null,
      activities: [],
      ads: [],
    };
  }

  loadData() {
    // See https://davidwalsh.name/fetch
    
    // get activities
    fetch(this.activitiesEndpoint)
      // fix activity dates and sort them on start_date
      .then(resp => resp.json())
      .then(activities => activities.map(setDate).sort((a,b) => a.start_date - b.start_date))
      .then(activities =>
        fetch(this.adsEndpoint)
          .then(resp => resp.json())
          .then(ads => {
            // make sure that we don't start scrolling activities or ads when
            // there are no activities or ads to scroll through.
            const currentActivity = activities.length > 0 ? 0 : null;
            const currentAd       = currentActivity === null && ads.length > 0 ? 0 : null;
            this.setState({activities, ads, currentActivity, currentAd});
          }));
  }

  currentPoster() {
    if (this.state.currentActivity !== null) {
      return this.state.activities[this.state.currentActivity].poster;
    } else if (this.state.currentAd !== null) {
      return this.state.ads[this.state.currentAd].poster;
    } else {
      return 'placeholder'; // TODO funny placeholder easterergg
    }
  }


  nextAd() {
    // if there are no ads left, try switching to activities
    if (this.state.currentAd >= this.state.ads.length - 1) {
      // if we're at the end of the ads continue displaying activities,
      // if there are any. otherwise continue displaying ads.
      if (this.state.ads.length > 0) {
        this.setState({
          currentActivity: 0,
          currentAd: null
        });
      } else {
        this.setState({ currentAd: 0 });
      }
    } else {
      this.setState({
        currentAd: this.state.currentAd + 1
      });
    }
  }

  nextActivity() {
    // if there are no activities left, try switching to ads
    if (this.state.currentActivity >= this.state.activities.length - 1) {
      // if we're at the end of the activities, continue displaying ads,
      // if there are any. otherwise continue displaying activities
      if (this.state.ads.length > 0) {
        this.setState({
          currentActivity: null,
          currentAd: 0
        });
      } else {
        this.setState({ currentActivity: 0 });
      }
    } else {
      this.setState({
        currentActivity: this.state.currentActivity + 1
      });
    }
  }

  next() {
    // if there is no data yet.  we cannot go to next activity or advertisement
    if (this.state.currentActivity === null && this.state.ads.length > 0) {
      this.nextAd();
    }
    if (this.state.currentAd === null && this.state.activities.length > 0) {
      this.nextActivity();
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

  render() {
    return (
      <div className='app'>
        <div className='cont'>
          <div className='logo'>
            <img src='https://svsticky.nl/wp-content/uploads/logo-sticky-licht.png' />
          </div>
          <Activities activities={this.state.activities} currentActivity={this.state.currentActivity} />
        </div>
        <Poster poster={this.currentPoster()} />
      </div>
    );
  }
}

