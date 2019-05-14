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


    } else if ($page == 'donations') {

      $output .= '<img src="res/img3.jpg"/>';
      $output .= '<p id="' . $page.'_content' . '">
Nordisk Kollegiums løbende drift og vedligeholdelse finansieres af beboernes betaling af husleje og af alumnernes deltagelse i den daglige drift via køkkentjeneste og en lang række tillidshverv. Kollegiet er derimod afhængigt af eksterne donationer til større renoveringsopgaver og regulære forbedringer.

<br /><br /><a href="res/fondsledelse_201803.pdf" target="_blank">Redegørelse for god fondsledelse - Nordisk Kollegium Marts 2018</a><br /><br /><br /><br />

Inden for de senere år har kollegiet med stor taknemmelighed modtaget følgende donationer:

<br /><br /><b>2018:</b>
<br />A. P. Møller og Hustru Chastine McKinney Møllers Fond til almene Formaal: Restaurering af originale spisestuestole på Nordisk Kollegium (op til 525.000 kr.)

<br /><br /><b>2017:</b>
<br />Ex-alumne: Underskudsgaranti, jubilæumsbog, Nordisk Kollegiums 75 års-jubilæum (100.000 kr.)

<br /><br /><b>2016:</b>
<br />Augustinus Fonden: Renovering af tagterrasse (100.000 kr.)
<br />Knud Højgaards Fond: Forbedring af akustikken i kollegiets spisesal og gymnastiksal (350.000 kr.)
<br />Sonning-Fonden: Forbedring af akustikken i kollegiets spisesal og gymnastiksal (142.500 kr.)

<br /><br /><b>2014:</b>
<br />Augustinus Fonden: Renovering af vinduer og døre (1.000.000 kr.)
<br />Knud Højgaards Fond: Renovering af vinduer og døre (500.000 kr.)

<br /><br /><b>2013:</b>
<br />Augustinus Fonden: Renovering af kollegiets opvaskerum (90.000 kr.)
<br />Ex-alumne: Trøjer til kollegiets fodboldhold (2.500 kr.)
<br />PL Service Sjælland: Trøjer til kollegiets fodboldhold (2.500 kr.)

<br /><br /><b>2012:</b>
<br />Den A. P. Møllerske Støttefond: Etablering af motionsrum (100.000 kr.)
<br />Ex-alumne: Tøj til kollegiets fodboldhold (5.100 kr.)
<br />Knud Højgaards Fond: Etablering af motionsrum (35.000 kr.)
<br />Lokale- og Anlægsfonden: Etablering af motionsrum (40.000 kr.)

<br /><br /><b>2011:</b>
<br />Bygningsbevaringsfonden af 1975: Facaderenovering, værn (15.000 kr.)

<br /><br /><b>2010:</b>
<br />Augustinus Fonden: Renovering af vinduer og døre på Nordisk Kollegiums to femtesale (1.000.000 kr.)
<br />Tuborgs Grønne Fond: Hovedrenovering af Nordisk Kollegiums koncertflygel (81.000 kr.)

<br /><br /><b>2008:</b>
<br />Augustinus Fonden: Gennemgang og udskiftning af el-tavler (40.000 kr.)<br />
<br />Ex-alumne Christian Dyvig: Renovering og retablering af lanterner i kollegiets gård (25.000 kr.)

<br /><br /><b>2007:</b>
<br />A.P. Møller: Renovering af kollegiets VVS-faciliteter, udskiftning af håndvaske og toiletter (125.000 kr.)

<br /><br /><b>2006:</b>
<br />Augustinus Fonden: Renovering af otte regnvandsfaldstammer, inkl. nye brønde (50.000 kr.)

<br /><br /><b>2005:</b>
<br />Augustinus Fonden: Renovering af kollegiets gange, nye gulve (75.000 kr.)
<br />Georg & Johanne Harders Legat: Renovering af kollegiets gange, kabling (2.000 kr.)
<br />Tuborgs Grønne Fond: Renovering af Nordisk Kollegiums koncertflygel (15.000 kr.)

<br /><br /><b>2004:</b>
<br />Ex-alumner v/Mia Larsen/x120: To sæt havemøbler til kollegiets gård
<br />Nykredits Fond: Renovering af kollegiets gange, ny belysning (50.000 kr.)
<br />Oticon Fonden: Renovering af kollegiets gange, nye gulve (75.000 kr.)

<br /><br /><b>2003:</b>
<br />Finlands ambassade: Flag
<br />Færøernes Repræsentationskontor: Flag
<br />Norges ambassade: Flag
<br />Sveriges ambassade: Flag

<br /><br /><b>2002:</b>
<br />Kraks Fond: Renovering af elevatorstole (500.000 kr.)</p>';

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
