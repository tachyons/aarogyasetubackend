import ConfigFromEnv from '@stencil/config-from-env';

export default function getIcmrLabs(headers) {
  const CACHE_KEY_ALL_LABS = 'icmr-labs-all';
  const cachedLabsStr = localStorage.getItem(CACHE_KEY_ALL_LABS);
  if (cachedLabsStr) {
    const cachedData = JSON.parse(cachedLabsStr);
    if (cachedData && cachedData.expiry > Date.now()) {
      return Promise.resolve(cachedData.value);
    }
  }
  
  return fetch(`${ConfigFromEnv('__NCV_API__')}/ncv19/icmr-labs/all`, {headers})
    .then(r => r.json())
    .then(({status, data}) => {
      if (status !== 'success') {
        return Promise.reject(`/ncv19/icmr-labs/all api failed`);
      }
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 1);
      localStorage.setItem(
        CACHE_KEY_ALL_LABS,
        JSON.stringify({
          value: data,
          expiry: expiry.getTime(),
        }),
      );
      return Promise.resolve(data);
    });
}
