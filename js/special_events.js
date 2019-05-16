function addEvent() {

  if ($('#ne_title').val() == "" || $('#ne_place').val() == "" || $('#fp_').val() == "") {

    alert("Du mangler noget!");
    return;

  }

  var einfo = {
    title: $('#ne_title').val(),
    time: $('#fp_').val(),
    place: $('#ne_place').val(),
    description: $('#ne_description').val(),
    link: $('#ne_link').val(),
    img: $('#ne_img').val(),
    priority: $('#ne_priority').val(),
    type: $('#ne_type').val()
  };

  einfo = encodeURIComponent(JSON.stringify(einfo));

  $.post('http://davidsvane.com/noko/db.php', {page: 'news_add', nr: getCookie('user'), info: einfo, ver: 1}, function (data) {

    if (data == "success") {
      alert("Eventet blev tilføjet");
    } else {
      alert("Der gik noget galt på serveren");
    }

  });

}
