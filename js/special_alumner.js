function showAlumne(uid) {

  $('#alumne').remove();
  $('main').append('<div id="alumne" onclick="javascript:hideAlumne()"><div></div></div>');

  $.post('http://noko.dk/server/db.php', {page: "alumne_fetch", u: uid, nr: localStorage.getItem("user"), ver: 1}, function (data) {

    console.log(data);
    var mths = ['Januar','Februar','Marts','April','Maj','Juni','Juli','August','September','Oktober','November','December'];
    var gangs = ["Stuen Nord", "1. Nord", "2. Nord", "3. Nord", "4. Nord", "5. Nord", "Stuen Syd", "1. Syd", "2. Syd", "3. Syd", "4. Syd", "5. Syd"];
    var stati = ["Indflyttet","Orlov","Orlov retur","Omflyttet","Fraflyttet","Andet","Orlov retur*"];
    var gang = {1:0, 3:0, 5:0, 7:0, 9:0, 11:0, 13:0, 15:0, 17:0, 19:0, 21:0, 23:0, 25:1, 27:1, 29:1, 31:1, 33:1, 35:1, 37:1, 39:1, 41:1, 43:2, 45:2, 47:2, 49:2, 51:2, 53:2, 55:2, 57:2, 59:2, 61:2, 63:2, 65:2, 67:3, 69:3, 71:3, 73:3, 75:3, 77:3, 79:3, 81:3, 83:3, 85:3, 87:3, 89:3, 91:3, 93:3, 95:3, 97:4, 99:4, 101:4, 103:4, 105:4, 107:4, 109:4, 111:4, 113:4, 115:4, 117:4, 119:4, 121:4, 123:4, 125:4, 127:5, 129:5, 131:5, 133:5, 135:5, 137:5, 139:5, 2:6, 4:6, 6:6, 8:6, 10:6, 12:6, 14:6, 16:6, 20:7, 22:7, 24:7, 26:7, 28:7, 30:7, 32:7, 34:7, 36:7, 38:7, 40:7, 42:7, 44:8, 46:8, 48:8, 50:8, 52:8, 54:8, 56:8, 58:8, 60:8, 62:8, 64:8, 66:8, 68:9, 70:9, 72:9, 74:9, 76:9, 78:9, 80:9, 82:9, 84:9, 86:9, 88:9, 90:9, 92:10, 94:10, 96:10, 98:10, 100:10, 102:10, 104:10, 106:10, 108:10, 110:10, 112:10, 114:10, 116:11, 118:11, 120:11, 122:11};
    var obj = JSON.parse(data);
    obj = obj[0];
    var keys = Object.keys(obj);
    console.log(obj);

    $('#alumne > div').append('<div class="img"><img src="http://noko.dk/ds/alumner/'+obj[0].nr+'.jpg" onerror="this.src=\'../res/missing_photo.png\'"/></div>');
    $('#alumne > div').append('<div class="txt"></div>');

    $('#alumne .txt').append('<h2>'+obj[0].name+'</h2>');
    $('#alumne .txt').append('<p><b>Kontakt</b><i>Mail</i>: <a href="mailto:'+obj[0].mail+'">'+obj[0].mail+'</a>'+
                            '<br /><i>Telefon</i>: <a href="tel:'+obj[0].phone+'">'+obj[0].phone+'</a></p>');
    $('#alumne .txt').append('<p><b>Info</b><i>Studieretning</i>: '+obj[0].study.replace(".",". ")+'<br /><i>Løbenummer</i>: '+obj[0].nr+'<br /><i>Gang</i>: '+gangs[gang[obj[keys.length-1].room]]+'</p>');
    $('#alumne .txt').append('<b>Historik</b>');

    obj.forEach(function (e) {
      $('#alumne .txt').append('<div class="his"><span>'+mths[parseInt(e.date.substr(5,2))-1]+' '+e.date.substr(0,4)+'</span><span> '+stati[e.status]+' ('+e.room+')</span></div>');
    });

    $('#alumne .txt').append('<br /><br />');

    $('#alumne').show();

  });

}


function hideAlumne() {

  $('#alumne').remove();

}


function changeImage() {

  alert("Billedet skal være under 2 MB.\nFiltypen skal være JPG.");

  var unr = $('#me h2').attr("user-nr");

  $('#p_img').click();
  $('#p_img').change(function () {

    if ($('#p_img').val().length > 3) {

      $.ajax({
        url: "http://noko.dk/server/image_uploader.php?nr="+unr,
        type: "POST",
        data: new FormData(document.getElementById("img_form")),
        contentType: false,
        cache: false,
        processData: false,
        success: function (response) {
          load('me');
        },
        error: function () {
          alert("Dit billede blev ikke uploaded");
        }
      });

      //$('#img_form').submit();

    }

  });

}
