import {h} from 'preact';
/** @jsx h */
import {route} from 'preact-router';
import {useContext} from 'preact/hooks';
import './usefulResources.css';
import ServerDataContext from '@stencil/server-data-context';
import blueRightPng from '../../assets/blue-right.png';
import FaqBannerSvg from '../../assets/faqBanner.svg';
import ilPrivateLabsPng from '../../assets/ilPrivateLabs@2x.png';
import hospitalLogoNewPng from '../../assets/hospital_new.png'


import Image from '../Image';



export default function UsefulResources() {
  const {language} = useContext(ServerDataContext);
  const {heading} = language.aarogyaMitr;
  const {homeTitle, homeCta} = language.faq;
  const {description: hospitalDescription,homeCta: hospitalHomeCta} = language.hospitalPage;
  const {description: icmrDescription, homeCta: icmrHomeCta} = language.icmrPage;
  return (
    <div className="useful-resource">
      <p className="useful-resource-title">{heading}</p>


      <div
        className="faqBannerWrap"
        onClick={() => {
          route('/ncv19/faq/');
        }}
      >
        <div className="faqBannerInfoWrap">
          <p className="faqBannerText">{homeTitle}</p>
          <p className="faqBannerLink">
            {' '}
            {homeCta} <Image src={blueRightPng} alt="click" className="rightArrrowFaq" />
          </p>
        </div>
        <div className="cardImgWrap">
          <Image src={FaqBannerSvg} alt="mitra" className="mitraImg" />
        </div>
      </div>
      <div
        className="icmrWrap"
        onClick={() => {
          route('/ncv19/icmr/');
        }}
      >
        <div className="icmrInfoWrap">
          <p className="icmrText">{icmrDescription}</p>
          <p className="icmrLink">
            {' '}
            {icmrHomeCta} <Image src={blueRightPng} alt="click" className="rightArrrowFaq" />
          </p>
        </div>
        <div className="cardImgWrap">
          <Image src={ilPrivateLabsPng} alt="mitra" className="mitraImg" />
        </div>
      </div>
      <div
        className="hospitalWrap"
        onClick={() => {
          route('/ncv19/hospital/');
        }}
      >
        <div className="hospitalInfoWrap">
          <p className="hospitalText">{hospitalDescription}</p>
          <p className="hospitalLink">
            {' '}
            {hospitalHomeCta} <Image src={blueRightPng} alt="click" className="rightArrrowFaq" />
          </p>
        </div>
        <div className="cardImgWrap">
          <Image src={hospitalLogoNewPng} alt="mitra" className="mitraImg" />
        </div>
      </div>
    </div>
  );
}
