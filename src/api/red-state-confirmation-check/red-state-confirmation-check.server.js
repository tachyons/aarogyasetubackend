import megatron from '@stencil/megatron';
import ConfigFromEnv from '@stencil/config-from-env';

export default async function redStateConfirmationCheck({Authorization = ''}) {
  const path = '/ncv19/infected-check';
  const data =
    (await megatron({
      url: `${ConfigFromEnv('__NCV_API__')}${path}`,
      type: 'GET',
      headers: {
        Authorization,
      },
      name: 'aarogya-setu-redstateconfirmationcheck',
    })) || {};
  return {state: data.state, mob: data.mob};
}
