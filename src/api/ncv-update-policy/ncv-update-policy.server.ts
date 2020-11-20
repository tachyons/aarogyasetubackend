import megatron from '@stencil/megatron';
import ConfigFromEnv from '@stencil/config-from-env';

export default async function updatePolicy({Authorization = ''}) {
  const path = '/ncv19/policy-accepted/';
  const data = await megatron({
    url: `${ConfigFromEnv('__NCV_API__')}${path}`,
    type: 'GET',
    headers: {
      Authorization,
    },
    name: 'aarogya-setu-policy',
  });
  return data;
}
