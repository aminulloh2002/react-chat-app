import React from 'react';
import ReactDOM from 'react-dom';
import ChatMessage from './ChatMessage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChatMessage />, div);
  ReactDOM.unmountComponentAtNode(div);
});