var express = require('express');
var router = express.Router();
const apiKey = require('./data').apiKey;
var _url = require('./data').url;

router.get('/search', function (req, res, next) {
  let url = _url;
  let name = encodeURIComponent(req.query.name);
  console.log(name);
  url += `df/servers/${req.query.server}/characters?characterName=${name}&wordType=full&limit=200&apikey=${apiKey}`;
  res.redirect(url);
});

module.exports = router;
