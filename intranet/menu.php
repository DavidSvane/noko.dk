<?php

  $pages = array(
    'front' => 'Forside',
    'food' => 'Madplan',
    'plan' => 'Vagtplan',
    'cal' => 'Kalender',
    'book' => array('Booking',array(
      'laundry' => 'Vasketider',
      'bike' => 'Ladcykel',
      'rooms' => 'Lokaler'
    )),
    'people' => array('Alumner',array(
      'current' => 'Nuværende',
      'previous' => 'Tidligere'
    )),
    'me' => 'Profil',
    'admin' => array('Admin',array(
      'a_front' => 'Forside',
      'a_madplan' => 'Madplan',
      'a_vagtplan' => 'Vagtplan',
      'a_alumner' => 'Alumner'
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
