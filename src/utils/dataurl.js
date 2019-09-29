const dataurl = require('dataurl');
const fs = require('fs');

exports.convertMediaToDataurl = function convertMediaToDataurl(
  filePath,
  mimetype,
) {
  const mediaPromise = new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      }
      // TODO later just write own data urls.
      resolve(dataurl.convert({ data, mimetype }));
    });
  });
  return mediaPromise;
};
