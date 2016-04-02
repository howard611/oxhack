var express = require('express');
var router = express.Router();
var Applicant = require('../models/applicant.js');
var aws = require('aws-sdk');
var AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
var AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
var S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'OxfordHack' });
});

router.get('/sign_s3', function(req, res) {
  aws.config.update({ accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY });
  var s3 = new aws.S3();
  var s3_params = {
    Bucket: S3_BUCKET_NAME,
    Key: req.query.file_name,
    ContentType: req.query.file_type,
    ACL: 'public-read'
  };
  s3.getSignedUrl('putObject', s3_params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var return_data = {
        signed_request: data,
        url: 'https://' + S3_BUCKET_NAME + '.s3.amazonaws.com/' + req.query.file_name
      };
      res.write(JSON.stringify(return_data));
      res.end();
    }
  });
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
    personal: fields.personal,
    devpost: fields.devpost,
    resume: fields.resumeLink,
    reason: fields.reason
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
