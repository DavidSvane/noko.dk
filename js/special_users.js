// INFO: TOGGLING USER FAVORITE DISHES
function toggleFoodFavorite(add, week, day) {

  var p = add ? "food_fav_add" : "food_fav_remove";

  $.post('http://davidsvane.com/noko/server/db.php', {page: p, w: week, d: day, nr: localStorage.getItem('user'), ver: 1}, function (data) {

    console.log(data);
    $('#fweek_'+week+' tr:nth-child('+day+')').toggleClass("selected");

  });

}
