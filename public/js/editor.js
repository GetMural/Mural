var $ = jQuery;
$(function() {

    // Setup PouchDB
    var db = new PouchDB('mural');
    var storyboard = {};

    // load initial storyboard from server filesystem
    $.get('/editor/storyboard', function (data, status) {
        console.log('Loaded storyboard from server');
        var data = JSON.parse(data);
        var dataDoc = data;
        // TODO: replace with a better unique _id
        dataDoc._id = data.meta.title;

        // first, see if the doc already exists in pouchDB
        db.get(dataDoc._id).catch(function (err) {
            if (err.name === 'not_found') {
                // if not just use the one we got from the server
                return dataDoc;
            } else {
                throw err;
            }
        }).then(function (doc) {
            // save (or update) it to the pouchDb
            db.put(doc).then(function() {
                db.get(doc._id).then(function(doc) {
                    storyboard = doc;
                    console.log('Loaded storyboard from server', doc);
                });
            });
        }).catch(function (err) {
            console.log('Error saving storyboard to pouchDB', err)
        })
    });
})