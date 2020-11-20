import megatron from '@stencil/megatron';
import ConfigFromEnv from '@stencil/config-from-env';

const cached = {};

export default async function getNewUserFormConfig(lang) {
  if (cached[lang]) {
    return cached[lang];
  }
  const path = `/api/v1/user/form/config?form_name=personal_details_chat_based_form&lang=${lang}`;
  const response = await megatron({
    url: `${ConfigFromEnv('__FP_API__')}${path}`,
    type: 'GET',
    name: 'aarogya-setu-newuser-config',
  });
  const {data} = response;
  cached[lang] = data;
  return data;
}
