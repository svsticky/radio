import React from 'react';
import FluxComponent from 'flummox/component';
import Flux from './Flux';
import Stylesheet from 'react-style';
import Poster from './components/Poster';
import Activities from './components/Activities';


// for promises etc
require('babel/polyfill');

const styles = Stylesheet.create({
  app: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#333',
    display: 'flex',
  },
  left: {
    flexGrow: 1,
    flexDirection: 'column',
    height: '20vh'
  },
  logo: {
    display: 'flex',
    marginBottom: '5vh'
  },
  logoImg: {
    marginLeft: 'auto',
    marignRight: 'auto',
    height: '20vh'
  }
});

class App extends React.Component {
  render() {
    return <div style={styles.app}>
        <div style={styles.left}>
          <div style={styles.logo}>
            <img style={styles.logoImg} src="https://stickyutrecht.nl/wp-content/uploads/logo-sticky-licht1.png" />
          </div>
          <FluxComponent connectToStores={'activities'}>
            <Activities />
          </FluxComponent>
        </div>
        <FluxComponent connectToStores={'activities'}>
          <Poster />
        </FluxComponent>
    </div>;
  }
}

var flux = new Flux();

const seconds = 1000;
const minutes = 60 * seconds;

const koalaActions = flux.getActions('koala');
koalaActions.getData();
setInterval(() => koalaActions.getData(), 5 * minutes);
setInterval(() => koalaActions.next(), 2 * seconds);

React.render(
  <FluxComponent flux={flux}>
    <App />
  </FluxComponent>,
  document.body);


