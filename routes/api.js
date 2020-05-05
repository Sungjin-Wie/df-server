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
  let stat =
    _url +
    `df/servers/${serverId}/characters/${characterId}/status?apikey=${apiKey}`;
  let equip =
    _url +
    `df/servers/${serverId}/characters/${characterId}/equip/equipment?apikey=${apiKey}`;
  let avatar =
    _url +
    `df/servers/${serverId}/characters/${characterId}/equip/avatar?apikey=${apiKey}`;
  let creature =
    _url +
    `df/servers/${serverId}/characters/${characterId}/equip/creature?apikey=${apiKey}`;
  let flag =
    _url +
    `df/servers/${serverId}/characters/${characterId}/equip/flag?apikey=${apiKey}`;
  let urls = [stat, equip, avatar, creature, flag];
  Promise.all(urls.map(requestAsync))
    .then((res) => Object.assign({}, res[0], res[1], res[2], res[3], res[4]))
    .then((data) => res.send(data));
});

var requestAsync = function (url) {
  return new Promise((resolve, reject) => {
    var req = request(url, (err, response, body) => {
      if (err) return reject(err, response, body);
      resolve(JSON.parse(body));
    });
  });
};

module.exports = router;
