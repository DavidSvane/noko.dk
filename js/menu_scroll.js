$(window).scroll(function() {

  if ($(window).scrollTop()>100) {

    $('nav').css('position','relative');
    $('nav').css('top',$(window).scrollTop()-100+'px');

  } else {

    $('nav').css('position','static');
    $('nav').css('top','');

  }

});
