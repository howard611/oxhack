var express = require('express');
var router = express.Router();
var Applicant = require('../models/applicant.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'OxfordHack' });
});

router.get('/success', function(req, res, next) {
  res.render('complete');
});

router.post('/success', function(req, res) {
  var fields = req.body;

  var applicant = new Applicant({
    id: fields.id,
    linkedin: fields.linkedin,
    twitter: fields.twitter,
    github: fields.github,
    resume: fields.resume
  });

  applicant.save(function(err) {
    if (err) {
      console.log("ERROR: " + err);
    }

    console.log('Applicant added!');
    res.redirect('/success');
  });
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

module.exports = router;
