import {h} from 'preact';
/** @jsx h */

import Image from '../Image';

const SecondaryCta = ({secondCta, secondCtaIcon, secondCtaLink, lang}) => {
  if (!secondCta) return null;

  const secondCtaLinkHref = `${secondCtaLink}${
    secondCtaLink !== 'tel:1075' ? `?lang=${lang}` : ''
  }`;
  return (
    <div className="ctaInnerWrap">
      <div className="testSelfCta">
        <a href={secondCtaLinkHref} rel="noreferrer">
          <Image src={secondCtaIcon} />
          <p>{secondCta}</p>
        </a>
      </div>
    </div>
  );
};

export default SecondaryCta;
