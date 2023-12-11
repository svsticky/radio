import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';
import snowjs from './snow/snow.js';
import snow from './snow/snow.css';
import css from './style.css';
import html from './index.html';

render(<App apiRoot='https://koala.svsticky.nl/api' />, document.getElementById('root'));
