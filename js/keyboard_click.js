// INFO: KEY PRESSED ON THE KEYBOARD

$(document).keyup(function(e) {

  if (e.keyCode == 27) {

    masterCleanUp();

	} else if (e.keyCode == 13) {

    $('#login a').click();

  }

});
