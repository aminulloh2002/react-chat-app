import React from 'react';
import ReactDOM from 'react-dom';
import AuthSignIn from './AuthSignIn';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AuthSignIn />, div);
  ReactDOM.unmountComponentAtNode(div);
});