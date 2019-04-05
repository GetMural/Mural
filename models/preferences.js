const fs = require('fs');
const electron = require('electron');
const path = require('path');
const USER_DATA_FOLDER = electron.app.getPath('userData');

/**
 *  IMPORTANT:  This model saves a preferences JSON object to local filesystem
 */
function Preferences() {
    this.filename = path.join(USER_DATA_FOLDER, 'data', 'preferences.json');
    this.data = {};
};


Preferences.prototype = {

    readFile: function (filename, cb) {
        var self = this;
        if (!filename) {
            filename = self.filename;
        }
        console.log('Reading file ' + filename);
        fs.readFile(filename, 'utf8', function (err, data) {
            if (!err) {
                self.data = JSON.parse(data)
                console.log('Successfully read preferences file.');
                if (cb) {
                    cb(null, self.data);
                }
            } else {
                if (cb) {
                    cb(err, null);
                }
            }
        });
    },

    writeFile: function (filename, data, cb) {
        var self = this;
        if (!filename) {
            filename = self.filename;
        }
        const fileContents = JSON.stringify(data);

        fs.writeFile(filename, fileContents, function (err) {
            if (err) {
                console.log('Write Preferences File Error: ' + err);
                if (cb) {
                    cb(err, null);
                }
            } else {
                console.log('Write Preferences File Success');
                self.data = data;
                if (cb) {
                    cb(null, data);
                }
            }
        });
    },
};

module.exports = Preferences;
