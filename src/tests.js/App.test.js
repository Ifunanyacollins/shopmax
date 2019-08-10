import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from '../App';

import createstore from  '../Store/ConfigStore'
const store = createstore()

it('renders without crashing', () => {
  const div = document.createElement('div');
  const jsx = (
    <Provider store={store}>
     <App />
  </Provider>
  )
  ReactDOM.render(jsx, div);
  ReactDOM.unmountComponentAtNode(jsx,div);
});
