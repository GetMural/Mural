var fs = require('fs');

/**
 *  IMPORTANT:  This model saves a preferences JSON object to local filesystem
 *  it does NOT deal with pouchDB or couchDB in anyway.
 */
function Preferences(filename) {
    this.filename = filename;
    this.data = {};
};


Preferences.prototype = {

    readFile: function (filename, cb) {
        var self = this;
        if (!filename) {
            filename = self.filename;
        }
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
