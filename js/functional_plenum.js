// FUNCTIONS RELATINV TO PLENUM PAGES AND VOTING

function pollClose(e) {

  var pid = $('#v_cnt .v_'+e+' h3').attr("data-pid");

  if (pid == "null") { alert('Ingen åben afstemning at lukke.'); return; }

  $.post('http://davidsvane.com/noko/server/db.php', {page: 'poll_close', p: pid, nr: getCookie('user'), ver: 1}, function (data) {

    $('#stem .v_'+e+' .v_code span').css("background","#f00");
    $('#stem > select option[value="'+pid+'"]').remove();
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

    $('#stem .v_'+e+' .v_code').html("ID: <span>"+data+"</span>");
    $('#stem .v_'+e+' .v_code span').css("background","#0a0");
    $('#v_cnt .v_'+e+' h3').attr("data-pid",data);
    alert("Afstemning åbnet");

  });

}

function pollReopen(vid) {

  if (vid == "null") {

    $('#stem div input').val("");
    return;

  }

  $.post('http://davidsvane.com/noko/server/db.php', {page: 'poll_reopen', id: vid, nr: getCookie('user'), ver: 1}, function (data) {

    var obj = JSON.parse(data)[0][0];
    var qs = JSON.parse(obj.question);
    console.log(obj);
    console.log(qs);

    $('#v_cnt > div').hide();
    $('#v_cnt .v_'+obj.type).show();

    $('#v_menu > a').css("font-weight","normal");
    $('#v_menu > a[data-type="'+obj.type+'"]').css("font-weight","bold");

    qs.forEach(function (q, i) {
      if (i == 0) {
        $('#v_cnt .v_'+obj.type+' > input').val(q);
      } else if (obj.type == "2" && i == qs.length-1) {
        $('#v_max option[value="'+q+'"]').attr("selected",true);
      } else if (i > 2) {
        pollAddOption(obj.type);
        $('#v_cnt .v_'+obj.type+' .v_options input:nth-child('+i+')').val(q);
      } else {
        $('#v_cnt .v_'+obj.type+' .v_options input:nth-child('+i+')').val(q);
      }
    });

    $('#stem .v_'+obj.type+' .v_code').html("ID: <span>"+obj.id+"</span>");
    $('#stem .v_'+obj.type+' .v_code span').css("background","#0a0");
    $('#v_cnt .v_'+obj.type+' h3').attr("data-pid",obj.id);

  });

}

function pollCloseAll() {

  $.post('http://davidsvane.com/noko/server/db.php', {page: 'poll_close_all', nr: getCookie('user'), ver: 1}, function (data) {

    $('#stem > select').html('<option value="null" selected>Åbne afstemninger</option>');
    $('#stem .v_1 .v_options input:gt(1)').remove();
    $('#stem .v_2 .v_options input:gt(1)').remove();
    alert("Alle afstemninger er blevet lukket.")
    return;

  });

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

function pollResult(e) {

  $('#v_res').empty();
  if (e == "null") { return; }

  $.post('http://davidsvane.com/noko/server/db.php', {page: 'poll_result', id: e, nr: getCookie('user'), ver: 1}, function (data) {

    var obj = JSON.parse(data)[0];
    try { var type = parseInt(obj[0].type); } catch (err) { return; }
    var lim = [[0,0], [1,0], [1,1]];
    var qs = type == 0 ? ["Imod","For"] : JSON.parse(obj[0].question);

    $('#v_res').append('<table><thead><tr><td>Mulighed</td><td>Antal</td></tr></thead><tbody></tbody></table>');
    for (var i = lim[type][0]; i < qs.length-lim[type][1]; i++) {
      $('#v_res tbody').append('<tr class="o_'+i+'"><td>'+qs[i]+'</td><td>0</td></tr>');
    }

    obj.forEach(function (e) {
      var vote = JSON.parse(e.vote);
      vote.forEach(function(v) {
        var sel = '#v_res tbody .o_'+v+' td:last-child';
        $(sel).text( (parseInt($(sel).text())+1) );
      });
    });

  });

}
