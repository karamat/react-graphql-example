import 'babel/polyfill';

import AppHandler from '../shared/components/AppHandler';
import Router from '../shared/routes';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  Router,
  document.getElementById('root')
);
