import ConfigFromEnv from '@stencil/config-from-env';

export default function getHospitalLabs(headers) {
 
  return fetch(`${ConfigFromEnv('__NCV_API__')}/ncv19/hospitals`, {headers})
    .then(res => res.json())
    .then(res => {
      return Promise.resolve(res);
    })
    ;
}
