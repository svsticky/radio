
import React from 'react';
import StyleSheet from 'react-style';

/**
 * Poster is a component that renders a poster.
 * It doesn't care where the poster comes from. It oculd be from a commercial or
 * from an event
 */

var styles = StyleSheet.create({
  posters: {
    padding: 0,
    margin: 0,
    order: 3,
    flexBasis: `${100 / Math.sqrt(2)}vh`,
    position: 'relative'
  },
  poster: {
    position: 'absolute',
    width: `${100 / Math.sqrt(2)}vh`,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});

export default class Poster extends React.Component {
  render() {
    var activity = this.props.activities[this.props.currentActivity];

    if (activity) {
      return (
        <div style={styles.posters}>
          <img src={activity.content.poster} style={styles.poster} />
        </div>
      );
    }
    return <div></div>
  }
}
