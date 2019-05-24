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
      'current' => 'Alfabetisk',
      'corridors' => 'Gangoversigt',
      'photowall' => 'Stalkervæggen',
      'changes' => 'Nylige ændringer',
      'previous' => 'Forhenværende'
    )),
    'information' => array('Info',array(
      'front' => 'Generelt',
      'guides' => 'Guides',
      'cal' => 'Kalender',
      /*'plenum' => 'Plenum',*/
      'me' => 'Min Profil'
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
