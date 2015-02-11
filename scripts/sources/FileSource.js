const Marty = require('marty');
const RadioActionCreators = require('../actions/RadioActionCreators');
const ColorThief = require('../utils/ColorThief');
module.exports = Marty.createStateSource({
  type: 'http',
  //baseUrl: 'http://localhost:3000',
  getEvents () {
    /*return this.get('/events.json').then(function(res){
      return Promise.all(res.body.map((e) => {
        new Promise((reject, resolve) =>{
          var img = new Image();
          img.onload = () => {
            var thief = new ColorThief();
            var [ r, g, b ] = thief.getColor(img)
            var bg = `rgb(${r}, ${g}, ${b})`
            var fg = Color().light(bg) ? '#000' : '#fff'
            e.fg = fg;
            e.bg = bg;
            resolve(e);
          }
        });
      })).then((events) => RadioActionCreators.receiveEvents(events));
    }).catch(function(e){console.log(e.stack)});*/

    return this.get('/events.json').then((res) => {
        return Promise.all(res.body.map((e)=> {
          return new Promise((resolve,reject) => {
            var img = new Image();
            img.onload = () => {
              var thief = new ColorThief();
              var [ r, g, b ] = thief.getColor(img)
              var bg = `rgb(${r}, ${g}, ${b})`
              e.bg = bg;
              e.fg = "white";
              resolve(e);
            }
            img.src = e.poster;
          });
        }));
    }).then((events) => RadioActionCreators.receiveEvents(events));
  }
});
