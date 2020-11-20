import {h} from 'preact';

import './header.css';
import UserCountStrip from './UserCountStrip';
import NavigationBar from './NavigationBar';
/** @jsx h */
const Header = () => {
  return (
    <div className="pageContentWrapper">
      <UserCountStrip />
      <NavigationBar />
    </div>
  );
};

export default Header;
