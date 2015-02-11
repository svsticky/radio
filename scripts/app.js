const React = require('react/addons');
const Marty = require('marty');

const EventsStateMixin = require('./stores/EventsStore').EventsStateMixin;

const Calendar = React.createClass({
  render () {
    return (
      <ul className="calendar">
        {this.props.events.map((e,i) => {
          var classString = "event";
          if (this.props.currentEvent == i) {
            classString += " selected";
          }
          var days = new Array(
            "Zondag",
            "Maandag",
            "Dinsdag",
            "Woensdag",
            "Donderdag",
            "Vrijdag",
            "Zaterdag"
          );
          var months = new Array(
            "januari",
            "februari",
            "maart",
            "april",
            "mei",
            "juni",
            "juli",
            "augustus",
            "september",
            "oktober",
            "november",
            "december"
          );
          var date = new Date(e.date);
          var dateOutput = [
            days[date.getDay()],
            date.getDate(),
            months[date.getMonth()],
            date.getFullYear()
          ].join(" ");
          return (
            <li className={classString}>
              <h1 className="title">{e.name} </h1>
              <h2 className="date">{dateOutput} { e.location ? ("@ " + e.location) : null }</h2>
              <p className="time">{e.startTime} { e.endTime ? ('- ' + e.endTime) : null }</p>
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
    if (poster) {
//      style.backgroundImage = "url("+poster.poster+")";
    }
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
