var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'OxfordHack' });
});

router.get('/success', function(req, res, next) {
  res.render('complete');
});

router.post('/success', function(req, res, next) {
  res.redirect('/success');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

module.exports = router;
