// INFO: FETCH CSV FILE WITH THE LAUNDRY SCHEDULE OF THE SELECTED WEEK
function laundryAccounting() {

  var y = $('#vr_year').val();
  var w = $('#vr_week').val();

  $.post('http://davidsvane.com/noko/server/db.php', {page: "laundry_accounting", year: y, week: w, nr: localStorage.getItem("user")}, function (data) {

    var obj = JSON.parse(data);
    obj = obj[0];
    var CSVprep = [];
    var sum = 0;

    CSVprep.push(['Vaerelse','Antal']);
    obj.forEach(function (e) {
      CSVprep.push([e['Vaerelse'],e['Antal']]);
      sum += parseInt(e['Antal']);
    });
    CSVprep.push(['Total',sum]);

    CSVfile = Papa.unparse(CSVprep, {
      delimiter: ";"
    });
    var link = document.getElementById("downloadFix");
    link.setAttribute("download", "vaskeregnskab_uge_"+w+"_"+y+".csv");
    link.setAttribute("href", "data:text/csv;charset=utf-8,"+encodeURI(CSVfile));
    link.click();

  });

}


// INFO: UPDATE FOOD PLAN FOR SELECTED WEEK
function updateFood() {

  var date = new Date();
  var year = date.getFullYear();
  var this_week = weekFromISO(date.toISOString());

  var db_function = $('.fweek:visible').attr("fw_filled") == "1" ? "food_update" : "food_insert";
  var week = parseInt( $('.fweek:visible').attr("id").split("_")[1] );

  if (week < this_week) { year++; }

  var menu = [];
  for (var i = 0; i < 7; i++) {
    menu.push($('.fweek:visible .fday'+i).val());
  }
  menu = encodeURIComponent(JSON.stringify(menu));

  $.post('http://davidsvane.com/noko/server/db.php', {page: db_function, y: year, w: week, m: menu}, function (data) { alert("Madplan gemt"); });

}


