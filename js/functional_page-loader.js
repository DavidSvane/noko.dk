// INFO: LOADS PAGE INTO MAIN TAG
// IS CALLED FROM 'noko_menu_click.js'

function verifyUser() {

  var user = $('#name_field').val();
  var pass = MD5($('#pass_field').val());

  $.post('http://davidsvane.com/noko/server/verify.php', {usr: user, pas: pass}, function (data) {

    if (data.length < 200) {
      alert('Forkert brugernavn eller password.');
    } else {
      var obj = JSON.parse(data);
      if (obj[0]['name'] == "admin") {
        localStorage.setItem('user','admin');
        localStorage.setItem('salt',obj['salt']);
        localStorage.setItem('room','admin');
        setCookie('user','admin');
        setCookie('salt',obj['salt']);
        setCookie('room','admin');
      } else {
        localStorage.setItem('user',obj[0].nr);
        localStorage.setItem('salt',obj['salt']);
        localStorage.setItem('room',obj[0].room);
        setCookie('user',obj[0].nr);
        setCookie('salt',obj['salt']);
        setCookie('room',obj[0].room);
      }
      location.reload();
    }

    if (obj['admin']) { $('#admin').show(); }

  });

}

function loginPage(p) {

  $('main').html('<div id="'+p+'"></div>');
  $('#'+p).html('<input type="text" name="name" id="name_field" placeholder="Navn, fornavn, mail eller løbenr" autofocus/><input type="password" name="pass" id="pass_field" placeholder="Password"/><input type="submit" value="Log ind" onclick="javascript:verifyUser()"/>');

  $('#name_field').keypress(function (e) {
    if (e.which == 13) {
      verifyUser();
    }
  });
  $('#pass_field').keypress(function (e) {
    if (e.which == 13) {
      verifyUser();
    }
  });

}

