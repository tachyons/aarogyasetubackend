import getAndroidHeaders from './get-android-headers';
import getIOSHeaders from './get-ios-headers';

export default async function getHeaders() {
  if (window.JSMobileCrm) {
    return await getAndroidHeaders();
  }

  if (window.webkit) {
    return await getIOSHeaders();
  }

  return {
    Authorization: '',
    ver: 1045,
    lat: '23.2156651',
    lon: '72.6389389',
    pt: '9cf23ec2-d83c-4778-aca5-d7fb64ae1b2d',
  };
}
