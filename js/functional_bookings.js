// INFO: LAUNDRY BOOKING
function reloadLaundry() {

  var active = $('#laundry > a').filter(function() { return $(this).attr("style") == 'font-weight: bold;'; }).attr('tnt_btn');
  load('laundry', true);
  setCookie('temp', active);

}
function bookLaundry(week, day, nr, time) {

  book_id = week+'_'+day+'_'+nr+'_'+time;
  $.post('http://davidsvane.com/noko/db.php', {page: "laundry_book", nr: getCookie('user'), room: getCookie('room'), bid: book_id}, function (data) { reloadLaundry(); });

}
function removeLaundry(book_id) {

  $.post('http://davidsvane.com/noko/db.php', {page: "laundry_remove", nr: getCookie('user'), room: getCookie('room'), bid: book_id}, function (data) { reloadLaundry(); });

}


// INFO: BICYCLE BOOKING
function reloadBike() {

  var active = $('#bike > a').filter(function() { return $(this).attr("style") == 'font-weight: bold;'; }).attr('tnt_btn');
  load('bike', true);
  setCookie('temp', active);

}
function bookBike(week, day, nr, time) {

  book_id = week+'_'+day+'_'+nr+'_'+time;
  $.post('http://davidsvane.com/noko/db.php', {page: "bike_book", nr: getCookie('user'), room: getCookie('room'), bid: book_id}, function (data) { reloadBike(); });

}
function removeBike(book_id) {

  $.post('http://davidsvane.com/noko/db.php', {page: "bike_remove", nr: getCookie('user'), room: getCookie('room'), bid: book_id}, function (data) { reloadBike(); });

}


// INFO: ROOMS BOOKING
function reloadRooms() {

  var active = $('#rooms > a').filter(function() { return $(this).attr("style") == 'font-weight: bold;'; }).attr('tnt_btn');
  load('rooms', true);
  setCookie('temp', active);

}
function bookRooms(year, month, day, room) {

  book_id = year+'_'+month+'_'+day+'_'+room;
  $.post('http://davidsvane.com/noko/db.php', {page: "rooms_book", nr: getCookie('user'), room: getCookie('room'), bid: book_id, ver: 1}, function (data) { reloadRooms(); });

}
function removeRooms(book_id) {

  $.post('http://davidsvane.com/noko/db.php', {page: "rooms_remove", nr: getCookie('user'), room: getCookie('room'), bid: book_id, ver: 1}, function (data) { reloadRooms(); });

}


// INFO: SOUNDBOX BOOKING
function reloadSpeaker() {

  var active = $('#speaker > a').filter(function() { return $(this).attr("style") == 'font-weight: bold;'; }).attr('tnt_btn');
  load('speaker', true);
  setCookie('temp', active);

}
function bookSpeaker(year, month, day) {

  book_id = year+'_'+month+'_'+day;
  $.post('http://davidsvane.com/noko/db.php', {page: "speaker_book", nr: getCookie('user'), room: getCookie('room'), bid: book_id, ver: 1}, function (data) { reloadSpeaker(); });

}
function removeSpeaker(book_id) {

  $.post('http://davidsvane.com/noko/db.php', {page: "speaker_remove", nr: getCookie('user'), room: getCookie('room'), bid: book_id, ver: 1}, function (data) { reloadSpeaker(); });

}


// INFO: GYM BOOKING
function reloadGym() {

  var active = $('#gym > a').filter(function() { return $(this).attr("style") == 'font-weight: bold;'; }).attr('tnt_btn');
  load('gym', true);
  setCookie('temp', active);

}
function bookGym(week, day, nr, time) {

  book_id = week+'_'+day+'_'+nr+'_'+time;
  $.post('http://davidsvane.com/noko/db.php', {page: "gym_book", nr: getCookie('user'), room: getCookie('room'), bid: book_id}, function (data) { reloadGym(); });

}
function removeGym(book_id) {

  $.post('http://davidsvane.com/noko/db.php', {page: "gym_remove", nr: getCookie('user'), room: getCookie('room'), bid: book_id}, function (data) { reloadGym(); });

}