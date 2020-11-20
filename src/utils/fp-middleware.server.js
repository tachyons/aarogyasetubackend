import newrelic from '@stencil/newrelic-instance';
import checkStatus from '../api/fp-check-status/fp-check-status';
import language from '../assets/language/index';
import getTotalUser from '../api/ncv-total-user/ncv-total-user';
import getNewUserFormConfig from '../api/new-user-form-config/new-user-form-config';
import updatePolicy from '../api/ncv-update-policy/ncv-update-policy';
import redStateConfirmationCheck from '../api/red-state-confirmation-check/red-state-confirmation-check';

const supportedLang = ['en', 'hi', 'ba', 'gu', 'ka', 'ma', 'mal', 'od', 'pu', 'ta', 'te', 'as'];

export default async function fpMiddleware(req, res, next) {
  // input from query parameter
  const {
    lang: langUnsanitized,
    locale: localeUnsanitized,
    status_code: status_codeUnsanitized = 200,
    proximity: proximityFromQueryUnsanitized,
  } = req.query;

  // input from headers
  const ptFromHeader = req.header('pt');
  const Authorization = req.header('Authorization');
  const localeFromHeader = req.header('locale');
  const verFromHeader = req.header('ver');
  const langFromHeader = req.header('lang');

  // sanitize query input
  const proximityFromQuery = proximityFromQueryUnsanitized === '1' ? 1 : 0;
  const lang = supportedLang.includes(langUnsanitized) ? langUnsanitized : undefined;
  const locale = supportedLang.includes(localeUnsanitized) ? localeUnsanitized : undefined;
  const status_codeFromQuery = /^[a-zA-Z0-9\_\-\+\=]*$/.test(status_codeUnsanitized)
    ? status_codeUnsanitized
    : 200;

  // default values
  const ver = verFromHeader || '';
  const pt = ptFromHeader || '9cf23ec2-d83c-4778-aca5-d7fb64ae1b2d'; // default value of android
  const isIos = pt === 'fc6434ea-0036-4c3b-a262-3c4901d5398f'; // ios check
  const effectivelang = lang || locale || localeFromHeader || langFromHeader || 'en';
  const verInt = parseFloat(`${ver}`);
  // check status api
  const [data, totalUser] = await Promise.all([
    checkStatus({Authorization, pt, ver}),
    getTotalUser({Authorization}),
  ]);
  const {
    show_form = false,
    show_link = false,
    self_assess_popup = 0,
    profile_image_url,
    status_code = parseInt(status_codeFromQuery, 10),
    proximity = proximityFromQuery,
    did,
  } = data || {};
  let httpStatus = 200;
  if (data && data.status_code == undefined){
    httpStatus = 401;
  }
  const showAppUpdatePop = !Authorization && verInt < 1045;
  const showForm = show_form || show_link;
  if (showForm) {
    updatePolicy({Authorization});
  }
  const langObject = language[effectivelang];
  const {accountDelete, ...restLanguage} = langObject;
  const redConfirmationData =
    status_code === 700 ? await redStateConfirmationCheck({Authorization}) : {state: true};
  const {state, mob} = redConfirmationData;
  req.localData = {
    totalUser,
    language: restLanguage,
    flags: {
      show_form,
      show_link,
      self_assess_popup,
      profile_image_url,
      status_code,
      proximity,
      lang: effectivelang,
      isIos,
      showAppUpdatePop: !Authorization && !isIos && verInt < 1045,
      redStateConfirmation: !state,
      mob,
    },
    responseStatus: !data && !showAppUpdatePop ? 401 : httpStatus,
    userFormConfig: showForm ? await getNewUserFormConfig(effectivelang) : undefined,
    helmetObj: {
      title: `<title>${language[effectivelang].title}</title>`,
    },
  };
  newrelic.addCustomAttributes({
    effectivelang,
    show_form,
    show_link,
    self_assess_popup,
    status_code,
    proximity,
    did,
    showAppUpdatePop,
    redStateConfirmation: !state,
  });
  next();
}
