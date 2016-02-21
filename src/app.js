import React from 'react';
import FluxComponent from 'flummox/component';
import Flux from './Flux';
import Stylesheet from 'react-style';
import Poster from './components/Poster';
import Activities from './components/Activities';


window.React = React;
// for promises etc
require('babel/polyfill');


const domain = 'svsticky.nl';
const koala = `koala.${domain}`;
class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="cont">
          <div className="logo">
            <img src="https://svsticky.nl/wp-content/uploads/logo-sticky-licht1.png" />
          </div>
          <FluxComponent connectToStores={'activities'}>
            <Activities />
          </FluxComponent>
        </div>
        <FluxComponent connectToStores={'activities'}>
          <Poster />
        </FluxComponent>
      </div>
    );
  }
}

var flux = new Flux(koala);

const seconds = 1000;
const minutes = 60 * seconds;

const koalaActions = flux.getActions('koala');
koalaActions.getData();
setInterval(() => koalaActions.getData(), 5 * minutes);
setInterval(() => koalaActions.next(), 5 * seconds);

React.render(
  <FluxComponent flux={flux}>
    <App />
  </FluxComponent>,
  document.body);


