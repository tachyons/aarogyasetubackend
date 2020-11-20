export default async function getAndroidContact() {
  return new Promise(resolve => {
    window.sendContact = function(count) {
      resolve(parseInt(count, 10));
    };

    window.JSMobileCrm.getUniqueBluetoothContacts('sendContact');
  });
}
