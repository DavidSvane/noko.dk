<?php

  $pages = array(
    'news' => 'Forside',
    'book' => array('Booking',array(
      'laundry' => 'Vasketider',
      'bike' => 'Ladcykel',
      'rooms' => 'Lokaler',
      'gym' => 'Gymnastiksal',
      'speaker' => 'SoundBox'
    )),
    'food' => 'Madplan',
    'plan' => 'Vagtplan',
    'people' => array('Alumner',array(
      'current' => 'Nuværende (alfabetisk)',
      'corridors' => 'Nuværende (gange)',
      'photowall' => 'Nuværende (billeder)',
      'previous' => 'Tidligere',
      'changes' => 'Ændringer'
    )),
    'information' => array('Info',array(
      'front' => 'Generel',
      'cal' => 'Kalender',
      'me' => 'Profil'
    )),
    /*'plenum' => 'Plenum',*/
    'admin' => array('Admin',array(
      'a_alumner' => 'Alumner',
      'a_madplan' => 'Madplan',
      'a_vagtplan' => 'Vagtplan',
      'a_laundry' => 'Vaskeregnskab'
      //'a_front' => 'Forside'
      //'master' => 'MASTER'
    )),
    'logud' => 'Log ud'
  );

  foreach ($pages as $key => $value) {

    if (is_array($value)) {

      echo('<a id="'.$key.'" href="javascript:menu(\''.$key.'\')">'.$value[0]);

      echo('<div class="sub sub_'.$key.'">');

      foreach ($value[1] as $subkey => $subvalue) {

        echo('<a href="javascript:menu(\''.$subkey.'\')">'.$subvalue.'</a>');

      }

      echo('</div></a>');

    } else {

      echo('<a href="javascript:menu(\''.$key.'\')">'.$value.'</a>');

    }

  }

?>
