var fs = require('fs');
var path = require('path');
var Preferences = require('./preferences');

/**
 *  IMPORTANT:  This model saves a storyboard JSON object to local filesystem
 *  it does NOT deal with pouchDB or couchDB in anyway.
 */
function Storyboard() {
    this.filename = null;
    this.data = {};
    this.meta = {};
    this.nav = [];
    this.items = [];
};


function createNav(items) {
    const nav = [];

    items.forEach((item, id) => {
        const [mediaType] = Object.keys(item);
        // fallback for now until every type has a title field to fill in. (or something for nav)
        const title = item[mediaType].title ? item[mediaType].title : `${id} ${mediaType}`;

        nav.push({
            id,
            title
        });
    });

    return nav;
}

Storyboard.prototype = {

    getFilename: function(cb) {
        var preferences = new Preferences(path.join(__dirname, '../data/preferences.json'));
        var self = this;
        // get filename from preferences file
        preferences.readFile(null, function(err, data) {
            if (err) {
                cb(err, null);
            }
            console.log("Reading from preferenes file", data.storyboard);
            self.filename = data.storyboard;
            cb(null, path.join(__dirname, "../data/stories/", data.storyboard));
        })
    },

    readFile: function (cb) {
        var self = this;
        self.getFilename(function (err, filename) {
            fs.readFile(filename, 'utf8', function (err, data) {
                if (!err) {
                    self.data = data;

                    const json = JSON.parse(data)
                    self.meta = json.meta;
                    self.items = json.items;
                    self.nav = json.nav;

                    console.log('Successfully read storyboard file.');
                    if (cb) {
                        cb(null, json);
                    }
                } else {
                    console.log('Error reading storyboard file.', err);
                    if (cb) {
                        cb(err, null);
                    }
                }
            });
        });
    },

    writeFile: function (data) {
        var self = this;

        const fileData = Object.assign({}, data, {nav: createNav(data.items)});
        const fileContents = JSON.stringify(fileData);

        self.getFilename(function (err, filename) {
            fs.writeFile(filename, fileContents, function (err) {
                if (err) {
                    console.log('Write Storyboard File Error: ' + err);
                } else {
                    console.log('Write Storyboard File Success');
                    self.data = data;
                }
            });
        });
    },

    deleteFile: function () {
        var self = this;
        self.getFilename(function (err, filename) {
            fs.unlink(filename, (err) => {
                if (err) {
                    console.log('Error deleting file', filename);
                }
                console.log('path/file.txt was deleted');
            });
        });
    },

    getMeta: function () {
        return this.meta;
    },

    getItems: function () {
        return this.items;
    },

    getNav: function () {
        return this.nav;
    }
};

module.exports = Storyboard;
