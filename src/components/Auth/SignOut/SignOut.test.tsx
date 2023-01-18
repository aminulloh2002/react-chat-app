import React from 'react';
import ReactDOM from 'react-dom';
import AuthSignOut from './AuthSignOut';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AuthSignOut />, div);
  ReactDOM.unmountComponentAtNode(div);
});