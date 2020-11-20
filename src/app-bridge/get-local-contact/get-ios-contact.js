export default async function getIOSContact() {
  return new Promise(resolve => {
    window.sendContact = function(count) {
      resolve(parseInt(count, 10));
    };

    window.webkit.messageHandlers.getContact.postMessage(null);
  });
}
