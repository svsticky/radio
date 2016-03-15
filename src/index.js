import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';

render(<App apiRoot='https://koala.svsticky.nl/api'/>, document.getElementById('root'));
