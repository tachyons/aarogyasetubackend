export default async function getAndroidHeaders() {
  return new Promise(resolve => {
    const headers = window.JSMobileCrm.getHeaders();
    resolve(JSON.parse(headers));
  });
}
