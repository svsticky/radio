const Marty = require('marty');
const RadioConstants = require('../constants/RadioConstants');
const EventsStore = Marty.createStore({
  handlers: {
    receiveEvents: RadioConstants.RECEIVE_EVENTS,
    nextEvent: RadioConstants.NEXT_EVENT
  },

  getInitialState() {
    return { currentEvent : 0, events : [] }
  },

  receiveEvents(events) {
    var yester = new Date();
    yester.setDate(yester.getDate() - 1);
    this.state.events = events.filter((e) => e.date > yester.toISOString()) ;
    this.state.currentEvent = 0;
    this.hasChanged();
  },

  nextEvent() {
    this.state.currentEvent++;
    if (this.state.currentEvent > this.state.events.length - 1) {
      this.state.currentEvent = 0;
    }
    this.hasChanged();
  },

  getEvents() {
    return this.state.events;
  },

  getCurrentEvent() {
    return this.state.currentEvent;
  }

});

exports.EventsStore = EventsStore;
exports.EventsStateMixin = Marty.createStateMixin({
  listenTo: EventsStore,
  getState() {
    return {
      currentEvent: EventsStore.getCurrentEvent(),
      events: EventsStore.getEvents()
    }
  }
});