// INFO: CREATE AND PRINT ALUMNE KITCHEN SHIFTS
function incr(n) {

  n = (n + 2) % 140;

  if (n < 2) {
    n += 1;
  }

  return n;

}
function resetShifts() {

  $('#a_vagtplan .alumner a').each(function () {
    $(this).removeClass();
  });

  $('#a_vagtplan .dage a').each(function () {
    $(this).removeClass();
  });

}
function getShifts() {

  year = $('#vr_year').val();
  month = $('#vr_month').val();

  $.post('http://davidsvane.com/noko/server/db.php', {page: 'a_vagtplan', ver: 1, y: year, m: month}, function (data) {

    var obj = JSON.parse(data);
    var obj = obj[0];
    console.log(obj.length);
    if (obj.length < 1) {
      updateShifts();
      return;
    }

    resetShifts();

    if (obj.length > 0) {
      var plan = JSON.parse(obj[0]['setting']);
      $('#vp_saften').val(plan['saften']);
      $('#vp_smorgen').val(plan['smorgen']);

      for (var k = 0; k < plan['alumni'].length; k++) { $('#a_vagtplan .alumner a:nth-child('+plan['alumni'][(k)]+')').addClass("vp_free"); }
      for (var k = 0; k < plan['extra'].length; k++) { $('#a_vagtplan .dage a:nth-child('+plan['extra'][(k)]+')').addClass("vp_extra"); }
      for (var k = 0; k < plan['closed'].length; k++) { $('#a_vagtplan .dage a:nth-child('+plan['closed'][(k)]+')').addClass("vp_closed"); }
      for (var k = 0; k < plan['only'].length; k++) { $('#a_vagtplan .dage a:nth-child('+plan['only'][(k)]+')').addClass("vp_only"); }
    }

    updateShifts();
  });

}
function updateShifts() {

  var date = new Date();
  var year = $('#vr_year').val();
  var month = $('#vr_month').val();
  var dinm = [31,28,31,30,31,30,31,31,30,31,30,31];
  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var dage = ['Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag','Søndag'];
  var days = dinm[month-1];
  var a1 = parseInt($('#vp_saften').val());
  var a2 = a1 + 2;
  var mc = parseInt($('#vp_smorgen').val());

  for (var i = 0; i < days; i++) { for (var j = 1; j < 5; j++) { $('#a_vagtplan .r_'+(i+1)+' .c_'+j).html(""); } }

  var alumni = [];
  var extra = [];
  var closed = [];
  var only = [];

  $('#a_vagtplan .vp_free').each(function () { alumni.push( parseInt($(this).attr("data-a-nr")) ); });
  $('#a_vagtplan .vp_extra').each(function () { extra.push( parseInt($(this).attr("data-d-nr")) ); });
  $('#a_vagtplan .vp_closed').each(function () { closed.push( parseInt($(this).attr("data-d-nr")) ); });
  $('#a_vagtplan .vp_only').each(function () { only.push( parseInt($(this).attr("data-d-nr")) ); });

  for (var i = 0; i < days; i++) {
    while (alumni.includes(a1)) { a1 = incr(a1); a2 = incr(a1); }
    while (alumni.includes(a2)) { a2 = incr(a2); }

    if (closed.includes(i+1)) { continue; }

    if (!only.includes(i+1)) {
      $('#a_vagtplan .r_'+(i+1)+' .c_1').html(a1);
      a1 = incr(a1);
      $('#a_vagtplan .r_'+(i+1)+' .c_2').html(a2);
      a2 = incr(a2);
    }

    var weekend = new Date(months[month-1]+" "+(i+1)+", "+year+" 12:00:00");
    if ((weekend.getDay() + 6) % 7 > 4 || extra.includes(i+1) || only.includes(i+1)) {
      while (alumni.includes(mc)) { mc = incr(mc); }
      $('#a_vagtplan .r_'+(i+1)+' .c_3').html(mc);
      mc = incr(mc);

      while (alumni.includes(mc)) { mc = incr(mc); }
      $('#a_vagtplan .r_'+(i+1)+' .c_4').html(mc);
      mc = incr(mc);
    }
  }

  $('#a_vagtplan .plan .tnt_row:not(:first-child) td:first-child').each(function (e) {
    var weekday = new Date(months[month-1]+" "+parseInt($(this).parent().attr("tnt_row"))+", "+year+" 12:00:00");
    $(this).html( dage[((weekday.getDay() + 6) % 7)] + '&nbsp;&nbsp;&nbsp;&nbsp;' + $(this).parent().attr("tnt_row") + '.' )
  });
  $('#a_vagtplan .plan tr').show();
  $('#a_vagtplan .plan tr').slice(days+1).hide();

}
function saveShifts() {

  var shifts = new Object();

  year = $('#vr_year').val();
  month = $('#vr_month').val();
  shifts['saften'] = parseInt($('#vp_saften').val());
  shifts['smorgen'] = parseInt($('#vp_smorgen').val());

  shifts['alumni'] = [];
  shifts['extra'] = [];
  shifts['closed'] = [];
  shifts['only'] = [];

  $('#a_vagtplan .vp_free').each(function () { shifts['alumni'].push( parseInt($(this).attr("data-a-nr")) ); });
  $('#a_vagtplan .vp_extra').each(function () { shifts['extra'].push( parseInt($(this).attr("data-d-nr")) ); });
  $('#a_vagtplan .vp_closed').each(function () { shifts['closed'].push( parseInt($(this).attr("data-d-nr")) ); });
  $('#a_vagtplan .vp_only').each(function () { shifts['only'].push( parseInt($(this).attr("data-d-nr")) ); });

  shifts = JSON.stringify(shifts);

  $.post('http://davidsvane.com/noko/server/db.php', {page: 'plan_insert', ver: 1, y: year, m: month, plan: shifts}, function (data) {

    if (data == 'success') {
      alert("Vagtplanen blev gemt");
    } else {
      alert("Noget gik galt på serveren");
    }

  });

}


