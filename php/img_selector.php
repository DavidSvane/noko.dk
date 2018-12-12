<?php

  // INFO: GETTING A LIST OF ALL IMAGES IN THE RES FOLDER

  $img_list = scandir('../res/');

  foreach($img_list as $pos => $img) {

    if (!strpos($img, '.jpg')) {

      unset($img_list[$pos]);

    }

  }

  echo(json_encode($img_list));

?>
