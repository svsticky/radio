const Marty = require('marty');
const RadioActionCreators = require('../actions/RadioActionCreators');
const ColorThief = require('../utils/ColorThief');
module.exports = Marty.createStateSource({
  type: 'http',
  getEvents () {
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
