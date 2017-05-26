import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';

import './index.html';

ReactDOM.render(
  <App history={history} />,
  document.getElementById('root')
);
