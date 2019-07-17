// INFO: TOGGLING USER FAVORITE DISHES
function toggleFoodFavorite(add, week, day) {

  var p = add ? "food_fav_add" : "food_fav_remove";

  $.post('http://noko.dk/server/db.php', {page: p, w: week, d: day, nr: localStorage.getItem('user')}, function (data) {

    console.log(data);
    $('#fweek_'+week+' tr:nth-child('+day+')').toggleClass("selected");

  });

}


// INFO: SELECTING KITCHEN DUTY MONTH TO SHOW
function incr(n) {

  n = (n + 2) % 140;

  if (n < 2) {
    n += 1;
  }

  return n;

}
function loadDuty() {

  var y = $('#ps_year').val();
  var m = $('#ps_month').val();
  var dinm = [31,28,31,30,31,30,31,31,30,31,30,31];
  var vp_titles = ["Dato","Servering<br /><i>(17-20)</i>","Opvask<br /><i>(17-20)</i>","Tidlig morgenvagt<br /><i>(8:15-11:30)</i>","Sen morgenvagt<br /><i>(10-13)</i>"];
  var mths = ['Januar','Februar','Marts','April','Maj','Juni','Juli','August','September','Oktober','November','December'];
  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var dage = ['Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag','Søndag'];
  var days = dinm[m-1];

  $.post('http://noko.dk/server/db.php', {page: "a_vagtplan", y: y, m: m, nr: localStorage.getItem('user')}, function (data) {
    var obj = JSON.parse(JSON.parse(data)[0][0].setting);
    var alumni = obj.alumni;
    var closed = obj.closed;
    var extra = obj.extra;
    var only = obj.only;

    var a1 = parseInt(obj.saften);
    var a2 = a1 + 2;
    var mc = parseInt(obj.smorgen);

    $('#plan_list').html(generateTabsNTables(1,1,5,dinm[(m-1)]+1));
    $('#plan_list .tnt_btn').remove();
    $('#plan_list tr:first-child td').each(function (e) { $(this).html(vp_titles[parseInt( $(this).attr('tnt_col') )]); });
    $('#plan_list .tnt_row:not(:first-child) td:first-child').each(function (e) {
      var weekday = new Date(months[m-1]+" "+parseInt($(this).parent().attr("tnt_row"))+", "+y+" 12:00:00");
      $(this).html( dage[((weekday.getDay() + 6) % 7)] + '&nbsp;&nbsp;&nbsp;&nbsp;' + $(this).parent().attr("tnt_row") + '.' );
    });

    for (var i = 0; i < days; i++) {
      while (alumni.includes(a1)) { a1 = incr(a1); a2 = incr(a1); }
      while (alumni.includes(a2)) { a2 = incr(a2); }

      if (closed.includes(i+1)) { continue; }

      if (!only.includes(i+1)) {
        $('#plan_list .r_'+(i+1)+' .c_1').html(a1);
        a1 = incr(a1);
        $('#plan_list .r_'+(i+1)+' .c_2').html(a2);
        a2 = incr(a2);
      }

      var weekend = new Date(months[m-1]+" "+(i+1)+", "+y+" 12:00:00");
      if ((weekend.getDay() + 6) % 7 > 4 || extra.includes(i+1) || only.includes(i+1)) {
        while (alumni.includes(mc)) { mc = incr(mc); }
        $('#plan_list .r_'+(i+1)+' .c_3').html(mc);
        mc = incr(mc);

        while (alumni.includes(mc)) { mc = incr(mc); }
        $('#plan_list .r_'+(i+1)+' .c_4').html(mc);
        mc = incr(mc);
      }
    }
  });

}


// INFO: FUNCTIONS FROM ANSVAR
function updateAparts() {

  var aps = [];
  $('#r_apart input').each(function (e) { aps[$(this).attr("data-l")] = encodeURIComponent($(this).val()); });

  $.post('http://noko.dk/server/db.php', {page: 'r_apart_update', lss: aps["LSS"], l2n: aps["L2N"], l5n: aps["L5N"], nr: localStorage.getItem('user')}, function (data) {

    console.log(data);

    if (data == "success") {
      alert("Beboerne blev gemt");
    } else {
      alert("Der skete en fejl på serveren")
    }

  });

}

