import React, { FC } from 'react';
import SignOut from '../Auth/SignOut/SignOut.lazy';
import styles from './Header.module.css';

interface HeaderProps { }

const Header: FC<HeaderProps> = () => (
  <header className={styles.header}>
    <h3>React Chat Room</h3>
    <SignOut />
  </header>
);

export default Header;
