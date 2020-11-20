import megatron from '@stencil/megatron';
import ConfigFromEnv from '@stencil/config-from-env';

export default async function checkStatus({Authorization = '', pt, ver}) {
  const path = '/api/v1/users/status/';
  const data = await megatron({
    url: `${ConfigFromEnv('__FP_API__')}${path}`,
    type: 'GET',
    headers: {
      Authorization,
      pt,
      ver,
      'content-type': 'application/json',
    },
    name: 'fpCheckstatus',
  });
  return data;
}
