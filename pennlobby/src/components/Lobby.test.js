import React from 'react';
import { render } from '@testing-library/react';
import Album from './Lobby';

test('button test', () => {
  render(<Album />);
  const home = document.querySelector('[id=home]');
  home.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  const button2 = document.querySelector('[id=mygroups]');
  button2.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  const button3 = document.querySelector('[id=myposts]');
  button3.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  const button4 = document.querySelector('[id=messages]');
  button4.dispatchEvent(new MouseEvent('click', { bubbles: true }));
});