// INFO: RETRIEVE AND UPDATE USER INFORMATION
function fetchAlumne() {

  var uid = $('#alumni_list').val();

  $.post('http://davidsvane.com/noko/server/db.php', {page: "a_alumner_fetch", u: uid, nr: localStorage.getItem("user")}, function (data) {

    var obj = JSON.parse(data);

    // INFO: THIS CHECKPOINT IS MET WHEN "NY ALUMNE" IS SELECTED
    if (!obj[0].length) {

      $('#ainfo h2').text('NY BEBOER');
      $('#ainfo').attr('user-id','new');
      $('#ainfo input').val("");
      $('#ainfo .ai_status select').val(0);
      $('#ainfo .ai_sex select').val(0);

    } else {

      obj = obj[0][0];

      // INFO: CHANGE TITLE AND DATA TO USER ID
      $('#ainfo h2').text('BEBOER '+obj.uid);
      $('#ainfo').attr('user-id',obj.uid);

      // INFO: INSERT USER INFORMATION IN RESPECTIVE FIELDS
      var todo = ["first","last","nr","room","mail","phone","study","pass"];
      todo.forEach(function (e) { $('#ainfo .ai_'+e+' input').val(obj[e]); });

      // INFO: SELECT RELEVANT DROPDOWN OPTIONS
      $('#ainfo .ai_status select').val(obj.status);
      $('#ainfo .ai_sex select').val(obj.sex);

    }

  });

}
function updateAlumne() {

  var uid = $('#ainfo').attr("user-id");
  var info = new Object();

  $('#ainfo input').each(function () { info[$(this).parent().attr("class").substr(3)] = $(this).val(); });
  $('#ainfo select').each(function () { info[$(this).parent().attr("class").substr(3)] = $(this).val(); });

  if (uid == "new") {

    var check = confirm("Du er ved at oprette en ny bruger!")
    if (!check) { return; }

    $.post('http://davidsvane.com/noko/server/db.php', {page: "a_alumner_insert", inf: info, nr: localStorage.getItem("user")}, function (data) {

      if (data == 'success') {
        alert("Informationerne blev gemt");
      } else {
        alert("Der skete en fejl på serveren");
      }

    });

  } else {

    $.post('http://davidsvane.com/noko/server/db.php', {page: "a_alumner_update", u: uid, inf: info, nr: localStorage.getItem("user")}, function (data) {

      if (data == 'success') {
        alert("Informationerne blev gemt");
      } else {
        alert("Der skete en fejl på serveren");
      }

    });

  }

}


// INFO: GENERATE CUSTOM LIST OF ALUMNE DATA
function listsAllNone() {

  var a = $('#l_form .options a').length / 2;
  var b = $('#l_form .options .chosen').length;

  if (b > a) {

    $('#l_form .options .chosen').click();

  } else {

    $('#l_form .options .chosen').click();
    $('#l_form .options a').click();

  }

}
function generateList() {

  if ( $('#l_form .options .chosen').length == 0 ) { alert("Du skal vælge hvad din liste skal indeholde."); return; }

  var options = [];
  $('#l_form .date .sort option:enabled').each(function () { options.push( $(this).val() ); });

  var params = {};

  params['options'] = [];
  $('#l_form .options .chosen').each(function () { params['options'].push( $(this).attr("data-select") ); });
  params['options'] = params['options'].join(", ");

  params['sort'] = $('#l_form .date .sort').val();
  params['start'] = $('#l_start').val();
  params['end'] = $('#l_end').val();

  params['restrict'] = $('#l_form .chosen[data-setting="restrict"]').length > 0 ? 1 : 0;

  params = JSON.stringify(params);

  $.post('http://davidsvane.com/noko/server/db.php', {page: "a_lists_fetch", p: params, nr: localStorage.getItem("user")}, function (data) {

    var obj = JSON.parse(data);
    obj = obj[0];
    var CSVprep = [options];
    var sum = 0;

    obj.forEach(function (e) {
      var temp = [];
      for (var ee = 0; ee < Object.keys(obj[0]).length/2; ee++) {
        temp.push(e[ee]);
      }
      CSVprep.push(temp);
    });

    CSVfile = Papa.unparse(CSVprep, {
      delimiter: ";"
    });
    var link = document.getElementById("downloadFix");
    link.setAttribute("download", "Alumneliste.csv");
    link.setAttribute("href", "data:text/csv;charset=utf-8,"+encodeURI(CSVfile));
    link.click();

  });

}
