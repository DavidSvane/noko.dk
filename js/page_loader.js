// INFO: LOADS PAGE INTO MAIN TAG
// IS CALLED FROM 'noko_menu_click.js'

function verifyUser() {

  var user = $('#name_field').val();
  var pass = MD5($('#pass_field').val());

  $.post('http://davidsvane.com/noko/verify.php', {usr: user, pas: pass}, function (data) {

    if (data.length < 200) {
      alert('Forkert brugernavn eller password.');
    } else {
      var obj = JSON.parse(data);
      if (obj[0]['name'] == "admin") {
        setCookie('user','admin');
        setCookie('salt',obj['salt']);
        setCookie('room','admin');
      } else {
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

}

function load(p, reload = false) {

  if (p == 'login') {

    if (checkCookie('user') && checkCookie('salt')) {

      $.post('http://davidsvane.com/noko/verify.php', {usr: getCookie('user'), sal: getCookie('salt')}, function (data) {

        if (data.length < 42) {
          loginPage(p);
        } else {
          load('a_alumner');
        }

      });

    } else {

      loginPage(p);

      /*$('#'+p+' a').click(function (e) {
        var user = $('#name_field').val();
        var pass = MD5($('#pass_field').val());

        $.post('http://davidsvane.com/noko/verify.php', {usr: user, pas: pass}, function (data) {

          if (data.length < 200) {
            alert('Forkert brugernavn eller password.');
          } else {
            var obj = JSON.parse(data);
            setCookie('user',obj[0].nr);
            setCookie('salt',obj['salt']);
            load('front');
          }

        });
      });*/

    }

  } else if (p == 'logud') {

    deleteCookie('user');
    deleteCookie('salt');
    deleteCookie('room');
    $('#admin').hide();
    load('login');

  } else {

    if (checkCookie('user') && checkCookie('salt')) {

      $.post('http://davidsvane.com/noko/verify.php', {usr: getCookie('user'), sal: getCookie('salt')}, function (data) {

        if (data.length < 42) {

          loginPage(p);

        } else {

          var upgraded = ['rooms','speaker','a_vagtplan'];
          var version = upgraded.includes(p) ? 1 : 0;

          $.post('http://davidsvane.com/noko/db.php', {page: p, nr: getCookie('user'), ver: version}, function (data) {

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
                var user_room = getCookie('room');

                if (adm) { $('#admin').show(); }
                $('main').html('<div id="'+p+'"></div>');

                switch(p) {

                  case 'front':
                    obj.forEach(function (e) {
                      $('#'+p).append('<p>'+e[1]+'</p><br />');
                    });
                    $('#'+p).after('<br /><img src="../res/img7.jpg"/>');
                    break;

                  case 'food':
                    var denne_uge = true;
                    obj.forEach(function (e) {
                      if (denne_uge) {
                        $('#'+p).append('<b>Denne uge</b>'+'<br />');
                      } else {
                        $('#'+p).append('<b>Næste uge</b>'+'<br />');
                      }
                      for (var i=1; i<8; i++) {
                        $('#'+p).append('<i>'+dage[i-1]+':</i> '+e[i]+'<br />');
                      }
                      if (denne_uge) {
                        $('#'+p).append('<br />');
                        denne_uge = false;
                      }
                    });
                    break;

                  case 'current':
                    $('#'+p).append('<div class="_0 _2 _3 _6"><b>Beboere</b><div></div></div>');
                    $('#'+p).append('<div class="_1"><b>Orlov</b><div></div></div>');

                    obj.forEach(function (e) {
                      $('#'+p+' ._'+e['status']+' div').append('<p>'+e['name']+', '+e['room']+/*'<img src="http://noko.dk/ds/alumner/thumbnails/'+e['nr']+'.jpg" onerror="this.style.visibility=\'hidden\'"/>*/'</p>');
                    });

                    /*$('#current div:first-child div p').mousemove(function(e) {
                        $(this).find('img').show().offset({top: e.pageY-100, left: e.pageX+12});
                    }).mouseleave(function() {
                        $(this).find('img').hide();
                    });*/
                    break;

                  case 'previous':
                    $('#'+p).append('<b>Forhenværende alumner (år fraflyttet)</b><div></div>');
                    obj.forEach(function (e) {
                      $('#'+p+' div').append('<p>'+e['name']+', '+e['room']+' ('+e['date'].substr(0,4)+')</p>');
                    });
                    break;

                  case 'cal':
                    var stadig_f = true;
                    $('#'+p).append('<b style="font-size:1.3em;">'+date.getFullYear()+'</b><br />');
                    $('#'+p).append('<table><tr><td><b>Forår</b><br /></td></tr></table>');
                    obj.forEach(function (e) {
                      if (stadig_f && parseInt(e['date'].substr(5,2)) > 8) {
                        $('#'+p+' tr').append('<td><b>Efterår</b><br /></td>');
                        stadig_f = false;
                      }
                      $('#'+p+' td:last-child').append('<p><i>'+parseInt(e['date'].substr(8,2))+'/'+parseInt(e['date'].substr(5,2))+')</i> ' +e['name']+' '+e['who']+'</p>');
                    });
                    break;

                  case 'plan':
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

                    obj.forEach(function (e) {
                      if (curr_year != e.month.substr(0,4) || curr_mth != e.month.substr(5,2)) {
                        curr_year = e.month.substr(0,4);
                        curr_mth = e.month.substr(5,2);

                        first_week = weekFromISO(curr_year+'-'+curr_mth+'-01 00:00:00');
                        do {
                          counter--;
                          last_week = weekFromISO(curr_year+'-'+curr_mth+'-'+counter+' 00:00:00');
                        } while (date.getTime(curr_year+'-'+curr_mth+'-'+counter+' 00:00:00') == 'NaN');
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
                      curr_week = weekFromISO(curr_year+'-'+curr_mth+'-'+curr_day+' 00:00:00');
                      curr_day = new Date(curr_year+'-'+curr_mth+'-'+curr_day+' 00:00:00');
                      curr_day = curr_day.getDay();
                      if (curr_day == 0) { curr_day += 7; }

                      $('#t_'+curr_year+'_'+curr_mth+' .r_'+curr_week+' .c_'+curr_day).append('<p style="color:'+shift_cols['d1_'+e.type]+'" title="'+shift_names['d1_'+e.type]+'">'+e.d1+'</p><p style="color:'+shift_cols['d2_'+e.type]+'" title="'+shift_names['d2_'+e.type]+'">'+e.d2+'</p>');
                    });

                    $('#'+p).append('<br /><br /><div id="explanation"><b><span style="color:'+shift_cols['d1_1']+'">'+shift_names['d1_1']+'evagt (17-20)</span><span style="color:'+shift_cols['d2_1']+'">'+shift_names['d2_1']+'evagt (17-20)</span><span style="color:'+shift_cols['d1_2']+'">'+shift_names['d1_2']+' weekendvagt (8:15-11:30)</span><span style="color:'+shift_cols['d2_2']+'">'+shift_names['d2_2']+' weekendvagt (10-13)</span><br /><br /><br /><br /><br /><p>Der er to funktioner der skal udfyldes; servering/anretning og afrydning.<br /><br />Det er muligt at bytte vagter; BYTTEDE VAGTER SKAL NOTERES PÅ SEDLEN I SPISESALEN VED DISKEN.<br /><br />Har du valgt selv at passe din vagt, men er blevet forsinket på din vej hjem til kollegiet/køkkenet, da ring til køkkenet på tlf. nr. 35 27 46 56<br /><br />Er du forsinket kan køkkenet tilkalde en afløser. Tilkaldes en afløser bliver det betragtet som en udeblivelse.<br /><br />UDEBLIVELSE MEDFØRER EN BØDESTRAF PÅ KR 500,00</p></b></div>');

                    break;

                  case 'laundry':
                    $('#'+p).addClass('cnt_book');
                    var curr_week = date.toISOString().substr(0,19).replace("T"," ");
                    curr_week = weekFromISO(curr_week);
                    var curr_day = date.getDay();
                    var curr_time = Math.floor(((date.getHours()*60)+date.getMinutes()-360)/45+1);
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
                      $('#'+p+' .b_'+getCookie('temp')).click();
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
                      week_id = weekFromISO(e['week']) - curr_week;
                      if (e['room'] == user_room) {
                        $('#'+p+' .d_'+week_id+' .t_'+(parseInt(e['nr'])-1)+' .r_'+(parseInt(e['time'])+1)+' .c_'+e['day']).html('<a id="b_'+e['id']+'" class="owner" onclick="javascript:removeLaundry('+e['id']+')">'+e['room']+'</a>');
                      } else {
                        $('#'+p+' .d_'+week_id+' .t_'+(parseInt(e['nr'])-1)+' .r_'+(parseInt(e['time'])+1)+' .c_'+e['day']).text(e['room']);
                      }
                    });

                    // INFO: ADDING BOOKING BUTTONS
                    $('#'+p+' td:empty').html('<a class="availables"></a>');
                    $('.availables').each(function (e) {
                      if ( $(this).closest("div").attr("tnt_tab") == 0 && (($(this).closest("td").attr("tnt_col") > 0 && $(this).closest("td").attr("tnt_col") < curr_day) || ($(this).closest("td").attr("tnt_col") == curr_day && $(this).closest("tr").attr("tnt_row") > 0 && $(this).closest("tr").attr("tnt_row") < curr_time)) ) {
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

                  case 'bike':
                    $('#'+p).addClass('cnt_book');
                    var curr_week = date.toISOString().substr(0,19).replace("T"," ");
                    curr_week = weekFromISO(curr_week);
                    var curr_day = date.getDay();
                    var curr_time = Math.floor(((date.getHours()*60)+date.getMinutes())/120+1);
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
                      $('#'+p+' .b_'+getCookie('temp')).click();
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
                      week_id = weekFromISO(e['week']) - curr_week;
                      if (e['room'] == user_room) {
                        $('#'+p+' .d_'+week_id+' .r_'+(parseInt(e['time'])+1)+' .c_'+e['day']).html('<a id="b_'+e['id']+'" class="owner" onclick="javascript:removeBike('+e['id']+')">'+e['room']+'</a>');
                      } else {
                        $('#'+p+' .d_'+week_id+' .r_'+(parseInt(e['time'])+1)+' .c_'+e['day']).text(e['room']);
                      }
                    });

                    // INFO: ADDING BOOKING BUTTONS
                    $('#'+p+' td:empty').html('<a class="availables"></a>');
                    $('.availables').each(function (e) {
                      if ( $(this).closest("div").attr("tnt_tab") == 0 && (($(this).closest("td").attr("tnt_col") > 0 && $(this).closest("td").attr("tnt_col") < curr_day) || ($(this).closest("td").attr("tnt_col") == curr_day && $(this).closest("tr").attr("tnt_row") > 0 && $(this).closest("tr").attr("tnt_row") < curr_time)) ) {
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

                  case 'rooms':
                    $('#'+p).addClass('cnt_book');
                    var curr_m = parseInt(date.getMonth()) + 1;
                    var curr_y = parseInt(date.getFullYear());
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
                      $('#'+p+' .b_'+getCookie('temp')).click();
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
                    $.post('http://davidsvane.com/noko/db.php', {page: 'rooms_taken'}, function (data) {
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
                    $('.availables').each(function (e) { $(this).click(function (e) {
                      bookRooms(
                        parseInt($(this).closest("div").attr("tnt_tab")),
                        parseInt($(this).closest("tr").attr("tnt_row")),
                        parseInt($(this).closest("td").attr("tnt_col")),
                        parseInt($(this).closest("table").attr("tnt_table")),
                      );
                    }); });
                    break;

                  case 'speaker':
                    $('#'+p).addClass('cnt_book');
                    var curr_m = parseInt(date.getMonth()) + 1;
                    var curr_y = parseInt(date.getFullYear());
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
                      $('#'+p+' .b_'+getCookie('temp')).click();
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
                    $('.availables').each(function (e) { $(this).click(function (e) {
                      bookSpeaker(
                        parseInt($(this).closest("div").attr("tnt_tab")),
                        parseInt($(this).closest("tr").attr("tnt_row")),
                        parseInt($(this).closest("td").attr("tnt_col")),
                        parseInt($(this).closest("table").attr("tnt_table")),
                      );
                    }); });
                    break;

                  case 'gym':
                    $('#'+p).addClass('cnt_book');
                    var curr_week = date.toISOString().substr(0,19).replace("T"," ");
                    curr_week = weekFromISO(curr_week);
                    var curr_day = date.getDay();
                    var curr_time = Math.floor(((date.getHours()*60)+date.getMinutes()-420)/90+1);
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
                      $('#'+p+' .b_'+getCookie('temp')).click();
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
                      week_id = weekFromISO(e['week']) - curr_week;
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

                    // INFO: ADDING BOOKING BUTTONS
                    $('#'+p+' td:empty').html('<a class="availables"></a>');
                    $('.availables').each(function (e) {
                      if ( $(this).closest("div").attr("tnt_tab") == 0 && (($(this).closest("td").attr("tnt_col") > 0 && $(this).closest("td").attr("tnt_col") < curr_day) || ($(this).closest("td").attr("tnt_col") == curr_day && $(this).closest("tr").attr("tnt_row") > 0 && $(this).closest("tr").attr("tnt_row") < curr_time)) ) {
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

                  case 'me':
                    $('#'+p).append('<div><img src="http://noko.dk/ds/alumner/'+obj[0].nr+'.jpg"/></div><div></div>');
                    $('#'+p+' div:last-child').append('<p>'
                      +'<b>Navn</b>: '+obj[0].first+' '+obj[0].last+'<br /><br />'
                      +'<b>Mail</b>: '+obj[0].mail+'<br /><br />'
                      +'<b>Værelse</b>: '+obj[0].room+'<br /><br />'
                      +'<b>Løbenummer</b>: '+obj[0].nr+'</p>');
                    break;

                  case 'plenum':
                    $('#'+p).append('<h1 style="width:100%;text-align:center;">PLENUM</h1>');
                    break;

                  case 'a_madplan':
                    var years = date.getFullYear() - 2018; // INFO: THE NEW INTRANET WAS DEPLOYED IN 2019 AND COUNTING THEREFORE STARTS HERE
                    var this_week = weekFromISO(date.toISOString());
                    var weeks = obj.length;
                    $('#'+p).addClass("admin_page");

                    $('#'+p).append('<h1>MADPLAN</h1>')
                    $('#'+p).append('<div id="selector"></div><br /><br />')
                    $('#selector').append('<select id="vr_week"></select>');
                    //$('#selector').append('<a onclick="javascript:showFood()">Hent plan</a>');
                    $('#selector').append('<a onclick="javascript:updateFood()">Gem plan</a>');

                    for (var j = this_week; j < this_week+5; j++) {
                      if (j == this_week+1) { $('#vr_week').append('<option value="'+(j)+'" selected>Uge '+(j)+'</option>');
                      } else { $('#vr_week').append('<option value="'+(j)+'">Uge '+(j)+'</option>'); }

                      $('#'+p).append('<div class="fweek" id="fw_'+j+'"><h2>Uge '+j+'</h2><br /><div></div></div>');
                      for (var k = 0; k < 7; k++) { $('#fw_'+j+' div').append('<h3>'+dage[k]+'</h3><input class="fday'+k+'" type="text"/>'); }
                      $('#fw_'+j).attr("fw_filled", 0);
                    }

                    obj.forEach(function (e) {
                      for (var j = 0; j < 7; j++) { $('#fw_'+weekFromISO(e['week'])+' .fday'+j).val(e['d'+(j+1)]); }
                      $('#fw_'+weekFromISO(e['week'])).attr("fw_filled", 1);
                    });

                    $('#fw_'+(this_week+1)).show();
                    $('#vr_week').change(function () {
                      $('.fweek').hide();
                      $('#fw_'+$('#vr_week').val()).show();
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

                  case 'a_alumner':
                    $('#'+p).addClass("admin_page");
                    $('#'+p).text(data);
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

                  default:
                    $('#'+p).text(data);
              }
            }

          });

        }

      });

    }
  }
}
