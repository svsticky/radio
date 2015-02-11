
const React = require('react/addons');
const Marty = require('marty');
var Promise = require('bluebird');

const EventsStoreI = require('./stores/EventsStore');
const EventsStore = EventsStoreI.EventsStore;
const EventsStateMixin = EventsStoreI.EventsStateMixin;

const Calendar = React.createClass({
  render () {
    return (
      <ul className="calendar">
        {this.props.events.map((e,i) => {
          console.log(e);
          var classString = "event";
          var style = {};
          if (this.props.currentEvent == i) {
            classString += " selected";
            style.backgroundColor = e.bg;
            style.color = e.fg;
          }
          return (
            <li style={style} className={classString}>
              <h1>{e.name}</h1>
              <h2>{e.date}</h2>
              <p>{e.startTime} - {e.endTime}</p>
            </li>
          );
        })}
      </ul>
    ); 
  }
});

const Posters = React.createClass({
  render() {
    return (
      <ul className="posters"> 
        {this.props.posters.map((e,i) => {
          var classString = "poster";
          if (this.props.currentPoster == i) {
            classString += " selected";
          }
          return (
            <li className={classString}>
              <img src={e} />
            </li>
          );
        })}
      </ul>
    );
  }
});

const App = React.createClass({
  mixins: [EventsStateMixin],
  render () {
    var poster = this.state.events[this.state.currentEvent];
    var style = {
      zIndex: -1,
      WebkitFilter: "blur(10px)",
      position: "absolute",
      left: "-100px",
      right: "-100px",
      bottom: "-100px",
      top: "-100px",
      overflow: "hidden",
      backgroundColor: "black"
    };
    var posters = this.state.events.map((e)=>e.poster);
    return (
      <section className="radio"> 
        {posters.map((e,i) => {
          var classString = "background";
          if (this.state.currentEvent == i) {
            classString += " selected";
          }
          return (
            <div className={classString}>
              <img src={e} />
            </div>
          );
        })}


        <Calendar currentEvent={this.state.currentEvent} events={this.state.events} />
        <Posters currentPoster={this.state.currentEvent} posters={posters} />
        <img className="sticky" src="//stickyutrecht.nl/wp-content/uploads/logo-sticky-licht1.png" />
         <div className="right" />
      </section>
    );
  }
});

module.exports = App;
