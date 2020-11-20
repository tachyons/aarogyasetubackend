async function getFaqData(lang) {
  let faq;
  switch (lang) {
    case 'pu': {
      faq = await import(/* webpackChunkName: "chunk-faq-en" */ '../assets/faq-json/faq-en.json');
      return faq.default;
    }
    case 'mal': {
      faq = await import(/* webpackChunkName: "chunk-faq-mal" */ '../assets/faq-json/faq-mal.json');
      return faq.default;
    }
    case 'ma': {
      faq = await import(/* webpackChunkName: "chunk-faq-ma" */ '../assets/faq-json/faq-ma.json');
      return faq.default;
    }
    case 'od': {
      faq = await import(/* webpackChunkName: "chunk-faq-od" */ '../assets/faq-json/faq-od.json');
      return faq.default;
    }
    case 'te': {
      faq = await import(/* webpackChunkName: "chunk-faq-te" */ '../assets/faq-json/faq-te.json');
      return faq.default;
    }
    case 'ta': {
      faq = await import(/* webpackChunkName: "chunk-faq-ta" */ '../assets/faq-json/faq-ta.json');
      return faq.default;
    }
    case 'ka': {
      faq = await import(/* webpackChunkName: "chunk-faq-ka" */ '../assets/faq-json/faq-ka.json');
      return faq.default;
    }
    case 'gu': {
      faq = await import(/* webpackChunkName: "chunk-faq-gu" */ '../assets/faq-json/faq-gu.json');
      return faq.default;
    }
    case 'ba': {
      faq = await import(/* webpackChunkName: "chunk-faq-ba" */ '../assets/faq-json/faq-ba.json');
      return faq.default;
    }
    case 'as': {
      faq = await import(/* webpackChunkName: "chunk-faq-as" */ '../assets/faq-json/faq-as.json');
      return faq.default;
    }
    case 'hi': {
      faq = await import(/* webpackChunkName: "chunk-faq-hi" */ '../assets/faq-json/faq-hi.json');
      return faq.default;
    }
    case 'en':
    default: {
      faq = await import(/* webpackChunkName: "chunk-faq-en" */ '../assets/faq-json/faq-en.json');
      return faq.default;
    }
  }
}

export default getFaqData;
