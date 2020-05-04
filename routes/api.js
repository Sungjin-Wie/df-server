var express = require('express');
var router = express.Router();
const apiKey = require('./data').apiKey;
var _url = require('./data').url;
var request = require('request');

router.get('/search', function (req, res, next) {
  let url = _url;
  let name = encodeURIComponent(req.query.name);
  console.log(name);
  url += `df/servers/${req.query.server}/characters?characterName=${name}&wordType=full&limit=200&apikey=${apiKey}`;
  request(url, function (error, response, body) {
    if (!error) {
      res.send(body);
    }
  }); // request
}); // router.get

router.get('/auction', function (req, res, next) {
  let url = _url;
  let name = encodeURIComponent(req.query.name);
  console.log(name);
  url += `df/auction?itemName=${name}&sort=unitPrice:asc&limit=20&wordType=front&apikey=${apiKey}`;
  request(url, function (error, response, body) {
    if (!error) {
      res.send(body);
    }
  }); // request
}); // router.get

router.get('/info', function (req, res, next) {
  let serverId = encodeURIComponent(req.query.server);
  let characterId = encodeURIComponent(req.query.id);
  let resbody = {};
  let stat =
    _url +
    `df/servers/${serverId}/characters/${characterId}/status?apikey=${apiKey}`;
  console.log(stat);
  request(stat, function (error, response1, body1) {
    if (!error) {
      resbody.status = body1;
      console.log(resbody);
      res.send(resbody);
    }
  });
});

module.exports = router;
