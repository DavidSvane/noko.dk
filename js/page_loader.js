// INFO: LOADS PAGE INTO MAIN TAG
// IS CALLED FROM 'noko_menu_click.js'

function verifyUser(user, pass) {

  $.post('http://davidsvane.com/noko/verify.php', {usr: user, pas: pass}, function (data) {

    if (data.length < 200) {
      alert('Forkert brugernavn eller password.');
    } else {
      var obj = JSON.parse(data);
      setCookie('user',obj[0].nr);
      setCookie('salt',obj['salt']);
    }

  });

}

function loginPage(p) {

  $('main').html('<div id="'+p+'"></div>');
  $('#'+p).html('<input type="text" name="name" id="name_field" placeholder="Navn, fornavn, mail eller løbenr" autofocus/><input type="password" name="pass" id="pass_field" placeholder="Password"/><a>Log ind</a>');

  $('#'+p+' a').click(function (e) {
    var user = $('#name_field').val();
    var pass = MD5($('#pass_field').val());

    verifyUser(user, pass);
  });

}

function load(p) {

  if (p == 'login') {

    if (checkCookie('user') && checkCookie('salt')) {

      $.post('http://davidsvane.com/noko/verify.php', {usr: getCookie('user'), sal: getCookie('salt')}, function (data) {

        if (data.length < 42) {
          loginPage(p);
        } else {
          load('front');
        }

      });

    } else {

      $('main').html('<div id="'+p+'"></div>');
      $('#'+p).html('<input type="text" name="name" id="name_field" placeholder="Navn, fornavn, mail eller løbenr" autofocus/><input type="password" name="pass" id="pass_field" placeholder="Password"/><a>Log ind</a>');

      $('#'+p+' a').click(function (e) {
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
      });

    }

  } else if (p == 'logud') {

    deleteCookie('user');
    deleteCookie('salt');
    load('login');

  } else {

    if (checkCookie('user') && checkCookie('salt')) {

      $.post('http://davidsvane.com/noko/verify.php', {usr: getCookie('user'), sal: getCookie('salt')}, function (data) {

        if (data.length < 42) {
          loginPage(p);

        } else {

          $.post('http://davidsvane.com/noko/db.php', {page: p, nr: getCookie('user')}, function (data) {

            try {
              var obj = JSON.parse(data);
              var keys = Object.keys(obj[0]).length/2;
            } catch (err) {}

            finally {
                var dage = ['Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag','Søndag'];
                var mths = ['Januar','Februar','Marts','April','Maj','Juni','Juli','August','September','Oktober','November','December'];
                var dinm = [31,28,31,30,31,30,31,31,30,31,30,31];
                var date = new Date();

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
                        $('#'+p).append('<i>'+dage[i-1]+')</i> '+e[i]+'<br />');
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
                      $('#'+p+' ._'+e['status']+' div').append('<p>'+e['name']+', '+e['room']+'</p>');
                    });
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
                    break;

                  case 'laundry':
                    date = date.toISOString().substr(0,19).replace("T"," ");
                    var curr_week = weekFromISO(date);
                    var week_id = 0;
                    var counter = 0;
                    var timer = 360;

                    // INFO: GENERATES BTNS, TABS AND TABLES
                    $('#'+p).html(generateTabsNTables(3,3,8,19));

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
                    $('#'+p+' .b_0').click();

                    // INFO: ADD TABLE TITLES
                    $('#'+p+' .tnt_table').each(function (e) {
                      $(this).before('<p>Maskine ' + ( parseInt($(this).attr('tnt_table')) + 1) + '</p>');
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
                      $('#'+p+' .d_'+week_id+' .t_'+(parseInt(e['nr'])-1)+' .r_'+(parseInt(e['time'])+1)+' .c_'+e['day']).text(e['room']);
                    });

                    // INFO: ADDING BOOKING BUTTONS
                    $('#'+p+' td:empty').html('<a class="availables"></a>');
                    break;

                  case 'bike':
                    date = date.toISOString().substr(0,19).replace("T"," ");
                    var curr_week = weekFromISO(date);
                    var week_id = 0;
                    var counter = 0;
                    var timer = 0;

                    // INFO: GENERATES BTNS, TABS AND TABLES
                    $('#'+p).html(generateTabsNTables(10,1,8,13));

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
                    $('#'+p+' .b_0').click();

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
                      $('#'+p+' .d_'+week_id+' .r_'+(parseInt(e['time'])+1)+' .c_'+e['day']).text(e['room']);
                    });

                    // INFO: ADDING BOOKING BUTTONS
                    $('#'+p+' td:empty').html('<a class="availables"></a>');
                    break;

                  case 'rooms':
                    var curr_m = parseInt(date.getMonth()) + 1;
                    var curr_y = parseInt(date.getFullYear());
                    var count_c = 0;
                    var count_r = 0;

                    // INFO: GENERATE BTN, TABS AND TABLES
                    $('#'+p).html(generateTabsNTables(3,3,32,13));

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
                    $('#'+p+' .b_0').click();

                    // INFO: ADD TABLE TITLES
                    var room_opt = ['Billardstuen','Biblioteket','Pejsestuen']
                    $('#'+p+' .tnt_table').each(function (e) {
                      $(this).before('<p>' + room_opt[ parseInt($(this).attr('tnt_table')) ] + '</p>');
                    });

                    // INFO: FILL IN DATES AND MONTHS
                    $('#'+p+' .tnt_table tr:first-child td').each(function (e) {
                      if (parseInt( $(this).attr('tnt_col') ) == 0) {
                        $(this).text('Mdr.');
                      } else {
                        $(this).text( parseInt( $(this).attr('tnt_col') ));
                      }
                    });
                    for (var i=0; i<12; i++) {
                      $('#'+p+' tr:nth-child('+(i+2)+') td:first-child').text(mths[i].substr(0,3));
                    }

                    $('#'+p+' td:empty').each(function (e) {
                      count_c = parseInt($(this).attr('tnt_col'));
                      count_r = parseInt($(this).closest('tr').attr('tnt_row'));

                      if (count_c < dinm[count_r-1]+1) {
                        $(this).html('<a class="availables"></a>');
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

                  case 'a_front':
                    $('#'+p).addClass("admin_page");
                    $('#'+p).append('');
                    break;

                  case 'a_madplan':
                    $('#'+p).addClass("admin_page");
                    $('#'+p).append('<p>Tilføj ny menu...</p>');
                    $('#'+p).append('<select></select>');

                    date = date.toISOString().substr(0,19).replace("T"," ");
                    var curr_week = weekFromISO(date);

                    for (var i=1; i<8; i++) {
                      $('#'+p+' select').append('<option value="'+(curr_week+i)%52+'">Uge '+(curr_week+i)%52+'</option>');
                      $('#'+p).append('<input type="text" name="d'+i+'" placeholder="'+dage[i-1]+'"/>');
                    }
                    break;

                  case 'a_vagtplan':
                    $('#'+p).addClass("admin_page");
                    $('#'+p).append('');
                    break;

                  case 'a_alumner':
                    $('#'+p).addClass("admin_page");
                    $('#'+p).append('');
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
