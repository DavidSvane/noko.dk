<?php $lang = isset($_GET['l']) ? $_GET['l'] : 'da'; // INFO: CHANGE PAGE LANGUAGE BY POSTING 'l' VARIABLE AS 'da' OR 'en' ?>
<!DOCTYPE html>
<html>
<head>

	<meta charset="UTF-8"></meta>
	<meta name="description" content="Nordisk Kollegium er et traditionsrigt kollegium, grundlagt i 1942 af H. O. Lange. Den smukke funkis bygning som huser kollegiet er tegnet af arkitekten Hans Jørgen Kampmann. Kollegiet er beliggende i hjertet af Østerbro og huser 130 alumner fra mange forskellige uddannelsesretninger."></meta>
	<meta name="keywords" content="noko,nordisk,kollegium,østerbro,alumner,studerende"></meta>
	<meta name="author" content="David Svane"></meta>

	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="window-target" content="_top">
	<meta http-equiv="expires" content="Mon, 22 Jul 2002 11:12:01 GMT">

	<title>Nordisk Kollegium</title>
	<link rel="icon" href="res/icon.ico" type="image/x-icon">
	<link rel="stylesheet" type="text/css" href="css/style.css?v=<?php echo time(); // INFO: AVOIDS CACHED VERSION ?>"></link>

</head>
<body>

<?php
	require 'php/langs.php'; // INFO: DA AND EN TEXT STRINGS BY 'l' GET REQUEST
	require 'php/mysql.php'; // INFO: INTERFACE FOR USING MEDOO FUNCTIONS
?>

  <header class="centered blocky">
    <h1 class="top_titles">Nordisk Kollegium</h1>
  </header>

  <nav class="centered blocky">
    <hr />
    <?php require 'php/menu.php'; // INFO: AUTOGENERATES MENU FROM ARRAY, LANGUAGE AND INTRANET ARE SPECIAL CASES ?>
    <hr />
  </nav>

  <main class="centered blocky">
    <?php require 'php/pages.php'; // INFO: AUTOGENERATES PAGE, FRONTPAGE AND FOOD ARE SPECIAL CASES ?>
  </main>

  <footer class="centered blocky">
    <hr />
    Nordisk Kollegiums Kontor | Strandboulevarden 32, Stuen, 2100 København Ø | Tlf. nr.: <a href="tel:+4535274500">35 27 45 00</a> | E-mail: <a href="mailto:kontoret@noko.dk">kontoret@noko.dk</a>
    <br /><br />
  </footer>


	<!-- ***** JavaScripts ***** -->
	<!-- INFO: LIBRAIRES -->
	<script src="js/lib_jquery.js"></script> <!-- https://jquery.com/download/ -->
	<script src="js/lib_flexarea.js"></script> <!-- INFO: AUTO ADJUSTS THE HEIGHT OF TEXTAREAS -->

</body>
</html>
