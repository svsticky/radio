
import React from 'react';

/**
 * Poster is a component that renders a poster.
 * It doesn't care where the poster comes from. It oculd be from a commercial or
 * from an event
 */

export default class Poster extends React.Component {
  render() {
    var activity = this.props.activities[this.props.currentActivity];

    if (activity) {
      return (
        <div className="posters">
          <img src={activity.content.poster} className="poster" />
        </div>
      );
    }
    return <div className="posters"></div>
  }
}
