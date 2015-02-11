const Marty = require('marty');
const RadioConstants = require('../constants/RadioConstants');

module.exports = Marty.createActionCreators({
  receiveEvents: RadioConstants.RECEIVE_EVENTS(function(events) {
    this.dispatch(events);
  }),
  nextEvent: RadioConstants.NEXT_EVENT(function() {
    this.dispatch();
  })
});
