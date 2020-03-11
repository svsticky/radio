import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';
import css from './style.css';
import html from './index.html';

render(<App apiRoot='https://koala.svsticky.nl/api' />, document.getElementById('root'));
