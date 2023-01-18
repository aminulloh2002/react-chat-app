import React from 'react';
import ReactDOM from 'react-dom';
import ChatRoom from './ChatRoom';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChatRoom />, div);
  ReactDOM.unmountComponentAtNode(div);
});