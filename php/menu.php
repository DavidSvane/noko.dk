<?php

  // INFO: LOOPS THROUGH THE ARRAY AND GENERATES MENU ENTRIES
  // THE LAST ONE FOR CHANING THE LANGUAGE
  // MENU IS REMOVED DUE TO OLD PHP VERSION

  /*$links = array('frontpage','history','application','facilities','rooms','contact','food','intranet','changelang');*/
  $links = array('frontpage','history','application','facilities','rooms','contact','donations','intranet','changelang');

  foreach ($links as $link) {

    if ($link == 'intranet') {

      echo('<a href="/noko.dk/intranet/">' . ${$lang}[$link] . '</a>');

    } else if ($link == 'changelang') {

      echo('<a href="?l=' . ${$lang}['otherlang'] . '">' . ${$lang}[$link] . '</a>');

    } else {

      echo('<a href="?l=' . ${$lang}['thislang'] . '&p=' . $link . '">' . ${$lang}[$link] . '</a>');

    }

  }

?>
