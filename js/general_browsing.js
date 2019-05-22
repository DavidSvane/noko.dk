function openNews(url) {

  if (url.length > 6) {

    window.open(url, '_blank');

  }

}


function urlExists(path) {

  $.ajax({

    url: path,
    error: function() { return false; },
    success:function() { return true; }

  });

}
