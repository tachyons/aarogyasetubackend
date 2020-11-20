import {h} from 'preact';
/** @jsx h */
import {useContext} from 'preact/hooks';
import ServerDataContext from '@stencil/server-data-context';
import ViewPng from '../../assets/view.png';

import Image from '../Image';

const UserCountStrip = () => {
  const {totalUser, language} = useContext(ServerDataContext);

  if (!totalUser) return null;

  const {other} = language;

  return (
    <div className="appUserInfo">
      <Image src={ViewPng} alt="view" />
      <p className="userCountText">
        {(totalUser / 10000000).toFixed(2)} 
        {' '}
        {other.totalAppUsers}
      </p>
    </div>
  );
};

export default UserCountStrip;
