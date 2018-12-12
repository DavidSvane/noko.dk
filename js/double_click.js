// INFO: PROVIDES DOUBLE-CLICK FUNCTIONS
// p: CHANGE INTO TEXTAREA AND EDIT
// img: CHANGE SOURCE WITH PROMPT

// INFO: REMOVES ALL CHANGES FROM DOUBLE CLICKS
function imgSelectorCleanUp() {

  $('.img_selector').each(function() {

    $('.img_selector').remove();
    $('.img_selector_bg').remove();

  });

}
function textEditorCleanUp() {

  $('.editor').each(function() {
    var new_text = window.btoa($(this).val());
    var new_id = $(this).attr('id');
    var new_lang = $(this).attr('lang');

    $.post('http://davidsvane.com/noko/mysql.php', {update_content: 'text', text: new_text, id: new_id, l: new_lang}, function (data) {

      location.reload();

    });
  });

}
function masterCleanUp() {

  imgSelectorCleanUp();
  textEditorCleanUp();

}

// INFO: FOR CHANING AN IMAGE ON noko.dk
$('img').dblclick(function() {

  imgSelectorCleanUp();

  var img_id = $(this).attr('id');
  var img_src = $(this).attr('src').substr(4);

  $('main').prepend('<div class="img_selector_bg fixcenter"></div>');
  $('main').prepend('<div class="img_selector fixcenter"><h3>Vælg billede...</h3></div>');

  $.post('php/img_selector.php', function (data) {

    var obj = JSON.parse(data);
    var keys = Object.keys(obj);

    keys.forEach(function (i) {

      $('.img_selector').append('<img src="res/'+obj[i]+'"/>');

    });

    $('.img_selector img').click(function() {

      var new_src = window.btoa($(this).attr('src').substr(4));
      //$('#'+img_id).attr('src', 'res/' + new_src);

      $.post('http://davidsvane.com/noko/mysql.php', {update_content: 'img', id: img_id, src: new_src}, function (data) {

        location.reload();

      })

    });

  });

  $('.img_selector_bg').click(function() {

    imgSelectorCleanUp();

  });

});

// INFO: FOR CHANING A PARAGRAPH ON noko.dk
$('.editables').dblclick(function() {

  var old_id = $(this).attr('id');
  var old_lang = $(this).attr('lang');

  $(this).after('<textarea class="editor" id="' + old_id + '" lang="' + old_lang + '" autofocus>' + $(this).html() + '</textarea>');
  $(this).toggle();
  $('textarea').flexible();

});
