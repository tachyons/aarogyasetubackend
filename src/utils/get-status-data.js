import statusLogic from './status-logic.json';
import illustrations1 from '../assets/illustrations/1_1.svg';
import illustrations2 from '../assets/illustrations/2.svg';
import illustrations3 from '../assets/illustrations/3.svg';
import illustrations15 from '../assets/illustrations/15.svg';
import illustrations11 from '../assets/illustrations/11.svg';
import illustrations12 from '../assets/illustrations/12.svg';
import illustrations7 from '../assets/illustrations/7.svg';
import illustrations8 from '../assets/illustrations/8.svg';
import illustrations19 from '../assets/illustrations/19.svg';
import illustrations20 from '../assets/illustrations/20.svg';
import illustrations21 from '../assets/illustrations/21.svg';
import illustrations4 from '../assets/illustrations/4_1.svg';
import illustrations5 from '../assets/illustrations/5_1.svg';
import illustrations6 from '../assets/illustrations/6.svg';
import illustrations17 from '../assets/illustrations/17.svg';
import illustrations10 from '../assets/illustrations/10.svg';
import illustrations18 from '../assets/illustrations/18.svg';
import illustrations13 from '../assets/illustrations/13.svg';
import illustrations14 from '../assets/illustrations/14.svg';
import illustrations16 from '../assets/illustrations/16.svg';

import callNewWhitePng from '../assets/call_new_white.png';
import callPurplePng from '../assets/call-purple@3x.png';
import selfAssessPurplePng from '../assets/selfAssessPurple@3x.png';
import stethoscopeonePng from '../assets/stethoscopeone.png';
import learnMoreCovidSvg from '../assets/Learnmoreaboutcovid.svg';
import safetyMeasuresSvg from '../assets/safetymeasures.svg';

const recommendationListImage = [
  illustrations1,
  illustrations2,
  illustrations3,
  illustrations2,
  illustrations15,
  illustrations16,
  illustrations2,
  illustrations11,
  illustrations12,
  illustrations7,
  illustrations2,
  illustrations8,
  illustrations2,
  illustrations19,
  illustrations20,
  illustrations21,
];

const guideLinesIllustration = [
  illustrations4,
  illustrations5,
  illustrations6,
  illustrations17,
  illustrations10,
  illustrations5,
  illustrations18,
  illustrations13,
  illustrations6,
  illustrations10,
  illustrations14,
];

const ctaMeta = [
  {
    link: 'tel:1075',
    '0': callNewWhitePng,
    '1': callPurplePng,
  },
  {
    link: '/ncv19/chat/',
    '0': stethoscopeonePng,
    '1': selfAssessPurplePng,
  },
  {
    link: '/ncv19/chat/',
    '0': stethoscopeonePng,
    '1': selfAssessPurplePng,
  },
];

const listItems = [
  {
    itemLink: 'https://www.mohfw.gov.in/pdf/Poster_Corona_ad_Eng.pdf',
    banner: learnMoreCovidSvg,
  },
  {
    itemLink: 'https://www.mohfw.gov.in/pdf/ProtectivemeasuresEng.pdf',
    banner: safetyMeasuresSvg,
  },
];

function getStatusData({status_code, selectedLanguageObj}) {
  // const selectedLanguageObj = langObject[lang] || langObject.en;
  const selectedStatus = statusLogic[status_code] || statusLogic['200'];
  const {brandColor, img} = selectedStatus;
  return {
    title: selectedLanguageObj.title,
    brandColor,
    img,
    mainText: selectedLanguageObj.mainText[selectedStatus.mainText],
    subText: selectedLanguageObj.subText[selectedStatus.subText],
    recommendText: selectedLanguageObj.recommendText[selectedStatus.recommendText],
    recommendationList: selectedStatus.recommendationList.map(index => ({
      label: selectedLanguageObj.recommendationList[index],
      img: recommendationListImage[index],
    })),
    quickRecommendationList: (selectedStatus.quickRecommendationList || []).map(index => ({
      label: selectedLanguageObj.recommendationList[index],
      img: recommendationListImage[index],
    })),
    guideLineHeading: selectedLanguageObj.guideLineHeading[selectedStatus.guideLineHeading],
    guideLines: selectedStatus.guideLines.map(index => ({
      label: selectedLanguageObj.guideLines[index],
      illustration: guideLinesIllustration[index],
    })),
    listText: selectedLanguageObj.listText[selectedStatus.listText],
    listItem: selectedStatus.listItem.map(index => ({
      ...listItems[index],
      itemText: selectedLanguageObj.listItem[index],
    })),
    recommendation_dialogue: selectedLanguageObj.recommendation_dialogue,
    cta: selectedStatus.cta.map((index, counter) => ({
      label: selectedLanguageObj.cta[index],
      link: ctaMeta[index].link,
      icon: ctaMeta[index][counter],
    })),
    redState: selectedLanguageObj.redState
  };
}

export default getStatusData;
