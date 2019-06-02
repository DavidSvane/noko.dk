// FUNCTIONS RELATINV TO PLENUM PAGES AND VOTING

function pollClose(e) {

  var pid = $('#v_cnt .v_'+e+' h3').attr("data-pid");

  if (pid == "null") { alert('Ingen åben afstemning at lukke.'); return; }

  $.post('http://davidsvane.com/noko/server/db.php', {page: 'poll_close', p: pid, nr: getCookie('user'), ver: 1}, function (data) {

    $('#stem .v_'+e+' .v_code').attr("color","#f00");
    alert("Afstemning lukket");

  });

}

function pollOpen(e) {

  var data = [];
  var check = 0;

  $('#v_cnt .v_'+e+' input').each(function (e) {
    if ($(this).val() == "") { check = "Tekstfelter må ikke være tomme."; return; }
    data.push($(this).val());
  });

  if (e == 2) {
    if ($('#v_max').val() == "0") { check = "Der skal vælges et maks antal valgte muligheder."; }
    data.push($('#v_max').val());
  }

  if (check != 0) { alert(check); return; }

  data = encodeURIComponent(JSON.stringify(data));

  $.post('http://davidsvane.com/noko/server/db.php', {page: 'poll_open', t: e, q: data, nr: getCookie('user'), ver: 1}, function (data) {

    $('#stem .v_'+e+' .v_code').text("ID: "+data);
    $('#stem .v_'+e+' .v_code').attr("color","#0d0");
    alert("Afstemning åbnet");

  });

}

function pollCloseAll() {

  $.post('http://davidsvane.com/noko/server/db.php', {page: 'poll_close_all', nr: getCookie('user'), ver: 1}, function (data) { return; });

}

function pollAddOption(e) {

  var next = parseInt( $('#v_cnt .v_'+e+' .v_options input:last-of-type').attr("class").substr(4) ) + 1;

  $('#v_cnt .v_'+e+' .v_options').append('<input type="text" class="v_o_'+next+'" placeholder="Valgmulighed '+next+'"/>');

  if (e == 2) {

    $('#v_cnt .v_'+e+' select').append('<option value="'+next+'">'+next+'</option>');

  }

}

function pollRemoveOption(e) {

  $('#v_cnt .v_'+e+' .v_options input:last-of-type').remove();

}
