import {useContext} from 'preact/hooks';
import {h} from 'preact';
/** @jsx h */
import ServerDataContext from '@stencil/server-data-context';
import {Link, Match} from 'preact-router/match';
import userStatusActivePng from '../../assets/youstatusactive.png';
import userStatusInactivePng from '../../assets/yourstatus.png';
import icMediaActivePng from '../../assets/icMediaActive.png';
import icMediaInactivePng from '../../assets/icMedia.png';
import icStatsActivePng from '../../assets/icStatsactive.png';
import icStatsInactivePng from '../../assets/icStatsinactive.png';
import icEpassActivePng from '../../assets/icEpassactive.png';
import icEpassInactivePng from '../../assets/icEpass.png';

import Image from '../Image';

// This component is responsible for navigation between multiple route pages
// Currently only 4 pages are being supported - Status (default page) + Media + Update + Epass
const NavigationBar = () => {
  const {language} = useContext(ServerDataContext);
  const {navStatus, navUpdate, navMedia, navEpass} = language.nav;

  return (
    <div className="statusOuterWrapper">
      <Link class="statusInnerWrapper" activeClassName="active" href="/ncv19/">
        <Match path="/ncv19/">
          {({matches}) =>
            (matches && <Image className="navigationBarIcon" src={userStatusActivePng} />) || (
              <Image className="navigationBarIcon" src={userStatusInactivePng} />
            )}
        </Match>
        <p className="statusText">{navStatus}</p>
        <span className="inactiveBorder" />
      </Link>
      <Link class="statusInnerWrapper" activeClassName="active" href="/ncv19/media/">
        <Match path="/ncv19/media/">
          {({matches}) =>
            (matches && <Image className="navigationBarIcon" src={icMediaActivePng} />) || (
              <Image className="navigationBarIcon" src={icMediaInactivePng} />
            )}
        </Match>
        <p className="statusText">{navMedia}</p>
        <span className="inactiveBorder" />
      </Link>
      <Link class="statusInnerWrapper" activeClassName="active" href="/ncv19/stats/">
        <Match path="/ncv19/stats/">
          {({matches}) =>
            (matches && <Image className="navigationBarIcon" src={icStatsActivePng} />) || (
              <Image className="navigationBarIcon" src={icStatsInactivePng} />
            )}
        </Match>
        <p className="statusText">{navUpdate}</p>
        <span className="inactiveBorder" />
      </Link>
      <Link class="statusInnerWrapper" activeClassName="active" href="/ncv19/epass/">
        <Match path="/ncv19/epass/">
          {({matches}) =>
            (matches && <Image className="navigationBarIcon" src={icEpassActivePng} />) || (
              <Image className="navigationBarIcon" src={icEpassInactivePng} />
            )}
        </Match>
        <p className="statusText">{navEpass}</p>
        <span className="inactiveBorder" />
      </Link>
    </div>
  );
};

export default NavigationBar;
