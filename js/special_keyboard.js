// INFO: FUNCTION WHEN A USER PRESSES KEYS ON THE KEYBOARD

document.addEventListener("keyup", event => {

  if (event.code == 'Escape' || event.keyCode == 27) {

    $('.sub').hide();

  }

});
