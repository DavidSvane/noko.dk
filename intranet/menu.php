<?php

  $pages = array(
    'news' => 'Forside',
    'book' => array('Booking',array(
      'laundry' => 'Vasketider',
      'bike' => 'Ladcykel',
      'rooms' => 'Lokaler',
      'gym' => 'Gymnastiksal',
      'speaker' => 'SoundBox',
    )),
    'food' => 'Madplan',
    'plan' => 'Vagtplan',
    'people' => array('Alumner',array(
      'current' => 'Alfabetisk',
      'corridors' => 'Gangoversigt',
      'photowall' => 'Stalkervæggen',
      'changes' => 'Nylige ændringer',
      'history' => 'Året der gik',
      'previous' => 'Forhenværende',
    )),
    'information' => array('Info',array(
      'front' => 'Generelt',
      'guides' => 'Guides',
      'cal' => 'Kalender',
      'files' => 'Filer',
      'me' => 'Min Profil',
    )),
    'plenum' => array('Plenum',array(
      'stem' => 'Afstemning',
      'summaries' => 'Referater',
      'posts' => 'Tillidshverv',
      'groups' => 'Udvalg',
    )),
    'ansvar' => array('Ansvar',array(
      'r_cal' => 'Festkalender',
      'r_apart' => 'Lejlighedsbeboere',
      'r_posts' => 'Tillidshverv',
      'r_groups' => 'Udvalg',
    )),
    'admin' => array('Admin',array(
      'a_alumner' => 'Alumner',
      'a_lists' => 'Datalister',
      'a_madfavs' => 'Madhjerter *',
      'a_madplan' => 'Madplan',
      'a_pass' => 'Passwords',
      'a_vagtplan' => 'Vagtplan',
      'a_laundry' => 'Vaskeregnskab',
    )),
    'logud' => 'Log ud',
  );

  foreach ($pages as $key => $value) {

    if (is_array($value)) {

      echo('<a id="'.$key.'" href="javascript:menu(\''.$key.'\', true)">'.$value[0]).'</a>';

      echo('<div class="sub sub_'.$key.'">');

      foreach ($value[1] as $subkey => $subvalue) {

        echo('<a href="javascript:menu(\''.$subkey.'\')">'.$subvalue.'</a>');

      }

      echo('</div>');

    } else {

      echo('<a href="javascript:menu(\''.$key.'\')">'.$value.'</a>');

    }

  }

?>
