const Datauri = require('datauri');
const datauri = new Datauri();

exports.convertMediaToDataurl = function convertMediaToDataurl(
  filePath,
) {
  const mediaPromise = new Promise((resolve, reject) => {
    datauri.on('encoded', resolve);
    datauri.on('error', reject);
    datauri.encode(filePath);
  });
  return mediaPromise;
};
