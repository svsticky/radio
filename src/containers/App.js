import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import Poster from '../components/Poster';
import Calendar from '../components/Calendar';


// Turns the activity's start_date from a string into a Date object,
// and if the end_date exists, also turns that to a Date object
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

  static get defaultProps() {
    return {
      loadInterval: 15*60*1000,
      nextInterval: 2*1000
    };
  }

  static get propTypes() {
    return {
      loadInterval: PropTypes.number,
      nextInterval: PropTypes.number,
      apiRoot: PropTypes.string.isRequired
    };
  };

  constructor(props) {
    super(props);

    this.activitiesEndpoint = `${this.props.apiRoot}/activities`;
    this.adsEndpoint = `${this.props.apiRoot}/advertisements`;

    this.state = {
      dataReceived: false,
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
          .then(ads => this.setState({activities, ads, dataReceived: true})));
  }

  nextAd() {
    if (this.state.currentAd === this.state.ads.length - 1) {
    // if we're at the end of the adroll, continue displaying activities
      this.setState({
        currentAd: null,
        currentActivity: 0
      });
    } else {
      // else continue displaying ads
      this.setState({
        currentAd: this.state.currentAdd === null ?  0 : this.state.currentAd + 1
      });
    }
  }

  nextActivity() {
    if (this.state.currentActivity === this.state.activities.length - 1) {
    // if we're at the end of the activities, continue displaying ads
      this.setState({
        currentActivity: null,
        currentAd: 0
      });
    } else {
      // else continue displaying activities
      this.setState({
        currentActivity: this.state.currentActivity === null ? 0 : this.state.currentActivity + 1
      });
    }
  }

  next() {
    // if there is no data yet.  we cannot go to next activity or advertisement
    
    if (this.state.dataReceived) {
      if (this.state.currentActivity === null) {
        this.nextAd();
      } else if (this.state.currentAd === null) {
        this.nextActivity();
      }
    }
  }


  componentDidMount() {
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
      <div className="app">
      </div>
    );
  }
}

