// INFO: EITHER TOGGLES SUBMENUS OR CALLS LOAD
// REQUIRES THE FILE 'noko_page_loader.js'

function menu(n) {

  switch(n) {

    case 'book':
    case 'people':
    case 'admin':

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
