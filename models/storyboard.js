var fs = require('fs');

/**
 *  IMPORTANT:  This model saves a storyboard JSON object to local filesystem
 *  it does NOT deal with pouchDB or couchDB in anyway.
 */
function Storyboard(filename) {
    this.filename = filename;
    this.data = {};
    this.meta = {};
    this.items = [];
};

Storyboard.prototype = {

    readFile: function (filename) {
        var self = this;
        if (!filename) {
            filename = self.filename;
        }
        fs.readFile(filename, 'utf8', function (err, data) {
            if (!err) {
                self.data = data;
                self.meta = JSON.parse(data).meta;
                self.items = JSON.parse(data).items;

                console.log('Successfully read storyboard file.');
            }
        });
    },

    writeFile: function (filename, data) {
        var self = this;

        fs.writeFile(filename, data, function (err) {
            if (err) {
                console.log('Write Storyboard File Error: ' + err);
            } else {
                console.log('Write Storyboard File Success');
                self.data = data;
            }
        });
    },

    getMeta: function () {
        return this.meta;
    },

    getItems: function () {
        return this.items;
    }
};

module.exports = Storyboard;
