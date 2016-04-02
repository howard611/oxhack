$(document).ready(function() {
  function getHashValue(key) {
    var matches = location.hash.match(new RegExp(key+'=([^&]*)'));
    return matches ? matches[1] : null;
  }

  function get_signed_request(file) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/sign_s3?file_name=' + file.name + '&file_type=' + file.type);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          upload_file(file, response.signed_request, response.url);
        } else {
          alert("Could not get signed URL.");
        }
      }
    };
    xhr.send();
  }

  function upload_file(file, signed_request, url) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', signed_request);
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    xhr.onload = function() {
      if (xhr.status === 200) {
        document.getElementById('resumeLink').value = url;
        $('#signupForm').submit();
      }
    };
    xhr.onerror = function() {
      alert('Could not upload file.');
    };
    xhr.send(file);
  }

  $('button').click(function(evt) {
    evt.preventDefault();

    if (window.location.hash) {
      var access_token = getHashValue('access_token');
      var getUrl = 'https://my.mlh.io/api/v1/user?access_token=' + access_token;
      var files = document.getElementById("inputResume").files;
      var file = files[0];

      $('#signupForm p').removeClass('hidden');

      $.get(getUrl, function(data) {
        $('input#id').val(data.data.id);
        if (file) {
          get_signed_request(file);
        } else {
          $('#signupForm').submit();
        }
      });

    } else {
      alert('Missing access_token. Please try again.');
    }
  });

  var text_max = 1200;
  $('#count_text').html(text_max + ' characters remaining');

  $('#inputReason').keyup(function() {
    var text_length = $('#inputReason').val().length;
    var text_remaining = text_max - text_length;

    $('#count_text').html(text_remaining + ' characters remaining');
  });
});
