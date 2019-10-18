const Datauri = require('datauri');

exports.convertMediaToDataurl = function convertMediaToDataurl(
  filePath,
) {
  const mediaPromise = new Promise((resolve, reject) => {
    const datauri = new Datauri();
    datauri.on('encoded', resolve);
    datauri.on('error', reject);
    datauri.encode(filePath);
  });
  return mediaPromise;
};
