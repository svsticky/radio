import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';
import Settings from '../settings';

render(<App apiRoot={Settings.endpoints.root}/>, document.getElementById('root'));
