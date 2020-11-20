import {h} from 'preact';
/** @jsx h */
import {useContext} from 'preact/hooks';
import './quote.css';

import ServerDataContext from '@stencil/server-data-context';

import Image from '../Image';
import icQuotePng from '../../assets/ic-quote@3x.png';
import pmModiPng from '../../assets/pm-modi@3x.png';

function Quote() {
  const {language} = useContext(ServerDataContext);
  const {quote, name, post} = language.pmCares;
  return (
    <div className="quote-outer">
      <div>
        <Image src={icQuotePng} width={31} height={26} alt="quote" />
      </div>
      <p className="quote-text">{quote}</p>
      <div className="quote-footer">
        <div className="quote-dp">
          <Image src={pmModiPng} alt="PM dp" />
        </div>
        <div className="quote-nameblock">
          <div className="quote-name">
            <span>{name}</span>
          </div>
          <div className="quote-post">
            <span>{post.replace('&apos;', "'")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quote;
