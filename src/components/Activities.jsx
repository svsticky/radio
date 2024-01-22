import React, { Component } from "react";
import Activity from "./Activity";
import Poster from "./Poster";
import { KOALA_ACTIVITY_ENDPOINT } from "../helpers/env";

export default class Activities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
    };

    this.loadData();
  }

  //Utility function to change dates from activities to actual Date objects
  setDate(activity) {
    return Object.assign(
      {},
      activity,
      { has_start_time: activity.start_date.indexOf("T") > -1 },
      {
        has_end_time: activity.end_date && activity.end_date.indexOf("T") > -1,
      },
      { start_date: new Date(activity.start_date) },
      activity.end_date ? { end_date: new Date(activity.end_date) } : null
    );
  }

  // Get activities
  loadData() {
    fetch(KOALA_ACTIVITY_ENDPOINT)
      // Fix activity dates and sort them on start_date
      .then((resp) => resp.json())
      .then((activities) =>
        activities.map(this.setDate).sort((a, b) => a.start_date - b.start_date)
      )
      .then((activities) => {
        this.setState({ activities: activities.filter((act) => act.poster) });
      });
  }

  componentDidMount() {
    // Set up interval.
    // Every this.props.loadInterval, new events are loaded from koala.
    this.dataLoader = setInterval(
      this.loadData.bind(this),
      parseInt(import.meta.env.VITE_LOAD_INTERVAL)
    );
  }

  render() {
    if (this.state.activities.length > 0) {
      if (this.props.current >= this.state.activities.length - 1)
        this.props.onChange(true);

      let currentActivity = this.state.activities[this.props.current];
      return (
        <div>
          <ul className="activities">
            {this.state.activities.map((activity, i) => {
              return (
                <Activity
                  key={i}
                  {...activity}
                  active={activity === currentActivity}
                />
              );
            })}
          </ul>
          <Poster poster={currentActivity ? currentActivity.poster : null} />
        </div>
      );
    }
    return <div />;
  }
}
