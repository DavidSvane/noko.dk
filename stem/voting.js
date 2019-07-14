function userLogin() {

  var u = $('#ul_user').val();
  var p = MD5($('#ul_pass').val());

  $.post('http://noko.dk/server/verify.php', {usr: u, pas: p}, function (data) {

    if (data.length > 42) {

      var nr = JSON.parse(data)[0].uid;
      localStorage.setItem("u_vote_nr", nr);
      $('.notverified').removeClass("notverified");
      $('#login').remove();
      console.log(data);

    } else {
      alert("Forkert brugernavn eller kode")
    }

  });

}

function showMenu() {

  $('nav').show();
  $('main div').hide();

}
function showPoll(p) {

  $('nav').hide();
  $('main div').hide();
  $('main .pid_'+p).show();

}
function generatePollsList() {

  $.post('http://noko.dk/server/db.php', {page: 'stem', nr: localStorage.getItem("u_vote_nr"), ver: 1}, function (data) {

    var obj = JSON.parse(data)[0];

    if (obj.length == 0) {

      $('nav').append('<h1>INGEN AFSTEMNINER</h1>');
      return;

    }

    obj.forEach(function (e) {

      var qs = JSON.parse(e.question);

      $('nav').append('<a href="javascript:showPoll('+e.id+')">'+qs[0]+'</a>');

      switch (e.type) {
        case "0":
          $('main').append('<div data-pid="'+e.id+'" data-type="'+e.type+'" class="pid_'+e.id+' pt_'+e.type+'"><h2>'+qs[0]+'</h2><a data-val="1">FOR</a><a data-val="0">IMOD</a><button data-pid="'+e.id+'">AFGIV STEMME</button></div>');
        break;

        case "1":
          $('main').append('<div data-pid="'+e.id+'" data-type="'+e.type+'" class="pid_'+e.id+' pt_'+e.type+'"><h2>'+qs[0]+'</h2><button data-pid="'+e.id+'">AFGIV STEMME</button></div>');
          for (var i = 1; i < qs.length; i++) { $('main > div:last-child button').before('<a data-val="'+i+'">'+qs[i]+'</a>'); }
        break;

        case "2":
          $('main').append('<div data-pid="'+e.id+'" data-type="'+e.type+'" data-max="'+qs[qs.length-1]+'" class="pid_'+e.id+' pt_'+e.type+'"><h2>'+qs[0]+'<br />(vælg og til '+qs[qs.length-1]+')</h2><button data-pid="'+e.id+'">AFGIV STEMME</button></div>');
          for (var i = 1; i < qs.length-1; i++) { $('main > div:last-child button').before('<a data-val="'+i+'">'+qs[i]+'</a>'); }
        break;
      }

    });

    showMenu();

    $('main > div > a').click(function () {
      var val = $(this).attr("data-val");
      var pid = $(this).parent().attr("data-pid");
      var type = $(this).parent().attr("data-type");

      if (type < 2) {
        $('.pid_'+pid+' a').removeClass("sel");
        $('.pid_'+pid+' a[data-val="'+val+'"]').addClass("sel");
      } else {
        var max = $('main .pid_'+pid+' .sel').length;
        if ($(this).hasClass("sel") || max < $('main .pid_'+pid).attr("data-max")) {
          $('.pid_'+pid+' a[data-val="'+val+'"]').toggleClass("sel");
        } else {
          alert("Du man maks vælge "+max+" muligheder")
        }
      }
    });

    $('main > div > button').click(function () {
      var pid = $(this).attr("data-pid");
      var sels = $('main .pid_'+pid+' .sel');
      var vote = [];

      // INFO: CHECK THAT THE USER MADE A SELECTION
      if (sels.length == 0) { alert("Du skal vælge en mulighed."); return; }

      // INFO: REQUIRES A CONFIRMATIONS FROM THE USER
      if (!confirm("Du kan ikke vælge om.\nKun den første afgivne stemme tæller.")) { return; }

      for (var i = 0; i < sels.length; i++) {
        vote.push(sels[i].dataset['val']);
      }
      vote = JSON.stringify(vote);

      $.post('http://noko.dk/server/db.php', {page: 'poll_vote', id: pid, nr: localStorage.getItem("u_vote_nr"), v: vote, ver: 1}, function (data) {
        alert("Din stemme er modtaget.");
        showMenu();
      });
    });

  });

}


$( document ).ready( generatePollsList() );
