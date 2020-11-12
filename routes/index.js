var express = require("express");
var router = express.Router();
const path = require("path");
const fs = require("fs");
const rimraf = require("rimraf");
const electron = require("electron");
const USER_DATA_FOLDER = electron.app.getPath("userData");
const sanitize = require("sanitize-filename");
const slugify = require('@sindresorhus/slugify');

var Preferences = require("../models/preferences");
var preferences = new Preferences();

const DATA_STORIES_PATH = path.join(USER_DATA_FOLDER, "data", "stories");

/* GET home page. */
router.get("/", function (req, res) {
  preferences.readFile(null, function (err, data) {
    res.render("index", {
      title: "Mural Editor",
      filename: data.storyboard,
    });
  });
});

router.post("/copy-story", function (req, res) {
  let newFileName = slugify(sanitize(req.body.filename));

  try {
    newFilePath = `${newFileName}.json`;
    fs.statSync(path.join(DATA_STORIES_PATH, newFilePath));
    let datestr = new Date().toISOString().replace(/[-T:\.Z]/g, "");
    newFilePath = `${newFileName}-${datestr}.json`;
  }
  catch(err) {
    // newFilePath doesn't exist good.
  }

  preferences.readFile(null, function (err, data) {
    const currentStory = path.join(DATA_STORIES_PATH, data.storyboard);
    const newStory = path.join(DATA_STORIES_PATH, newFilePath);
    fs.createReadStream(currentStory).pipe(fs.createWriteStream(newStory));
    data.storyboard = newFilePath;
    preferences.writeFile(null, data, function (err, response) {
      if (err) {
        console.log("Error setting new preferences");
        console.log(err);
        res.send("{status: 'error'}");
      }
      console.log("New story set to preferences" + newStory);
      res.send("{status: 'ok'}");
    });
  });
});

router.delete("/delete-story", function (req, res) {
  preferences.readFile(null, function (err, data) {
    const story = data.storyboard.split(".")[0];
    console.log("deleting story", data.storyboard);
    fs.unlink(path.join(DATA_STORIES_PATH, data.storyboard), function (err) {
      if (!err) {
        const uploadPath = path.join(USER_DATA_FOLDER, "uploads", story);
        rimraf(uploadPath, function (err) {
          if (err) {
            console.log(err);
          }
        });
        data.storyboard = "default.json";
        preferences.writeFile(null, data, function (err, response) {
          console.log("New story set to preferences");
          console.log("story deleted.");
          res.send("{status: 'ok'}");
        });
      } else {
        console.log("Error deleting story", filename);
        res.send("{status: 'error'}");
      }
    });
  });
});

module.exports = router;
