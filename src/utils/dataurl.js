const Datauri = require('datauri');

exports.convertMediaToDataurl = function convertMediaToDataurl(
  filePath,
) {
  return Datauri(filePath);
};
