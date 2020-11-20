import {h, Fragment} from 'preact';
/** @jsx h */
import {useContext} from 'preact/hooks';
import {route} from 'preact-router';

import ServerDataContext from '@stencil/server-data-context';

import './home-trending.css';

import mediaConfigHome from '../../pages/media/mediaConfigHome';
import {SectionComponent} from '../../pages/media/media';

import blueRightPng from '../../assets/blue-right.png';

import Image from '../Image';

function HomeTrending() {
  const {language} = useContext(ServerDataContext);

  const {seeAll} = language.mediaTab;

  return (
    <Fragment>
      <div className="trendingHomeOuterWrap">
        <SectionComponent
          maxColumns={2}
          section={mediaConfigHome(language)}
          showBorder={false}
          noPadding
          sourcePage="home"
        />
        <div
          className="seeAllWrap"
          onClick={() => {
            route('/ncv19/media/');
          }}
        >
          <p>{seeAll}</p>
          <Image src={blueRightPng} alt="right arrow" />
        </div>
      </div>
    </Fragment>
  );
}

export default HomeTrending;
