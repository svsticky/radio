const Marty = require('marty');
const RadioActionCreators = require('../actions/RadioActionCreators');

module.exports = Marty.createStateSource({
  type: 'http',
  //baseUrl: 'http://localhost:3000',
  getEvents () {
    return this.get('/events.json').then(function(res){
      RadioActionCreators.receiveEvents(res.body);
    }).catch(function(e){console.log(e.stack)});
  }
});