function addCal() {

  var date = $('#r_c_date').val();
  var name = $('#r_c_name').val();
  var who = $('#r_c_who').val();

  $.post('http://noko.dk/server/db.php', {page: 'r_cal_add', n: name, d: date, w: who, nr: localStorage.getItem('user')}, function (data) {

    console.log(data);

    if (data == "success") {
      console.log("Eventet blev oprettet");
    } else {
      console.log("Der skete en fejl på serveren")
    }

    load('r_cal');

  });

}
function removeCal(eid) {

  $.post('http://noko.dk/server/db.php', {page: 'r_cal_remove', e: eid, nr: localStorage.getItem('user')}, function (data) {

    console.log(data);

    if (data == "success") {
      console.log("Eventet er slettet");
    } else {
      console.log("Der skete en fejl på serveren")
    }

    load('r_cal');

  });

}
function editCal(eid, date, name, who) {

  $.post('http://noko.dk/server/db.php', {page: 'r_cal_remove', e: eid, nr: localStorage.getItem('user')}, function (data) {

    console.log(data);

    if (data == "success") {
      console.log("Udvalget er slettet");
    } else {
      console.log("Der skete en fejl på serveren")
    }

    $('#r_c_cals tr[data-id="'+eid+'"]').remove();

    $('#r_c_date').val(date);
    $('#r_c_name').val(name);
    $('#r_c_who').val(who);

  });

}

function addGroup() {

  var title = $('#r_c_name').val();
  var desc = $('#r_c_desc').val();
  var leader = $('#r_c_who').val();
  var liable = localStorage.getItem('user');

  $.post('http://noko.dk/server/db.php', {page: 'r_groups_add', t: title, d: desc, le: leader, li: liable, nr: liable}, function (data) {

    console.log(data);

    if (data == "success") {
      console.log("Udvalget blev oprettet");
    } else {
      console.log("Der skete en fejl på serveren")
    }

    load('r_groups');

  });

}
function removeGroup(eid) {

  $.post('http://noko.dk/server/db.php', {page: 'r_groups_remove', e: eid, nr: localStorage.getItem('user')}, function (data) {

    console.log(data);

    if (data == "success") {
      console.log("Udvalget er slettet");
    } else {
      console.log("Der skete en fejl på serveren")
    }

    load('r_groups');

  });

}
function editGroup(eid, name, who, desc) {

  $.post('http://noko.dk/server/db.php', {page: 'r_groups_remove', e: eid, nr: localStorage.getItem('user')}, function (data) {

    console.log(data);

    if (data == "success") {
      console.log("Udvalget er slettet");
    } else {
      console.log("Der skete en fejl på serveren")
    }

    $('#r_c_cals tr[data-id="'+eid+'"]').remove();

    $('#r_c_name').val(name);
    $('#r_c_who').val(who);
    $('#r_c_desc').val(desc);

  });

}

function addPost() {

  var title = $('#r_c_name').val();
  var desc = $('#r_c_desc').val();
  var who = $('#r_c_who').val();
  var liable = localStorage.getItem('user');

  $.post('http://noko.dk/server/db.php', {page: 'r_posts_add', t: title, d: desc, w: who, l: liable, nr: liable}, function (data) {

    console.log(data);

    if (data == "success") {
      console.log("Hvervet blev oprettet");
    } else {
      console.log("Der skete en fejl på serveren")
    }

    load('r_posts');

  });

}
function removePost(eid) {

  $.post('http://noko.dk/server/db.php', {page: 'r_posts_remove', e: eid, nr: localStorage.getItem('user')}, function (data) {

    console.log(data);

    if (data == "success") {
      console.log("Hvervet er slettet");
    } else {
      console.log("Der skete en fejl på serveren")
    }

    load('r_posts');

  });

}
function editGroup(eid, name, who, desc) {

  $.post('http://noko.dk/server/db.php', {page: 'r_posts_remove', e: eid, nr: localStorage.getItem('user')}, function (data) {

    console.log(data);

    if (data == "success") {
      console.log("Udvalget er slettet");
    } else {
      console.log("Der skete en fejl på serveren")
    }

    $('#r_c_cals tr[data-id="'+eid+'"]').remove();

    $('#r_c_name').val(name);
    $('#r_c_who').val(who);
    $('#r_c_desc').val(desc);

  });

}
