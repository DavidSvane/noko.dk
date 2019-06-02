// INFO: EITHER TOGGLES SUBMENUS OR CALLS LOAD
// REQUIRES THE FILE 'noko_page_loader.js'

function menu(n, sub=false) {

  if (sub) {

    if ($('.sub_'+n).css('display') == 'none') {

      $('.sub').hide();
      $('.sub_'+n).css('display','inline-block');

    } else {

      $('.sub').hide();

    }

  } else {

    load(n);
    $('.sub').hide();

  }

}
