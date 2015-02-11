'use strict';

var React = require('react'),
    App = require('./app');

window.Marty = require('marty');
const Source = require('./sources/FileSource.js');
const RadioActionCreators = require ('./actions/RadioActionCreators');
const SECOND = 1000;
const MINUTE = 60*SECOND;
const HOUR   = 60*MINUTE;

Source.getEvents();
setInterval(() => Source.getEvents(), 10*MINUTE);
setInterval(() => RadioActionCreators.nextEvent(), 10*SECOND);

React.render(<App />, document.body)
