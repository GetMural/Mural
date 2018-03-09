var fs = require('fs');

/**
 *  IMPORTANT:  This model saves a storyboard JSON object to local filesystem
 *  it does NOT deal with pouchDB or couchDB in anyway.
 */
function Storyboard(filename) {
    this.filename = filename;
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

    readFile: function (filename) {
        var self = this;
        if (!filename) {
            filename = self.filename;
        }
        fs.readFile(filename, 'utf8', function (err, data) {
            if (!err) {
                self.data = data;

                const json = JSON.parse(data)
                self.meta = json.meta;
                self.items = json.items;
                self.nav = json.nav;

                console.log('Successfully read storyboard file.');
            }
        });
    },

    writeFile: function (filename, data) {
        var self = this;

        const fileData = Object.assign({}, data, {nav: createNav(data.items)});
        const fileContents = JSON.stringify(fileData);

        fs.writeFile(filename, fileContents, function (err) {
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
    },

    getNav: function () {
        return this.nav;
    }
};

module.exports = Storyboard;
