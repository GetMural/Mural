const express = require('express');
const router = express.Router();
// const fs = require('fs');

// Public View
router.get('/', function (req, res) {
  res.render('../public/dist/index.html');
});

module.exports = router;
