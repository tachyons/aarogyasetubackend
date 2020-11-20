export default async function getAssessmentData(lang) {
  let faq;
  switch (lang) {
    case 'pu': {
      faq = await import(/* webpackChunkName: "chunk-assessment-en" */ './pu.json');
      return faq.default;
    }
    case 'mal': {
      faq = await import(/* webpackChunkName: "chunk-assessment-mal" */ './mal.json');
      return faq.default;
    }
    case 'ma': {
      faq = await import(/* webpackChunkName: "chunk-assessment-ma" */ './ma.json');
      return faq.default;
    }
    case 'od': {
      faq = await import(/* webpackChunkName: "chunk-assessment-od" */ './od.json');
      return faq.default;
    }
    case 'te': {
      faq = await import(/* webpackChunkName: "chunk-assessment-te" */ './te.json');
      return faq.default;
    }
    case 'ta': {
      faq = await import(/* webpackChunkName: "chunk-assessment-ta" */ './ta.json');
      return faq.default;
    }
    case 'ka': {
      faq = await import(/* webpackChunkName: "chunk-assessment-ka" */ './ka.json');
      return faq.default;
    }
    case 'gu': {
      faq = await import(/* webpackChunkName: "chunk-assessment-gu" */ './gu.json');
      return faq.default;
    }
    case 'ba': {
      faq = await import(/* webpackChunkName: "chunk-assessment-ba" */ './ba.json');
      return faq.default;
    }
    case 'as': {
      faq = await import(/* webpackChunkName: "chunk-assessment-as" */ './as.json');
      return faq.default;
    }
    case 'hi': {
      faq = await import(/* webpackChunkName: "chunk-assessment-hi" */ './hi.json');
      return faq.default;
    }
    case 'en':
    case 'default': {
      faq = await import(/* webpackChunkName: "chunk-assessment-en" */ './en.json');
      return faq.default;
    }
  }
}
