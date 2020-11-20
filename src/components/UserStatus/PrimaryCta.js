import {h} from 'preact';
/** @jsx h */

import Image from '../Image';

const PrimaryCta = ({mainCta, mainCtaIcon, mainCtaLink, lang}) => {

  if (!mainCta) return null;

  const mainCtaLinkHref = `${mainCtaLink}${mainCtaLink !== 'tel:1075' ? `?lang=${lang}` : ''}`;
  return (
    <div className="ctaInnerWrap">
      <div className="helpLineCta">
        <a href={mainCtaLinkHref} rel="noreferrer">
          <Image src={`${mainCtaIcon}`} />
          <p>{mainCta}</p>
        </a>
      </div>
    </div>
  );
};

export default PrimaryCta;