function load(p, reload = false) {

  if (p == 'login') {

    if (localStorage.getItem('user') && localStorage.getItem('salt')) {

      $.post('http://davidsvane.com/noko/server/verify.php', {usr: localStorage.getItem('user'), sal: localStorage.getItem('salt')}, function (data) {

        if (data.length < 42) {
          loginPage(p);
        } else {
          load('a_madfavs');
        }

      });

    } else {

      loginPage(p);

    }

  } else if (p == 'logud') {

    localStorage.removeItem('user');
    localStorage.removeItem('salt');
    localStorage.removeItem('room');
    deleteCookie('user');
    deleteCookie('salt');
    deleteCookie('room');
    $('#admin').hide();
    load('login');

  } else {

    if (localStorage.getItem('user') && localStorage.getItem('salt')) {

      $.post('http://davidsvane.com/noko/server/verify.php', {usr: localStorage.getItem('user'), sal: localStorage.getItem('salt')}, function (data) {

        if (data.length < 42) {

          loginPage(p);

        } else {

          var upgraded = ['rooms','speaker','a_vagtplan','news','guides','news_types','news_edit','stem','a_madfavs','a_pass'];
          var version = upgraded.includes(p) ? 1 : 0;

          $.post('http://davidsvane.com/noko/server/db.php', {page: p, nr: localStorage.getItem('user'), ver: version, re: reload}, function (data) {

            try {
              var obj = JSON.parse(data);
              var adm = obj[1];
              var obj = obj[0];
              var keys = Object.keys(obj[0]).length/2;
            } catch (err) {}

            finally {
                var dage = ['Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag','Søndag'];
                var mths = ['Januar','Februar','Marts','April','Maj','Juni','Juli','August','September','Oktober','November','December'];
                var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                var dinm = [31,28,31,30,31,30,31,31,30,31,30,31];
                var date = new Date();
                var stati = [0,2,3,6];
                var user_room = localStorage.getItem('room');

                if (adm) { $('#admin').show(); }
                $('main').html('<div id="'+p+'"></div>');

                // INFO: ALPHABETIC LIST OF THE LOGICS GENERATING EACH PAGE
                switch(p) {

                  case 'bike': // INFO: SYSTEM TIL BOOKING AF LADCYKLEN
                    $('#'+p).addClass('cnt_book');
                    var curr_week = date.toISOString().substr(0,19).replace("T"," ").replace(/-/g, '/');
                    curr_week = weekFromISO(curr_week);
                    var curr_day = date.getDay();
                    var curr_time = Math.floor(((date.getHours()*60)+date.getMinutes())/120+2);
                    var week_id = 0;
                    var counter = 0;
                    var timer = 0;

                    // INFO: GENERATES BTNS, TABS AND TABLES
                    $('#'+p).html(generateTabsNTables(5,1,8,13));
                    $('#'+p).prepend('<h2>LADCYKEL</h2>');

                    // INFO: ADD TEXT TO BUTTONS
                    $('#'+p+' .tnt_btn').each(function (e) {
                      $(this).text('Uge ' + ( ( curr_week + parseInt( $(this).attr('tnt_btn') ) ) % 52) );
                      $(this).click(function (e) {
                        $('#'+p+' .tnt_btn').css('font-weight', 'normal');
                        $('#'+p+' .b_'+$(this).attr('tnt_btn')).css('font-weight', 'bold');
                        $('#'+p+' .tnt_tab').hide();
                        $('#'+p+' .d_'+$(this).attr('tnt_btn')).show();
                      });
                    });
                    if (reload) {
                      $('#'+p+' .b_'+localStorage.getItem('temp')).click();
                    } else {
                      $('#'+p+' .b_0').click();
                    }

                    // INFO: ADD FIRST-ROW TITLES
                    $('#'+p+' .tnt_table tr:first-child td').each(function (e) {
                      if (parseInt( $(this).attr('tnt_col') ) == 0) {
                        $(this).text('Tid');
                      } else {
                        $(this).text(dage[ parseInt( $(this).attr('tnt_col') ) - 1 ]);
                      }
                    });

                    // INFO: ADD TIMES TO FIRST COLUMN
                    for (var i=2; i<20; i++) {
                      $('#'+p+' tr:nth-child('+i+') td:first-child').text(('0'+Math.floor(timer/60)%24).substr(-2)+':'+('0'+timer%60).substr(-2));
                      timer += 120;
                    }

                    // INFO: ADDING ROOM NUMBERS TO RESERVED TIMES
                    obj.forEach(function (e) {
                      week_id = weekFromISO(e['week'].replace(/-/g,'/')) - curr_week;
                      if (e['room'] == user_room) {
                        $('#'+p+' .d_'+week_id+' .r_'+(parseInt(e['time'])+1)+' .c_'+e['day']).html('<a id="b_'+e['id']+'" class="owner" onclick="javascript:removeBike('+e['id']+')">'+e['room']+'</a>');
                      } else {
                        $('#'+p+' .d_'+week_id+' .r_'+(parseInt(e['time'])+1)+' .c_'+e['day']).text(e['room']);
                      }
                    });

                    // INFO: ADDING BOOKING BUTTONS
                    $('#'+p+' td:empty').html('<a class="availables"></a>');
                    $('.availables').each(function (e) {
                      if ( $(this).closest("div").attr("tnt_tab") == 0 && (($(this).closest("td").attr("tnt_col") < curr_day) || ($(this).closest("td").attr("tnt_col") == curr_day && $(this).closest("tr").attr("tnt_row") < curr_time)) ) {
                        $(this).remove();
                      } else {
                        $(this).click(function (e) {
                          bookBike(
                            parseInt($(this).closest("div").attr("tnt_tab")),
                            parseInt($(this).closest("td").attr("tnt_col")),
                            parseInt($(this).closest("table").attr("tnt_table"))+1,
                            parseInt($(this).closest("tr").attr("tnt_row")-1)
                          );
                        });
                      }
                    });
                  break;

                  case 'cal': // INFO: KALENDER MED NOKO ÅRETS NOKOARRANGEMENTER
                    var stadig_f = true;
                    $('#'+p).append('<h2>'+date.getFullYear()+'</h2>');
                    $('#'+p).append('<table><tr><td><b>Forår</b><br /></td></tr></table>');
                    obj.forEach(function (e) {
                      if (stadig_f && parseInt(e['date'].substr(5,2)) > 7) {
                        $('#'+p+' tr').append('<td><b>Efterår</b><br /></td>');
                        stadig_f = false;
                      }
                      $('#'+p+' td:last-child').append('<p><i>'+parseInt(e['date'].substr(8,2))+'/'+parseInt(e['date'].substr(5,2))+')</i> ' +e['name']+' '+e['who']+'</p>');
                    });
                  break;

                  case 'changes': // INFO: SIDSTE TRE MÅNEDERS ÆNDRINGER I ALUMNER
                    $('#'+p).append("<div></div>");

                    obj.forEach(function (e) {

                      if ( $('#'+p+' ._'+e.date.substr(0,7)).length == 0 ) {
                        $('#'+p+' > div').append('<div class="_'+e.date.substr(0,7)+'"><h2>'+mths[parseInt(e.date.substr(5,7))-1]+' '+e.date.substr(0,4)+'</h2></div>');
                      }
                      if ( $('#'+p+' ._'+e.date.substr(0,7)+' ._'+e.status).length == 0 ) {
                        $('#'+p+' ._'+e.date.substr(0,7)).append('<div class="_'+e.status+'"><h3>'+e.title+'</h3></div>');
                      }

                      $('#'+p+' ._'+e.date.substr(0,7)+' ._'+e.status).append('<p>'+e.name+' ('+e.room+')</p>');

                    });

                    $('#'+p+' > div').css("grid-template-columns", "repeat("+$('#'+p+' > div > div').length+", 1fr)")
                  break;

                  case 'corridors': // INFO: GANGOVERSIGT OVER NUVÆRENDE ALUMNER
                    $('#'+p).append('<b>Nuværende beboere</b>');

                    var gangs = ["Stuen Nord", "1. Nord", "2. Nord", "3. Nord", "4. Nord", "5. Nord", "Stuen Syd", "1. Syd", "2. Syd", "3. Syd", "4. Syd", "5. Syd"];
                    var gang = {1:0, 3:0, 5:0, 7:0, 9:0, 11:0, 13:0, 15:0, 17:0, 19:0, 21:0, 23:0, 25:1, 27:1, 29:1, 31:1, 33:1, 35:1, 37:1, 39:1, 41:1, 43:2, 45:2, 47:2, 49:2, 51:2, 53:2, 55:2, 57:2, 59:2, 61:2, 63:2, 65:2, 67:3, 69:3, 71:3, 73:3, 75:3, 77:3, 79:3, 81:3, 83:3, 85:3, 87:3, 89:3, 91:3, 93:3, 95:3, 97:4, 99:4, 101:4, 103:4, 105:4, 107:4, 109:4, 111:4, 113:4, 115:4, 117:4, 119:4, 121:4, 123:4, 125:4, 127:5, 129:5, 131:5, 133:5, 135:5, 137:5, 139:5, 2:6, 4:6, 6:6, 8:6, 10:6, 12:6, 14:6, 16:6, 20:7, 22:7, 24:7, 26:7, 28:7, 30:7, 32:7, 34:7, 36:7, 38:7, 40:7, 42:7, 44:8, 46:8, 48:8, 50:8, 52:8, 54:8, 56:8, 58:8, 60:8, 62:8, 64:8, 66:8, 68:9, 70:9, 72:9, 74:9, 76:9, 78:9, 80:9, 82:9, 84:9, 86:9, 88:9, 90:9, 92:10, 94:10, 96:10, 98:10, 100:10, 102:10, 104:10, 106:10, 108:10, 110:10, 112:10, 114:10, 116:11, 118:11, 120:11, 122:11};

                    gangs.forEach(function (g, i) { $('#'+p).append('<div class="_'+i+'"><b>'+g+'</b></div>') });

                    obj.forEach(function (e) {
                      $('#'+p+' ._'+gang[ e.room ]).append('<p onclick="showAlumne('+e.uid+')">'+e['room']+': '+e['name']+'</p>');
                    });
                  break

                  case 'current': // INFO: ALFABETISK LISTE OVER NUVÆRENDE ALUMNER
                    $('#'+p).append('<div class="_0 _2 _3 _6 present"><b>Nuværende beboere</b></div>');
                    $('#'+p).append('<div class="_1"><b>Orlov</b><div></div></div>');
                    var l = "";

                    obj.forEach(function (e) {

                      if (e['status'] != 1) {

                        l = e.name.substr(0,1).toUpperCase();

                        if ($('#'+p+' ._'+l).length == 0) {
                          $('#'+p+' ._'+e.status).append('<div class="_'+l+'"><b>'+l+'</b></div>');
                        }

                        $('#'+p+' ._'+e.status+' ._'+l).append('<p onclick="showAlumne('+e.uid+')">'+e.name+', '+e.room+'</p>');

                      } else {

                        $('#'+p+' ._1 div').append('<p>'+e.name+', '+e.room+'</p>');

                      }
                    });
                  break;

                  case 'files': // INFO: RELEVANTE DOKUMENTER FOR NOKOS ALUMNER
                    $('#'+p).append('<div class="files"></div>');

                    var f = JSON.parse(data);
                    var l = f.length;

                    for (var i = 0; i < l-2; i++) {
                      $('#'+p+' .files').append('<a href="http://davidsvane.com/noko/files/'+f[i+2]+'" target="_blank">'+f[i+2].split(".")[0]+'</a>');
                    }
                  break;

                  case 'food': // INFO: DENNE OG KOMMEN UGES MADPLAN
                    var denne_uge = true;
                    var week_nr = 0;
                    obj.forEach(function (e) {
                      week_nr = weekFromISO(e.week.replace(/-/g,'/'));
                      $('#'+p).append('<h2>Uge '+week_nr+'</h2><table id="fweek_'+week_nr+'"></table>');
                      for (var i=1; i<8; i++) { $('#'+p+' table:last-of-type').append('<tr><td>'+dage[i-1]+'</td><td class="favorite"><div><i class="material-icons" onclick="javascript:toggleFoodFavorite(true,'+week_nr+','+i+')">favorite_border</i><i class="material-icons" onclick="javascript:toggleFoodFavorite(false,'+week_nr+','+i+')">favorite</i></div></td><td>'+e[i]+'</td></tr>'); }
                    });

                    $.post('http://davidsvane.com/noko/server/db.php', {page: "food_favs", nr: localStorage.getItem('user'), ver: 1}, function (data) {

                      var u_favs = JSON.parse(data)[0];

                      u_favs.forEach(function (e) {
                        $('#fweek_'+e.week+' tr:nth-child('+e.day+')').toggleClass("selected");
                      });

                    });
                  break;

                  case 'front': // INFO: DEN GAMLE FORSIDE SOM NU ER UNDER INFO
                    obj.forEach(function (e) {
                      $('#'+p).append('<p>'+e[1]+'</p><br />');
                    });
                    $('#'+p).after('<br /><img src="../res/img10.jpg"/>');
                  break;

                  case 'groups': // INFO: LISTE OVER UDVALG STIFTET VED PLENUM SAMT FORMAND
                    $('#'+p).append('<h1>UDVALG</h1><div class="groups"></div>');

                  break;

                  case 'guides': // INFO: VEJLEDNINGER TIL OFTE STILLEDE SPØRGSMÅL
                    $('#'+p).append('<i>Klik på en guide herunder for at se indholdet</i>');
                    obj.forEach(function (e) {
                      $('#'+p).append('<a href="javascript:$(\'#guide_'+e.id+'\').toggle()">'+e.title+'</a><div class="guide_cnt" id="guide_'+e.id+'">'+e.content+'</div>');
                    });
                  break;

                  case 'gym': // INFO: SYSTEM TIL BOOKING AF GYMNASTIKSALEN
                    $('#'+p).addClass('cnt_book');
                    var curr_week = date.toISOString().substr(0,19).replace("T"," ").replace(/-/g,'/');
                    curr_week = weekFromISO(curr_week);
                    var curr_day = date.getDay();
                    var curr_time = Math.floor(((date.getHours()*60)+date.getMinutes()-420)/90+2);
                    var week_id = 0;
                    var timer = 420;

                    // INFO: GENERATES BTNS, TABS AND TABLES
                    $('#'+p).html(generateTabsNTables(5,1,8,11));
                    $('#'+p).prepend('<h2>GYMNASTIKSAL</h2>');

                    // INFO: ADD TEXT TO BUTTONS
                    $('#'+p+' .tnt_btn').each(function (e) {
                      $(this).text('Uge ' + ( ( curr_week + parseInt( $(this).attr('tnt_btn') ) ) % 52) );
                      $(this).click(function (e) {
                        $('#'+p+' .tnt_btn').css('font-weight', 'normal');
                        $('#'+p+' .b_'+$(this).attr('tnt_btn')).css('font-weight', 'bold');
                        $('#'+p+' .tnt_tab').hide();
                        $('#'+p+' .d_'+$(this).attr('tnt_btn')).show();
                      });
                    });
                    if (reload) {
                      $('#'+p+' .b_'+localStorage.getItem('temp')).click();
                    } else {
                      $('#'+p+' .b_0').click();
                    }

                    // INFO: ADD FIRST-ROW TITLES
                    $('#'+p+' .tnt_table tr:first-child td').each(function (e) {
                      if (parseInt( $(this).attr('tnt_col') ) == 0) {
                        $(this).text('Tid');
                      } else {
                        $(this).text(dage[ parseInt( $(this).attr('tnt_col') ) - 1 ]);
                      }
                    });

                    // INFO: ADD TIMES TO FIRST COLUMN
                    for (var i=2; i<12; i++) {
                      $('#'+p+' tr:nth-child('+i+') td:first-child').text(('0'+Math.floor(timer/60)%24).substr(-2)+':'+('0'+timer%60).substr(-2));
                      timer += 90;
                    }

                    // INFO: ADDING ROOM NUMBERS TO RESERVED TIMES
                    obj.forEach(function (e) {
                      week_id = weekFromISO(e['week'].replace(/-/g,'/')) - curr_week;
                      if (e['room'] == user_room) {
                        $('#'+p+' .d_'+week_id+' .r_'+(parseInt(e['time'])+1)+' .c_'+e['day']).html('<a id="b_'+e['id']+'" class="owner" onclick="javascript:removeGym('+e['id']+')">'+e['room']+'</a>');
                      } else {
                        $('#'+p+' .d_'+week_id+' .r_'+(parseInt(e['time'])+1)+' .c_'+e['day']).text(e['room']);
                      }
                    });

                    // INFO: FIXED WEEKLY EVENTS
                    $('#'+p+' .r_9 .c_1').text('Floorball');
                    $('#'+p+' .r_9 .c_3').text('Floorball');
                    $('#'+p+' .r_8 .c_2').text('Pigefodbold');
                    $('#'+p+' .r_9 .c_2').text('Pigefodbold');

                    $('#'+p+' .r_7 .c_1').text('Tabata');
                    $('#'+p+' .r_8 .c_1').text('Tabata');
                    $('#'+p+' .r_7 .c_4').text('Tabata');
                    $('#'+p+' .r_8 .c_4').text('Tabata');

                    // INFO: ADDING BOOKING BUTTONS
                    $('#'+p+' td:empty').html('<a class="availables"></a>');
                    $('.availables').each(function (e) {
                      if ( $(this).closest("div").attr("tnt_tab") == 0 && (($(this).closest("td").attr("tnt_col") < curr_day) || ($(this).closest("td").attr("tnt_col") == curr_day && $(this).closest("tr").attr("tnt_row") < curr_time)) ) {
                        $(this).remove();
                      } else {
                        $(this).click(function (e) {
                          bookGym(
                            parseInt($(this).closest("div").attr("tnt_tab")),
                            parseInt($(this).closest("td").attr("tnt_col")),
                            parseInt($(this).closest("table").attr("tnt_table"))+1,
                            parseInt($(this).closest("tr").attr("tnt_row")-1)
                          );
                        });
                      }
                    });
                  break;

                  case 'history': // INFO: ALUMNEÆNDRINGER PÅ ÅRSBASIS
                    var c_y = "";
                    var c_s = "";

                    $('#'+p).append('<select></select><div id="h_years"></div>');

                    obj.forEach(function (e) {
                      c_y = e.date.substr(0,4);
                      c_s = e.status;

                      if (!$('#h_years ._'+c_y).length) {
                        $('#h_years').append('<div class="_'+c_y+'"></div>');
                        $('#'+p+' select').append('<option value="'+c_y+'">'+c_y+'</option>');
                      }
                      if (!$('#h_years ._'+c_y+' ._'+c_s).length) { $('#h_years ._'+c_y).append('<div class="_'+c_s+'"><h3>'+e.title+'</h3><div></div></div>'); }

                      $('#h_years ._'+c_y+' ._'+c_s+' div').append('<p>'+e.name+' ('+e.room+') <i>'+mths[parseInt(e.date.substr(5,2))-1].substr(0,3)+'</i></p>');
                    });

                    var sorted_list = $('#'+p+' select option');
                    sorted_list.sort(function (a,b) {
                      a = a.value;
                      b = b.value;
                      return b-a;
                    });
                    $('#'+p+' select').html(sorted_list);
                    $('#'+p+' select option:first-child').attr("selected",true);
                    c_y = $('#'+p+' select option:first-child').val();

                    $('#h_years > ._'+c_y).show();
                    $('#h_years > div ._0')

                    $('#'+p+' select').change(function () {
                      $('#h_years > div').hide();
                      $('#h_years ._'+$('#'+p+' select').val()).show();
                    });

                    $('#h_years h3').each(function () {
                      $(this).append(": " + $(this).next().find('p').length );
                    });
                  break;

                  case 'laundry': // INFO: SYSTEMET TIL AT BOOKE VASKETIDER
                    $('#'+p).addClass('cnt_book');
                    var curr_week = date.toISOString().substr(0,19).replace("T"," ").replace(/-/g,'/');
                    curr_week = weekFromISO(curr_week);
                    var curr_day = date.getDay();
                    var curr_time = Math.floor(((date.getHours()*60)+date.getMinutes()-360)/75)+2;
                    var week_id = 0;
                    var counter = 0;
                    var timer = 360;

                    // INFO: GENERATES BTNS, TABS AND TABLES
                    $('#'+p).html(generateTabsNTables(3,3,8,19));
                    $('#'+p).prepend('<h2>VASKETIDER</h2>');

                    // INFO: ADD TEXT TO BUTTONS
                    $('#'+p+' .tnt_btn').each(function (e) {
                      $(this).text('Uge ' + ( ( curr_week + parseInt( $(this).attr('tnt_btn') ) ) % 52) );
                      $(this).click(function (e) {
                        $('#'+p+' .tnt_btn').css('font-weight', 'normal');
                        $('#'+p+' .b_'+$(this).attr('tnt_btn')).css('font-weight', 'bold');
                        $('#'+p+' .tnt_tab').hide();
                        $('#'+p+' .d_'+$(this).attr('tnt_btn')).show();
                      });
                    });
                    if (reload) {
                      $('#'+p+' .b_'+localStorage.getItem('temp')).click();
                    } else {
                      $('#'+p+' .b_0').click();
                    }

                    // INFO: ADD TABLE TITLES
                    $('#'+p+' .tnt_table').each(function (e) {
                      if (parseInt($(this).attr('tnt_table')) == 0) {
                        $(this).before('<p>Maskine ' + ( parseInt($(this).attr('tnt_table')) + 1) + ' <i>(allergivenlig)</i></p>');
                      } else {
                        $(this).before('<p>Maskine ' + ( parseInt($(this).attr('tnt_table')) + 1) + '</p>');
                      }
                    });

                    // INFO: ADD FIRST-ROW TITLES
                    $('#'+p+' .tnt_table tr:first-child td').each(function (e) {
                      if (parseInt( $(this).attr('tnt_col') ) == 0) {
                        $(this).text('Tid');
                      } else {
                        $(this).text(dage[ parseInt( $(this).attr('tnt_col') ) - 1 ].substr(0,1));
                      }
                    });

                    // INFO: ADD TIMES TO FIRST COLUMN
                    for (var i=2; i<20; i++) {
                      $('#'+p+' tr:nth-child('+i+') td:first-child').text(('0'+Math.floor(timer/60)%24).substr(-2)+':'+('0'+timer%60).substr(-2));
                      timer += 75;
                    }

                    // INFO: ADDING ROOM NUMBERS TO RESERVED TIMES
                    obj.forEach(function (e) {
                      week_id = weekFromISO(e['week'].replace(/-/g,'/')) - curr_week;
                      if (adm || e['room'] == user_room) {
                        $('#'+p+' .d_'+week_id+' .t_'+(parseInt(e['nr'])-1)+' .r_'+(parseInt(e['time'])+1)+' .c_'+e['day']).html('<a id="b_'+e['id']+'" class="owner" onclick="javascript:removeLaundry('+e['id']+')">'+e['room']+'</a>');
                      } else {
                        $('#'+p+' .d_'+week_id+' .t_'+(parseInt(e['nr'])-1)+' .r_'+(parseInt(e['time'])+1)+' .c_'+e['day']).text(e['room']);
                      }
                    });

                    // INFO: ADDING BOOKING BUTTONS
                    $('#'+p+' td:empty').html('<a class="availables"></a>');
                    $('.availables').each(function (e) {
                      if ( $(this).closest("div").attr("tnt_tab") == 0 && (($(this).closest("td").attr("tnt_col") < curr_day) || ($(this).closest("td").attr("tnt_col") == curr_day && $(this).closest("tr").attr("tnt_row") < curr_time)) ) {
                        $(this).remove();
                      } else {
                        $(this).click(function (e) {
                          bookLaundry(
                            parseInt($(this).closest("div").attr("tnt_tab")),
                            parseInt($(this).closest("td").attr("tnt_col")),
                            parseInt($(this).closest("table").attr("tnt_table"))+1,
                            parseInt($(this).closest("tr").attr("tnt_row")-1)
                          );
                        });
                      }
                    });
                  break;

                  case 'me': // INFO: BRUGERNES PROFIL HVOR MAIL, PASSWORD OG BILLEDE KAN REDIGERES
                    $('#'+p).append('<div><div id="me_pic"></div><div id="me_info"></div></div>');

                    var refresher = Math.random();
                    $('#me_pic').append('<img onclick="javascript:changeImage()" src="http://noko.dk/ds/alumner/'+obj[0].nr+'.jpg?time='+refresher+'" onerror="this.src=\'../res/missing_photo.png\'"/>');
                    $('#me_pic').append('<a id="img_new" onclick="javascript:changeImage()"><i class="material-icons">add_circle_outline</i></a>');

                    $('#me_info').append('<h2 user-id="'+obj[0].uid+'" user-nr="'+obj[0].nr+'">'+obj[0].first+' '+obj[0].last+' ('+obj[0].nr+')</h2><br />');
                    $('#me_info').append('<span><i>Mail</i><input id="p_mail" type="text" value="'+obj[0].mail+'"/></span>');
                    $('#me_info').append('<span><i>Telefon</i><input id="p_phone" type="text" value="'+obj[0].phone+'"/></span>');
                    $('#me_info').append('<span><i>Kode</i><input id="p_pass" type="text" value="'+obj[0].pass+'"/></span>');
                    $('#me_info').append('<br /><span class="p_explained">Foretag en ændring og tryk på "enter"<br />Din kode bliver automatisk enkrypteret</span>');
                    $('#me_info').append('<form id="img_form" enctype="multipart/form-data" action="http://noko.dk/ds/image_uploader.php" method="post"><input id="p_img" name="new_image" type="file"/><input type="text" value="'+obj[0].nr+'" name="user-nr"/></form>');

                    $('#'+p+' input').keypress(function (e) {
                      if (e.which == 13) {

                        var field = $(this).attr("id").split("_")[1];
                        var data = $(this).val();
                        if (field == "pass") { data = MD5(data); }
                        var uid = $('#me h2').attr("user-id");

                        $.post('http://davidsvane.com/noko/server/db.php', {page: "me_"+field, d: data, u: uid, nr: localStorage.getItem("user")}, function (data) {
                          if (data == "success") {
                            alert("Din info blev opdateret");
                          } else {
                            alert("Der skete en fejl på serveren");
                          }
                        });
                      }
                    });
                  break;

                  case 'news': // INFO: FORSIDE MED BRUGERGENERERET LISTE OVER KOMMEN EVENTS PÅ NOKO
                    $('#'+p).append('<a href="javascript:load(\'news_types\')">TILFØJ EVENT</a>');
                    $('#'+p).append('<div class="grid"></div>');
                    var curr_user = localStorage.getItem('user');

                    var appendix = '';

                    obj.forEach(function (e) {

                      appendix = '<div data-nid="'+e.id+'"';
                      if (adm || e.user == curr_user) { appendix += 'data-owner="true" '; }
                      appendix += 'class="item news_block p'+e.priority+'"';
                      if (e.img != "") {
                        appendix += ' style="background-image: url(\''+e.img+'\')"';
                      } else {
                        appendix += ' style="background-image: url(\'../res/news_type_'+e.type+'.jpg\')"';
                      }
                      appendix += '><div class="information"><div class="titles dotdotdot">'+e.title+'</div>';
                      appendix += '<div id="ddd_'+e.id+'" class="descriptions multidots" ';
                      if (e.link != null) { appendix += 'onclick="javascript:openNews(\''+e.link+'\')" '; }
                      appendix += '></div>';
                      appendix += '<div class="spacetime dotdotdot">'+dtFormat(e.time)+' '+e.place+'</div></div></div>';

                      $('#'+p+' .grid').append( appendix );
                    });

                    $('.news_block[data-owner="true"] .titles').append('<div class="settings"><i class="material-icons delete">delete</i><i class="material-icons edit">edit</i></div>');

                    $('.news_block .delete').click(function (e) {
                      var nid = $(e.target).closest('.news_block').attr("data-nid");
                      $(e.target).closest('.news_block').remove();
                      grid.refreshItems().layout(true);
                      $.post('http://davidsvane.com/noko/server/db.php', {page: "news_remove", id: nid, ver: 1}, function (data) { return; });
                    });

                    $('.news_block .edit').click(function (e) {
                      var nid = $(e.target).closest('.news_block').attr("data-nid");
                      load('news_edit', nid);
                    });

                    var grid = new Muuri('.grid', {layout: {fillGaps: true}});
                  break;

                  case 'news_edit': // INFO: SIDE TIL REDIGERING AF FORSIDE EVENTS
                    $('#'+p).append('<h1>REDIGER EVENT</h1>');
                    $('#'+p).append('<div id="ev_menu"><a href="javascript:updateEvent()">Opdater</a></div>');
                    $('#'+p).append('<div id="ne_fields" data-eid="'+obj[0].id+'"></div>')

                    $('#ne_fields').append('<div><p>Titel</p><input type="text" id="ne_title" value="'+obj[0].title+'"/></div>');
                    $('#ne_fields').append('<div><p>Tid</p><input type="text" id="fp_" value="'+obj[0].time+'"/></div>');
                    $('#ne_fields').append('<div><p>Sted</p><input type="text" id="ne_place" value="'+obj[0].place+'"/></div>');
                    $('#ne_fields').append('<div><p>Beskrivelse</p><input type="text" id="ne_description" placeholder="Valgfrit..." value="'+obj[0].description+'"/></div>');
                    $('#ne_fields').append('<div><p>Link</p><input type="text" id="ne_link" placeholder="Valgfrit..." value="'+obj[0].link+'"/></div>');
                    $('#ne_fields').append('<div><p>Billede</p><input type="text" id="ne_img" placeholder="Valgfrit link til billede..." value="'+obj[0].img+'"/></div>');
                    $('#ne_fields').append('<div><p>Prioritet</p><select id="ne_priority"><option value="1">(1) Sjov for hele NOKO!</option><option value="2">(2) En del af os skal da med!</option><option value="3">(3) Good to know!</option></select></div>');
                    $('#ne_priority option:nth-child('+obj[0].priority+')').attr("selected",true);
                    $('#ne_fields').append('<div><p>Type</p><select id="ne_type"></select></div>');

                    $('#fp_').flatpickr({
                      dateFormat: "Y-m-d H:i",
                      enableTime: true,
                      minDate: "today",
                      maxDate: new Date().fp_incr(365),
                      minuteIncrement: 15,
                      time_24hr: true
                    });

                    obj['t'].forEach(function (t) { $('#ne_type').append('<option value="'+t.id+'">'+t.type+'</option>') });
                    $('#ne_type option:nth-child('+obj[0].type+')').attr("selected",true);
                  break;

                  case 'news_types': // INFO: SIDE TIL OPRETTELSE AF NYE FORSIDE EVENTS
                    $('#'+p).append('<h1>NYT EVENT</h1>');
                    $('#'+p).append('<div id="ev_menu"><a href="javascript:addEvent()">Tilføj</a></div>');
                    $('#'+p).append('<div id="ne_fields"></div>')

                    $('#ne_fields').append('<div><p>Titel</p><input type="text" id="ne_title"/></div>');
                    $('#ne_fields').append('<div><p>Tid</p><input type="text" id="fp_"/></div>');
                    $('#ne_fields').append('<div><p>Sted</p><input type="text" id="ne_place"/></div>');
                    $('#ne_fields').append('<div><p>Beskrivelse</p><input type="text" id="ne_description" placeholder="Valgfrit..."/></div>');
                    $('#ne_fields').append('<div><p>Link</p><input type="text" id="ne_link" placeholder="Valgfrit..."/></div>');
                    $('#ne_fields').append('<div><p>Billede</p><input type="text" id="ne_img" placeholder="Valgfrit link til billede..."/></div>');
                    $('#ne_fields').append('<div><p>Prioritet</p><select id="ne_priority"><option value="1">(1) Sjov for hele NOKO!</option><option value="2">(2) En del af os skal da med!</option><option value="3" selected>(3) Good to know!</option></select></div>');
                    $('#ne_fields').append('<div><p>Type</p><select id="ne_type"></select></div>');

                    $('#fp_').flatpickr({
                      dateFormat: "Y-m-d H:i",
                      enableTime: true,
                      minDate: "today",
                      maxDate: new Date().fp_incr(365),
                      minuteIncrement: 15,
                      time_24hr: true
                    });

                    obj.forEach(function (t) { $('#ne_type').append('<option value="'+t.id+'">'+t.type+'</option>') });
                  break;

                  case 'photowall': // INFO: ALFABETISK BILLEDLISTE OVER NUVÆRENDE ALUMNER
                    $('#'+p).append('<div class="wall"></div>');
                    var url = "";

                    obj.forEach(function (e) {

                      url = "http://noko.dk/ds/alumner/"+e.nr+".jpg";
                      $('#'+p+' > .wall').append('<div onclick="javascript:showAlumne('+e.uid+')"><img src="'+url+'" onerror="javascript:$(this).parent().remove()"/><p>'+e.name+' ('+e.room+')</p></div>');

                    });
                  break;

                  case 'plan': // INFO: OVERSIGT OVER ALUMNERNES KØKKENVAGTER
                    $('#'+p).addClass("cnt_book");
                    var curr_year = '1994';
                    var curr_mth = '01';
                    var curr_week = 0;
                    var curr_day = 0;
                    var first_week = 0;
                    var last_week = 0;
                    var counter = 32;
                    var num_weeks = 0;
                    var shift_cols = {
                      d1_1: 'rgb(42,120,180)',
                      d2_1: 'rgb(42,180,240)',
                      d1_2: 'rgb(180,42,42)',
                      d2_2: 'rgb(240,42,42)'
                    };
                    var shift_names = {
                      d1_1: 'Opvask',
                      d2_1: 'Servering',
                      d1_2: 'Tidlig',
                      d2_2: 'Sen'
                    };

                    $('#'+p).append('<br /><br /><div id="explanation"><b><span style="color:'+shift_cols['d1_1']+'">'+shift_names['d1_1']+'evagt (17-20)</span><span style="color:'+shift_cols['d2_1']+'">'+shift_names['d2_1']+'evagt (17-20)</span><span style="color:'+shift_cols['d1_2']+'">'+shift_names['d1_2']+' weekendvagt (8:15-11:30)</span><span style="color:'+shift_cols['d2_2']+'">'+shift_names['d2_2']+' weekendvagt (10-13)</span>');
                    /*<br /><br /><br /><br /><br /><p>Der er to funktioner der skal udfyldes; servering/anretning og afrydning.<br />Det er muligt at bytte vagter; BYTTEDE VAGTER SKAL NOTERES PÅ SEDLEN I SPISESALEN VED DISKEN.<br />Har du valgt selv at passe din vagt, men er blevet forsinket på din vej hjem til kollegiet/køkkenet, da ring til køkkenet på tlf. nr. 35 27 46 56<br />Er du forsinket kan køkkenet tilkalde en afløser. Tilkaldes en afløser bliver det betragtet som en udeblivelse.<br />UDEBLIVELSE MEDFØRER EN BØDESTRAF PÅ KR 500,00</p></b></div>');*/

                    obj.forEach(function (e) {
                      if (curr_year != e.month.substr(0,4) || curr_mth != e.month.substr(5,2)) {
                        curr_year = e.month.substr(0,4);
                        curr_mth = e.month.substr(5,2);

                        first_week = weekFromISO(curr_year+'/'+curr_mth+'/01 00:00:00');
                        counter = dinm[parseInt(curr_mth)-1];
                        do {
                          last_week = weekFromISO(curr_year+'/'+curr_mth+'/'+counter+' 00:00:00');
                          counter--;
                        } while (date.getTime(curr_year+'/'+curr_mth+'/'+counter+' 00:00:00') == 'NaN');
                        num_weeks = ((last_week - first_week) % 52) + 1;

                        $('#'+p).append('<b>'+mths[parseInt(curr_mth)-1]+' '+curr_year+'</b><br />');
                        $('#'+p).append('<table id="t_'+curr_year+'_'+curr_mth+'"></table>');
                        $('#t_'+curr_year+'_'+curr_mth).append('<tr><td></td><td>Mandag</td><td>Tirsdag</td><td>Onsdag</td><td>Torsdag</td><td>Fredag</td><td>Lørdag</td><td>Søndag</td></tr>');
                        for (var i = num_weeks; i > 0; i--) {
                          curr_week = last_week - (i - 1);
                          $('#t_'+curr_year+'_'+curr_mth).append('<tr class="r_'+curr_week+'"></tr>');
                          $('#t_'+curr_year+'_'+curr_mth+' .r_'+curr_week).append('<td>Uge '+curr_week+'</td>');
                          for (var j = 1; j < 8; j++) {
                            $('#t_'+curr_year+'_'+curr_mth+' .r_'+curr_week).append('<td class="c_'+j+'"></td>');
                          }
                        }
                      }

                      curr_day = ('00'+e.day).substr(-2);
                      curr_week = weekFromISO(curr_year+'/'+curr_mth+'/'+curr_day+' 00:00:00');
                      curr_day = new Date(curr_year+'/'+curr_mth+'/'+curr_day+' 00:00:00');
                      curr_day = curr_day.getDay();
                      if (curr_day == 0) { curr_day += 7; }

                      $('#t_'+curr_year+'_'+curr_mth+' .r_'+curr_week+' .c_'+curr_day).append('<p style="color:'+shift_cols['d1_'+e.type]+'" title="'+shift_names['d1_'+e.type]+'">'+e.d1+'</p><p style="color:'+shift_cols['d2_'+e.type]+'" title="'+shift_names['d2_'+e.type]+'">'+e.d2+'</p>');
                    });
                  break;

                  case 'posts': // INFO: LISTE OVER TILLIDSHVERV
                    $('#'+p).append('<h1>TILLIDSHVERV</h1><div class="posts"></div>');

                  break;

                  case 'previous': // INFO: ALFABETISK LISTE OVER FORHENVÆRENDE ALUMNER
                    $('#'+p).append('<b>Forhenværende alumner (år fraflyttet)</b><div></div>');
                    obj.forEach(function (e) {
                      $('#'+p+' div').append('<p>'+e['name']+', '+e['room']+' ('+e['date'].substr(0,4)+')</p>');
                    });
                  break;

                  case 'rooms': // INFO: SYSTEM TIL BOOKING AF FÆLLESLOKALERNE
                    $('#'+p).addClass('cnt_book');
                    var curr_m = parseInt(date.getMonth()) + 1;
                    var curr_y = parseInt(date.getFullYear());
                    var curr_d = parseInt(date.getDate()) + 1;
                    var count_c = 0;
                    var count_r = 0;
                    var year_id = 0;

                    // INFO: GENERATE BTN, TABS AND TABLES
                    $('#'+p).html(generateTabsNTables(2,2,32,13));
                    $('#'+p).prepend('<h2>LOKALER</h2>');

                    // INFO: ADD TEXT TO BUTTONS
                    $('#'+p+' .tnt_btn').each(function (e) {
                      $(this).text(curr_y + parseInt( $(this).attr('tnt_btn') ) );
                      $(this).click(function (e) {
                        $('#'+p+' .tnt_btn').css('font-weight', 'normal');
                        $('#'+p+' .b_'+$(this).attr('tnt_btn')).css('font-weight', 'bold');
                        $('#'+p+' .tnt_tab').hide();
                        $('#'+p+' .d_'+$(this).attr('tnt_btn')).show();
                      });
                    });
                    if (reload) {
                      $('#'+p+' .b_'+localStorage.getItem('temp')).click();
                    } else {
                      $('#'+p+' .b_0').click();
                    }

                    // INFO: ADD TABLE TITLES
                    var room_opt = ['Biblioteket &amp; Billardstuen','Spisesalen']
                    $('#'+p+' .tnt_table').each(function (e) {
                      $(this).before('<p>' + room_opt[ parseInt($(this).attr('tnt_table')) ] + '</p>');
                    });

                    // INFO: FILL IN DATES AND MONTHS
                    $('#'+p+' .tnt_table tr:first-child td').each(function (e) {
                      if (parseInt( $(this).attr('tnt_col') ) > 0) {
                        $(this).text( parseInt( $(this).attr('tnt_col') ));
                      }
                    });
                    for (var i=0; i<12; i++) {
                      $('#'+p+' tr:nth-child('+(i+2)+') td:first-child').text(mths[i].substr(0,3));
                    }

                    // INFO: ADDING ROOM NUMBERS TO RESERVED TIMES
                    obj.forEach(function (e) {
                      year_id = e['year'] - curr_y;
                      if (e['user'] == user_room) {
                        $('#'+p+' .d_'+year_id+' .t_'+parseInt(e['room'])+' .r_'+parseInt(e['month'])+' .c_'+e['day']).html('<a id="b_'+e['id']+'" class="owner" onclick="javascript:removeRooms('+e['id']+')">'+e['user']+'</a>');
                      } else {
                        $('#'+p+' .d_'+year_id+' .t_'+parseInt(e['room'])+' .r_'+parseInt(e['month'])+' .c_'+e['day']).text(e['user']);
                      }
                    });

                    // INFO: MARKING NOKO EVENTS
                    $.post('http://davidsvane.com/noko/server/db.php', {page: 'rooms_taken'}, function (data) {
                      var marks = JSON.parse(data);
                      marks = marks[0];
                      marks.forEach(function (e) { $('#'+p+' .d_'+(curr_y-parseInt(e['date'].substr(0,4)))+' .r_'+parseInt(e['date'].substr(5,2))+' .c_'+parseInt(e['date'].substr(8,2))).html("N"); });
                    });

                    $('#'+p+' td:empty').each(function (e) {
                      count_c = parseInt($(this).attr('tnt_col'));
                      count_r = parseInt($(this).closest('tr').attr('tnt_row'));

                      if (count_c < dinm[count_r-1]+1) {
                        $(this).html('<a class="availables"></a>');
                      }
                    });
                    $('.availables').each(function (e) {
                      if ( $(this).closest("div").attr("tnt_tab") == 0 && (($(this).closest("tr").attr("tnt_row") < curr_m) || ($(this).closest("tr").attr("tnt_row") == curr_m && $(this).closest("td").attr("tnt_col") < curr_d)) ) {
                        $(this).remove();
                      } else {
                        $(this).click(function (e) {
                          bookRooms(
                            parseInt($(this).closest("div").attr("tnt_tab")),
                            parseInt($(this).closest("tr").attr("tnt_row")),
                            parseInt($(this).closest("td").attr("tnt_col")),
                            parseInt($(this).closest("table").attr("tnt_table")),
                          );
                        });
                      }
                    });
                  break;

                  case 'speaker': // INFO: SYSTEM TIL BOOKING AF SOUNDBOXEN
                    $('#'+p).addClass('cnt_book');
                    var curr_m = parseInt(date.getMonth()) + 1;
                    var curr_y = parseInt(date.getFullYear());
                    var curr_d = parseInt(date.getDate()) + 1;
                    var count_c = 0;
                    var count_r = 0;
                    var year_id = 0;

                    // INFO: GENERATE BTN, TABS AND TABLES
                    $('#'+p).html(generateTabsNTables(2,1,32,13));
                    $('#'+p).prepend('<h2>SOUNDBOX</h2>');

                    // INFO: ADD TEXT TO BUTTONS
                    $('#'+p+' .tnt_btn').each(function (e) {
                      $(this).text(curr_y + parseInt( $(this).attr('tnt_btn') ) );
                      $(this).click(function (e) {
                        $('#'+p+' .tnt_btn').css('font-weight', 'normal');
                        $('#'+p+' .b_'+$(this).attr('tnt_btn')).css('font-weight', 'bold');
                        $('#'+p+' .tnt_tab').hide();
                        $('#'+p+' .d_'+$(this).attr('tnt_btn')).show();
                      });
                    });
                    if (reload) {
                      $('#'+p+' .b_'+localStorage.getItem('temp')).click();
                    } else {
                      $('#'+p+' .b_0').click();
                    }

                    // INFO: FILL IN DATES AND MONTHS
                    $('#'+p+' .tnt_table tr:first-child td').each(function (e) {
                      if (parseInt( $(this).attr('tnt_col') ) > 0) {
                        $(this).text( parseInt( $(this).attr('tnt_col') ));
                      }
                    });
                    for (var i=0; i<12; i++) {
                      $('#'+p+' tr:nth-child('+(i+2)+') td:first-child').text(mths[i].substr(0,3));
                    }

                    // INFO: ADDING ROOM NUMBERS TO RESERVED TIMES
                    obj.forEach(function (e) {
                      year_id = e['year'] - curr_y;
                      if (e['user'] == user_room) {
                        $('#'+p+' .d_'+year_id+' .r_'+parseInt(e['month'])+' .c_'+e['day']).html('<a id="b_'+e['id']+'" class="owner" onclick="javascript:removeSpeaker('+e['id']+')">'+e['user']+'</a>');
                      } else {
                        $('#'+p+' .d_'+year_id+' .r_'+parseInt(e['month'])+' .c_'+e['day']).text(e['user']);
                      }
                    });

                    $('#'+p+' td:empty').each(function (e) {
                      count_c = parseInt($(this).attr('tnt_col'));
                      count_r = parseInt($(this).closest('tr').attr('tnt_row'));

                      if (count_c < dinm[count_r-1]+1) {
                        $(this).html('<a class="availables"></a>');
                      }
                    });
                    $('.availables').each(function (e) {
                      if ( $(this).closest("div").attr("tnt_tab") == 0 && (($(this).closest("tr").attr("tnt_row") < curr_m) || ($(this).closest("tr").attr("tnt_row") == curr_m && $(this).closest("td").attr("tnt_col") < curr_d)) ) {
                        $(this).remove();
                      } else {
                        $(this).click(function (e) {
                          bookSpeaker(
                            parseInt($(this).closest("div").attr("tnt_tab")),
                            parseInt($(this).closest("tr").attr("tnt_row")),
                            parseInt($(this).closest("td").attr("tnt_col")),
                            parseInt($(this).closest("table").attr("tnt_table")),
                          );
                        });
                      }
                    });
                  break;

                  case 'stem': // INFO: AFSTEMNINGSSYSTEM TIL PLENUM
                    var setup = ['For/Imod','En af Flere','Flere af Flere','Resultat'];

                    $('#'+p).append('<h1>AFSTEMNING</h1><p>Stemmerne afgives via <span>noko.dk/stem</span>.</p>');
                    $('#'+p).append('<select><option value="null" selected>Åbne afstemninger</option></select>');
                    $('#'+p+' > select').change(function () { pollReopen( $(this).val() ); });
                    obj.forEach(function (e) {
                      if (e.user == localStorage.getItem("user")) {
                        $('#'+p+' > select').append('<option value="'+e.id+'">'+e.id+': '+JSON.parse(e.question)[0]+'</option>');
                      }
                    });

                    if (true || adm) { $('#'+p).append('<a class="centered" href="javascript:pollCloseAll()">Luk alle afstemninger</a>'); }
                    $('#'+p).append('<div id="v_menu"></div><div id="v_cnt"></div>');

                    for (var i = 0; i < setup.length; i++) {
                      $('#v_menu').append('<a data-type="'+i+'">'+setup[i]+'</a>');
                      $('#v_cnt').append('<div class="v_'+i+'"></div>');
                    }
                    $('#v_menu a').click(function (e) {
                      $('#v_cnt > div').hide();
                      $('#v_cnt .v_'+ $(this).attr("data-type") ).show();
                      $('#v_menu > a').css("font-weight","normal");
                      $(this).css("font-weight","bold");
                    });
                    $('#v_menu > a:first-child').css("font-weight","bold");
                    $('#v_cnt > div:first-child').show();

                    var curr = 0;
                    $('#v_cnt .v_'+curr).append('<h2>'+setup[curr]+'</h2><input type="text" placeholder="Hvad skal der stemmes om?"/><h3 data-pid="null" class="v_code"></h3><a class="v_open" href="javascript:pollOpen('+curr+')">Åbn afstemning</a><a class="v_close" href="javascript:pollClose('+curr+')">Luk afstemning</a>');

                    curr++;
                    $('#v_cnt .v_'+curr).append('<h2>'+setup[curr]+'</h2><input type="text" placeholder="Hvad skal der stemmes om?"/><div class="v_options"><input type="text" class="v_o_1" placeholder="Valgmulighed 1"/><input type="text" class="v_o_2" placeholder="Valgmulighed 2"/></div><h3 data-pid="null" class="v_code"></h3><a class="v_add" href="javascript:pollAddOption('+curr+')">Tilføj valgmulighed</a><a class="v_remove" href="javascript:pollRemoveOption('+curr+')">Fjern valgmulighed</a><a class="v_open" href="javascript:pollOpen('+curr+')">Åbn afstemning</a><a class="v_close" href="javascript:pollClose('+curr+')">Luk afstemning</a>');

                    curr++;
                    $('#v_cnt .v_'+curr).append('<h2>'+setup[curr]+'</h2><input type="text" placeholder="Hvad skal der stemmes om?"/><div class="v_options"><input type="text" class="v_o_1" placeholder="Valgmulighed 1"/><input type="text" class="v_o_2" placeholder="Valgmulighed 2"/></div><h3 data-pid="null" class="v_code"></h3><select id="v_max"><option selected value="0">Maks valgte</option><option value="1">1</option><option value="2">2</option></select><a class="v_add" href="javascript:pollAddOption('+curr+')">Tilføj valgmulighed</a><a class="v_remove" href="javascript:pollRemoveOption('+curr+')">Fjern valgmulighed</a><a class="v_open" href="javascript:pollOpen('+curr+')">Åbn afstemning</a><a class="v_close" href="javascript:pollClose('+curr+')">Luk afstemning</a>');

                    curr++;
                    $('#v_cnt .v_'+curr).append('<h2>'+setup[curr]+'</h2><select><option value="null" selected>Vælg afstemning</option></select><div id="v_res"></div>');
                    $('#v_cnt .v_'+curr+' select').change(function () { pollResult( $(this).val() ); });

                    $.post('http://davidsvane.com/noko/server/db.php', {page: 'stem_all', nr: localStorage.getItem('user'), ver: 1}, function (data) {
                      var results = JSON.parse(data)[0];
                      results.forEach(function (e) {
                        $('#v_cnt .v_'+curr+' > select').append('<option value="'+e.id+'">'+e.id+': '+JSON.parse(e.question)[0]+'</option>');
                      });
                    });
                  break;

                  case 'summaries': // INFO: PLENUM REFERATER
                    $('#'+p).append('<div class="summaries"></div>');

                    var f = JSON.parse(data);
                    var l = f.length;
                    var variant = ["", "Forår", "Efterår"];

                    for (var i = 1; i < l-1; i++) {
                      $('#'+p+' .summaries').append('<a href="http://davidsvane.com/noko/plenum/'+f[l-i]+'" target="_blank">Referat<br />'+f[l-i].substr(7,4)+' '+variant[parseInt(f[l-i].substr(12,1))]+'</a>');
                    }
                  break;


                  // INFO: ADMINISTRATORSIDER

                  case 'a_alumner':
                    var stati = ["Indflyttet","Orlov","Orlov retur","Omflyttet","Fraflyttet","Andet","Orlov retur*"];
                    var sexi = ["Mand","Kvinde"];
                    $('#'+p).addClass("admin_page");

                    // INFO: ADD USER SELECTION REGION AT THE TOP
                    $('#'+p).append('<h1>ALUMNER</h1>');
                    $('#'+p).append('<div id="selector"></div><br /><br /><br />');
                    $('#selector').append('<select id="alumni_list"><option value="new" selected>NY ALUMNE</option></select>');
                    $('#alumni_list').change(function (e) { fetchAlumne(); });
                    obj.forEach(function (e) { $('#selector select').append('<option value="'+e.uid+'">'+e.name+' '+e.room+' ('+e.uid+')</option>'); });
                    $('#selector').append('<a onclick="javascript:updateAlumne()">Gem informationer</a>');

                    // INFO: ADD USER INFO REGION WITH THE 10 NEEDED FIELDS INCLUDING FILLING OPTIONS IN
                    $('#'+p).append('<div id="ainfo"></div>');
                    $('#ainfo').append('<h2>NY BEBOER</h2>');
                    $('#ainfo').attr('user-id','new');
                    $('#ainfo').attr('new-user-id',(parseInt(obj[0][0])+1));
                    $('#ainfo').append('<div class="ai_first"><p>Fornavn</p><input type="text"/></div>');
                    $('#ainfo').append('<div class="ai_last"><p>Efternavn</p><input type="text"/></div>');
                    $('#ainfo').append('<div class="ai_nr"><p>Løbenummer</p><input type="text"/></div>');
                    $('#ainfo').append('<div class="ai_room"><p>Værelse</p><input type="text"/></div>');
                    $('#ainfo').append('<div class="ai_mail"><p>Email</p><input type="text"/></div>');
                    $('#ainfo').append('<div class="ai_phone"><p>Telefon</p><input type="text"/></div>');
                    $('#ainfo').append('<div class="ai_status"><p>Status</p><select></select></div>');
                    for (var j = 0; j < stati.length; j++) { $('#'+p+' .ai_status select').append('<option value="'+j+'">'+stati[j]+'</option>'); }
                    $('#ainfo').append('<div class="ai_sex"><p>Køn</p><select></select></div>');
                    for (var j = 0; j < 2; j++) { $('#'+p+' .ai_sex select').append('<option value="'+j+'">'+sexi[j]+'</option>'); }
                    $('#ainfo').append('<div class="ai_study"><p>Studie</p><input type="text"/></div>');
                    $('#ainfo').append('<div class="ai_pass"><p>Adgangskode</p><input type="text"/></div>');

                    // INFO: AUTOMATIC MD5 ENCRYPTION ON PASSWORD FIELD
                    $('.ai_pass input').change(function (e) { $(this).val() == "" ? $(this).val("") : $(this).val(MD5( $(this).val() )); });
                  break;

                  case 'a_laundry':
                    var years = date.getFullYear() - 2018; // INFO: THE NEW INTRANET WAS DEPLOYED IN 2019 AND COUNTING THEREFORE STARTS HERE
                    var last_week = weekFromISO(date.toISOString()) - 2;
                    $('#'+p).addClass("admin_page");

                    $('#'+p).append('<h1>VASKEREGNSKAB</h1>')
                    $('#'+p).append('<div id="selector"></div>')
                    $('#selector').append('<select id="vr_year"></select>');
                    $('#selector').append('<select id="vr_week"></select>');
                    $('#selector').append('<a onclick="javascript:laundryAccounting()">Hent regnskab</a>');
                    $('#selector').append('<a id="downloadFix" download="" href=""></a>');

                    for (var i = 0; i < years; i++) { $('#vr_year').append('<option value="'+(2018+years-i)+'">'+(2018+years-i)+'</option>'); }
                    for (var j = 0; j < 52; j++) {
                      if (j == last_week) {
                        $('#vr_week').append('<option value="'+(j+1)+'" selected>Uge '+(j+1)+'</option>');
                      } else {
                        $('#vr_week').append('<option value="'+(j+1)+'">Uge '+(j+1)+'</option>');
                      }
                    }

                    $('#'+p).append('<br /><br /><div id="a_cnt"></div>');
                  break;

                  case 'a_lists':
                    $('#'+p).append('<h1>EXPORTER ALUMNELISTE</h1><a href="javascript:listsAllNone()" id="l_allnone">Alle / ingen</a><form id="l_form" action="javascript:generateList()"></form>')

                    var options = ['p.first AS first','p.last AS last','f.room AS room','f.nr AS nr','sl.title AS title','p.study AS study','u.mail AS mail','p.phone AS phone','p.sex AS sex','u.pass AS pass'];
                    var humantext = ['Fornavn','Efternavn','Værelse','Løbenummer','Status','Studie','Mail','Telefon','Køn','Kode'];
                    var date_start = new Date(2007, 0, 1, 1, 0, 0);
                    var date_end = new Date();

                    $('#l_form').append('<div class="options"></div>')
                    $('#l_form').append('<div class="date"></div>')
                    $('#l_form').append('<div class="extra"></div>');
                    $('#l_form').append('<input type="submit" value="Generer liste" class="centered"/>')

                    $('#'+p+' .date').append('<p>Hent fra og med dato</p><p>Hent til og med dato</p><p>Sorter data efter</p>')
                    $('#'+p+' .date').append('<input type="text" id="l_start"/><input type="text" id="l_end"/></select><select data-setting="sort" class="sort"><option value="uid">Vælg sorteringsparameter</option><option value="date">Dato</option></select>')
                    $('#l_start').flatpickr({
                      dateFormat: "Y-m-d",
                      enableTime: false,
                      minDate: date_start,
                      maxDate: date_end,
                      defaultDate: date_start,
                    });
                    $('#l_end').flatpickr({
                      dateFormat: "Y-m-d",
                      enableTime: false,
                      minDate: date_start,
                      maxDate: date_end,
                      defaultDate: date_end,
                    });

                    $('#'+p+' .extra').append('<a data-setting="restrict">Hent kun nyeste data for hver alumne</a>');

                    options.forEach(function (o, i) {
                      $('#'+p+' .options').append('<a data-select="'+o+'" data-sort="'+o.split(" ")[2]+'">'+humantext[i]+'</a>');
                      $('#'+p+' .date .sort').append('<option value="'+o.split(" ")[2]+'" disabled>'+humantext[i]+'</option>')
                    });

                    $('#l_form a').click(function (e) {
                      $(this).toggleClass("chosen");

                      var sel = $(e.target).attr("data-sort");
                      $('#l_form .date .sort option[value="'+sel+'"]').prop('disabled', function(i, v) { return !v; });
                    });

                    $('#'+p).append('<a id="downloadFix" download="" href=""></a>');
                  break;

                  case 'a_madplan':
                    var weeks_to_show = 5;
                    var this_week = weekFromISO(date.toISOString().substr(0,19).replace("T",' ').replace(/-/g,'/'));
                    var weeks = obj.length;
                    var w = 0;
                    $('#'+p).addClass("admin_page");

                    $('#'+p).append('<h1>MADPLAN</h1>')
                    $('#'+p).append('<div id="selector"></div><br /><br />')
                    $('#selector').append('<select id="vr_week"></select>');
                    //$('#selector').append('<a onclick="javascript:showFood()">Hent plan</a>');
                    $('#selector').append('<a onclick="javascript:updateFood()">Gem plan</a>');

                    for (var j = this_week; j < this_week + weeks_to_show; j++) {
                      w = ( (j-1) % 52 ) + 1;

                      if (j == this_week+1) { $('#vr_week').append('<option value="'+w+'" selected>Uge '+w+'</option>');
                      } else { $('#vr_week').append('<option value="'+w+'">Uge '+w+'</option>'); }

                      $('#'+p).append('<div class="fweek" id="fw_'+w+'"><h2>Uge '+w+'</h2><br /><div></div></div>');
                      for (var k = 0; k < 7; k++) { $('#fw_'+w+' div').append('<h3>'+dage[k]+'</h3><input class="fday'+k+'" type="text"/>'); }
                      $('#fw_'+w).attr("fw_filled", 0);
                    }

                    obj.forEach(function (e) {
                      for (var j = 0; j < 7; j++) { $('#fw_'+weekFromISO(e['week'].replace(/-/g,'/'))+' .fday'+j).val(e['d'+(j+1)]); }
                      $('#fw_'+weekFromISO(e['week'].replace(/-/g,'/'))).attr("fw_filled", 1);
                    });

                    $('#fw_'+(this_week+1)).show();
                    $('#vr_week').change(function () {
                      $('.fweek').hide();
                      $('#fw_'+$('#vr_week').val()).show();
                    });
                  break;

                  case 'a_madfavs':
                    console.log(obj);
                    $('#'+p).text(data);
                  break;

                  case 'a_pass':
                    $('#'+p).append('<h1>PASSWORDS</h1><h3>Aktive</h3><table class="a_1"><thead><tr><td>Anvendelse</td><td>Brugernavn</td><td>Password</td></tr></thead><tbody></tbody></table><h3>Inaktive</h3><table class="a_0"><thead><tr><td>Anvendelse</td><td>Brugernavn</td><td>Password</td></tr></thead><tbody></tbody></table>');

                    obj.forEach(function (e) {
                      $('#'+p+' .a_'+e.active+' tbody').append('<tr><td>'+e.name+'</td><td>'+e.username+'</td><td>'+e.password+'</td></tr>');
                    });
                  break;

                  case 'a_vagtplan':
                    var year = date.getFullYear();
                    var month = date.getMonth();
                    $('#'+p).addClass("admin_page");

                    $('#'+p).append('<h1>Vagtplan</h1>')
                    $('#'+p).append('<div id="selector"></div><br /><br />')
                    $('#selector').append('<select id="vr_year" onchange="javascript:getShifts()"><option value="'+year+'" selected>'+year+'</option><option value="'+(year+1)+'">'+(year+1)+'</option></select>');
                    $('#selector').append('<select id="vr_month" onchange="javascript:getShifts()"></select>');
                    $('#selector').append('<input type="text" maxlength="3" id="vp_saften" placeholder="Aften" onchange="javascript:updateShifts()"/>');
                    $('#selector').append('<input type="text" maxlength="3" id="vp_smorgen" placeholder="Morgen" onchange="javascript:updateShifts()"/>');
                    $('#selector').append('<a onclick="javascript:saveShifts()">Gem plan</a>');
                    //$('#selector').append('<a onclick="javascript:resetShifts()">Reset (!)</a>');

                    // INFO: FILL IN SELECTOR FOR MONTH
                    for (var j = 0; j < 12; j++) {
                      if (j == (month)%12) { $('#vr_month').append('<option value="'+(j+1)+'" selected>'+mths[j]+'</option>');
                      } else { $('#vr_month').append('<option value="'+(j+1)+'">'+mths[j]+'</option>'); }
                    }

                    // INFO: SETUP SELECTION AREA FOR ALUMNI WITHOUT SHIFTS
                    $('#'+p).append('<h2>Alumner</h2><i>Klik på et værelsesnummer for at markere alumner, som ikke har køkkenvagter (rød)</i><div class="alumner"></div><br />');
                    for (var j = 1; j < 140; j++) { $('#'+p+' .alumner').append('<a data-a-nr="'+j+'">'+j+'</a>'); }
                    $('#'+p+' .alumner a').each(function (e) { $(this).click( function (e) {
                      $(this).toggleClass("vp_free");
                      updateShifts();
                    }); });

                    // INFO: SETUP SELECTION AREA FOR DAYS WITH EXTRA OR NO SHIFTS
                    $('#'+p).append('<h2>Dage</h2><i>Klik på en dag for at markere ekstra morgenvagter (grøn)<br />Klik to gange for at markere dag uden køkkenvagter (orange)<br />Klik tre gange for at markere dage kun med morgenvagter (lilla)</i><div class="dage"></div><br /><br />');
                    for (var j = 0; j < dinm[month]; j++) { $('#'+p+' .dage').append('<a data-d-nr="'+(j+1)+'">'+(j+1)+'.</a>'); }
                    $('#'+p+' .dage a').each(function (e) { $(this).click(function (e) {
                      if ($(this).hasClass("vp_only")) {
                        $(this).removeClass("vp_only");
                      } else if ($(this).hasClass("vp_closed")) {
                        $(this).removeClass("vp_closed");
                        $(this).addClass("vp_only");
                      } else if ($(this).hasClass("vp_extra")) {
                        $(this).removeClass("vp_extra");
                        $(this).addClass("vp_closed");
                      } else {
                        $(this).addClass("vp_extra");
                      }
                      updateShifts();
                    }); });

                    // INFO: ADD TTTLE AND TABLE FOR GENERATED PLAN
                    $('#'+p).append('<h2 class="planprint">Vagtplan for '+mths[$('#vr_month').val()-1]+' '+$('#vr_year').val()+'</h2><br /><div class="planprint plan"></div><br />');
                    $('#'+p+' .plan').html(generateTabsNTables(1,1,5,32));
                    $('#'+p+' .tnt_btn').remove();

                    // INFO: ADD FIRST-ROW TITLES
                    var vp_titles = ["Dato","Servering","Opvask","Tidlig morgenvagt","Sen morgenvagt"];
                    $('#'+p+' .tnt_table tr:first-child td').each(function (e) { $(this).text(vp_titles[parseInt( $(this).attr('tnt_col') )]); });

                    getShifts();
                  break;

                  default: $('#'+p).text(data);
              }
            }

          });

        }

      });

    }
  }
}
