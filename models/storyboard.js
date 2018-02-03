var fs = require('fs');

/**
 *  IMPORTANT:  THIS IS NOT USED CURRENTLY!!!!
 *
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
            }
        });
    },

    writeFile: function (filename, data) {
        var self = this;
        fs.writeFile(filename, data, function (err) {
            if (err) {
                return console.log(err);
            }
            self.data = data;
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
