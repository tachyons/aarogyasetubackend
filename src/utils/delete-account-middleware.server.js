import language from '../assets/language/index';

const supportedLang = ['en', 'hi', 'ba', 'gu', 'ka', 'ma', 'mal', 'od', 'pu', 'ta', 'te', 'as'];

export default function DeleteAccountMiddleware(req, res, next) {
  // input from query parameter
  const {lang: langUnsanitized, locale: localeUnsanitized} = req.query;

  // input from headers
  const localeFromHeader = req.header('locale');
  const langFromHeader = req.header('lang');

  // sanitize query input
  const lang = supportedLang.includes(langUnsanitized) ? langUnsanitized : undefined;
  const locale = supportedLang.includes(localeUnsanitized) ? localeUnsanitized : undefined;
  const effectivelang = lang || locale || localeFromHeader || langFromHeader || 'en';
  const langObject = language[effectivelang];
  const {accountDelete: accountDeleteEn} = language.en;
  const {accountDelete = accountDeleteEn, nav} = langObject;
  req.localData = {
    language: {nav, accountDelete: accountDeleteEn},
    flags: {
      lang: effectivelang,
    },
    helmetObj: {
      title: `<title>${accountDelete.title}</title>`,
    },
  };
  next();
}
