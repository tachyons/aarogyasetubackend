export default async function getIOSHeaders() {
  return new Promise(resolve => {
    window.sendHeader = function(header) {
      const finalHeader = `{${  header.slice(1, -1)  }}`;
      resolve(JSON.parse(finalHeader));
    };

    window.webkit.messageHandlers.getHeader.postMessage(null);
  });
}
