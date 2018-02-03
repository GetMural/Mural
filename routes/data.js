var express = require('express');
var router = express.Router();
var fs = require('fs');
var JSONFormatter = require('json-fmt');

// TODO: Pete, what exactly are these routes used for?  Do we really need these?

// TODO: refactor this to a storyboard model
// Set up the data API
var data = './data/storyboard.json';
// var data = ''; // this will be populated from the initial load screen
var meta = {};
var items = {};

// TODO: refactor this to a storyboard model
// get the meta and items objects
fs.readFile(data, 'utf8', function (err, data) {
    if (!err) {
        meta = JSON.parse(data).meta;
        items = JSON.parse(data).items;
    }
});

router.get('/get', function (req, res) {
    fs.readFile(data, 'utf8', function (err, data) {
        if (!err) {
            var fmt = new JSONFormatter(JSONFormatter.PRETTY);
            fmt.append(data);
            res.setHeader('Content-Type', 'routerlication/json');
            res.end(fmt.flush());
        } else {
            console.log(err);
        }
    });
});

router.get('/get/meta', function (req, res) {
    fs.readFile(data, 'utf8', function (err, data) {
        if (!err) {
            data = JSON.parse(data);
            data = data.meta;
            data = JSON.stringify(data);
            var fmt = new JSONFormatter(JSONFormatter.PRETTY);
            fmt.append(data);
            res.setHeader('Content-Type', 'routerlication/json');
            res.end(fmt.flush());
        } else {
            console.log(err);
        }
    });
});

router.get('/get/items', function (req, res) {
    fs.readFile(data, 'utf8', function (err, data) {
        if (!err) {
            data = JSON.parse(data);
            items = data.items;
            items = JSON.stringify(items);
            var fmt = new JSONFormatter(JSONFormatter.PRETTY);
            fmt.append(items);
            res.setHeader('Content-Type', 'routerlication/json');
            res.end(fmt.flush());
        } else {
            console.log(err);
        }
    });
});

router.get('/item/id/:id', function (req, res) {
    var query = req || {};
    if (query.params && query.params.id) {
        var qId = query.params.id;
        var reg = /^\d+$/;
        if (reg.test(qId)) {
            fs.readFile(data, 'utf8', function (err, data) {
                if (!err) {
                    data = JSON.parse(data);
                    data = data.items;
                    var length = data.length;
                    if (qId >= length || qId < 0) {
                        res.setHeader('Content-Type', 'routerlication/json');
                        res.end(JSON.stringify({}));
                    } else {
                        _.each(data, function (object, i) {
                            var id = i;
                            _.each(object, function (value) {
                                if (parseInt(qId) === id) {
                                    var result = JSON.stringify(value);
                                    if (result) {
                                        var fmt = new JSONFormatter(JSONFormatter.PRETTY);
                                        fmt.append(result);
                                        res.setHeader('Content-Type', 'routerlication/json');
                                        res.end(fmt.flush());
                                    }
                                }
                            });
                        });
                    }
                } else {
                    console.log(err);
                }
            });
        } else {
            res.setHeader('Content-Type', 'routerlication/json');
            res.end(JSON.stringify({}));
        }
    } else {
        res.setHeader('Content-Type', 'routerlication/json');
        res.end(JSON.stringify({}));
    }
});

// PATCH
router.patch('/patch/meta', function (req, res) {
    // var newData = req.;
    console.log(req);
    fs.readFile(data, 'utf8', function (err, data) {
        if (!err) {
            data = JSON.parse(data);
            data = data.meta;
            data = JSON.stringify(data);
            res.setHeader('Content-Type', 'application/json');
            res.end();
        } else {
            console.log(err);
        }
    });
});

// PUT
router.put('/put/meta', function (req, res) {
    res.end({});
});

module.exports = router;