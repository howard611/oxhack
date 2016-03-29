$(document).ready(function() {
  function getHashValue(key) {
    var matches = location.hash.match(new RegExp(key+'=([^&]*)'));
    return matches ? matches[1] : null;
  }

  $('button').click(function(evt) {
    evt.preventDefault();

    if (window.location.hash) {
      var access_token = getHashValue('access_token');
      var getUrl = 'https://my.mlh.io/api/v1/user?access_token=' + access_token;

      $.get(getUrl, function(data) {
        $('input#id').val(data.data.id);
        $('#signupForm').submit();
      });
    } else {
      console.log('Cannot read user ID from the access_token. Please try again.');
    }
  });
});
