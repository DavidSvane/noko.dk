function normalize(text) {

  return text.replace(/[&\\$~%'":<>{}]/g, '');

}
function addEvent() {

  if ($('#ne_title').val() == "" || $('#ne_place').val() == "" || $('#fp_').val() == "") {

    alert("Du mangler noget!");
    return;

  }

  var einfo = {
    title: normalize($('#ne_title').val()),
    time: $('#fp_').val(),
    place: normalize($('#ne_place').val()),
    description: normalize($('#ne_description').val()),
    link: $('#ne_link').val(),
    img: $('#ne_img').val(),
    priority: $('#ne_priority').val(),
    type: $('#ne_type').val()
  };

  einfo = encodeURIComponent(JSON.stringify(einfo));

  $.post('http://davidsvane.com/noko/server/db.php', {page: 'news_add', nr: getCookie('user'), info: einfo, ver: 1}, function (data) {

    if (data == "success") {
      alert("Eventet blev tilføjet");
      $('#ne_fields input').val("");
      $('#ne_priority').val(3);
      $('#ne_type').val(1);
    } else {
      alert("Der gik noget galt på serveren");
    }

  });

}
function updateEvent() {

  if ($('#ne_title').val() == "" || $('#ne_place').val() == "" || $('#fp_').val() == "") {

    alert("Du mangler noget!");
    return;

  }

  var einfo = {
    title: normalize($('#ne_title').val()),
    time: $('#fp_').val(),
    place: normalize($('#ne_place').val()),
    description: normalize($('#ne_description').val()),
    link: $('#ne_link').val(),
    img: $('#ne_img').val(),
    priority: $('#ne_priority').val(),
    type: $('#ne_type').val(),
    eid: $('#ne_fields').attr("data-eid")
  };

  einfo = encodeURIComponent(JSON.stringify(einfo));

  $.post('http://davidsvane.com/noko/server/db.php', {page: 'news_update', nr: getCookie('user'), info: einfo, ver: 1}, function (data) {

    if (data == "success") {
      alert("Eventet blev opdateret");
      load('news');
    } else {
      alert("Der gik noget galt på serveren");
    }

  });

}
