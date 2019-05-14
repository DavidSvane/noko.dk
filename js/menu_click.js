// INFO: EITHER TOGGLES SUBMENUS OR CALLS LOAD
// REQUIRES THE FILE 'noko_page_loader.js'

function menu(n) {

  switch(n) {

    case 'admin':
    case 'book':
    case 'people':

      if ($('.sub_'+n).css('display') == 'none') {

        $('.sub').hide();
        $('.sub_'+n).css('display','inline-block');

      } else {

        $('.sub').hide();

      }

      break;

    default:
      load(n);
      $('.sub').hide();

  }

}
