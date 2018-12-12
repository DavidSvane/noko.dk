<?php

  function generatePage($page) {

    global $lang, $da, $en;

    $output = '';

    if ($page == 'frontpage') {

      $output .= '<img  src="res/' . getImgSrc('img_' . $page) . '" id="img_' . $page . '"/>';

    } else if ($page == 'food') {

      $output .= '<img  src="res/' . getImgSrc('img_' . $page) . '" id="img_' . $page . '"/>';
      $foods = getFoods();
      $titles = ['Denne uge','Næste uge','Ugen efter næste uge'];

      $output .= '<p>';
      for ($i=0; $i < sizeof($foods); $i++) {
        $output .= '<b>' . $titles[$i] . '</b><br />';
        for ($j=0; $j < sizeOf($foods[$i]); $j++) {
          $output .= '<i>' . $$lang['wd'.($j+1)] . '</i>) ' . $foods[$i]['d'.($j+1)] . '<br />';
        }
        $output .= '<br />';
      }
      $output .= '</p>';


    } else {

      $output .= '<img  src="res/' . getImgSrc('img_' . $page) . '" id="img_' . $page . '"/>';
      $output .= '<p id="' . $page.'_content' . '" class="editables" lang="' . $lang . '">' . getPageText($lang, $page.'_content') . '</p>';

    }

    return $output;

  }

  if (isset($_GET['p'])) {

    echo ( generatePage($_GET['p']) );

  } else {

    echo( generatePage('frontpage') );

  }

?>
