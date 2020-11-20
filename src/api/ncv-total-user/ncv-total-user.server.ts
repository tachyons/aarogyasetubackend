import megatron from '@stencil/megatron';
import ConfigFromEnv from '@stencil/config-from-env';

let cached;

export default async function getTotalUser({Authorization = ''}) {
  if (cached) {
    return cached;
  }
  const path = '/ncv19/get-stats';
  const data = await megatron({
    url: `${ConfigFromEnv('__NCV_API__')}${path}`,
    type: 'GET',
    headers: {
      Authorization,
      key: 'india_totals',
    },
    name: 'aarogya-setu-totalUser',
  });
  const {Total_users = 0} = data || {};
  cached = Total_users;
  return cached;
}

// purge cache every 15 mins
setInterval(() => {
  cached = undefined;
}, 1000 * 60 * 15);
