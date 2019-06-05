<!DOCTYPE html>
<html>
<head>

	<meta charset="UTF-8"></meta>
	<meta name="description" content=""></meta>
	<meta name="keywords" content=""></meta>
	<meta name="author" content="David Svane"></meta>

	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="window-target" content="_top">
	<meta http-equiv="expires" content="Mon, 22 Jul 2002 11:12:01 GMT">

	<title>NOKO Intranet</title>
	<link rel="icon" href="../res/icon.ico" type="image/x-icon">
	<link rel="stylesheet" type="text/css" href="../css/style.css?v=<?php echo time();?>"></link>
	<link rel="stylesheet" type="text/css" href="../css/flatpickr.css"></link>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

	<script src="../js/lib_jquery.js"></script>
	<script src="../js/lib_papaparse.js"></script>
	<script src="../js/lib_md5.js"></script>
	<script src="../js/lib_muuri.js"></script>
	<script src="../js/lib_flatpickr.js"></script>
	<script src="../js/general_browsing.js"></script>
	<script src="../js/general_cookies.js"></script>
  <script src="../js/general_dating.js"></script>
	<script src="../js/general_tabs-n-tables.js"></script>

</head>
<body id="i_">

	<header class="centered blocky">
    <h1 class="top_titles">Nordisk Kollegiums Intranet</h1>
  </header>

  <nav class="centered blocky">
    <hr />
    <?php require 'menu.php'; // INFO: AUTOGENERATES MENU FROM ARRAY, LANGUAGE AND INTRANET ARE SPECIAL CASES ?>
    <hr />
  </nav>

  <main class="centered blocky contentbox">
    <img src="../res/logo_intranet.png" class="centered" style="width: 300px;"/>
  </main>

  <footer class="centered blocky">
    <hr />
    Nordisk Kollegiums Kontor | Strandboulevarden 32, Stuen, 2100 København Ø | Tlf. nr.: <a href="tel:+4535274500">35 27 45 00</a> | E-mail: <a href="mailto:kontoret@noko.dk">kontoret@noko.dk</a> | af <a href="https://www.facebook.com/davidsvane" target="_blank">David Svane</a>
    <br /><br />
  </footer>


	<script src="../js/special_menu-click.js"></script>
	<script src="../js/special_events.js"></script>
	<script src="../js/special_alumner.js"></script>
	<script src="../js/special_keyboard.js"></script>
	<script src="../js/special_mouse.js"></script>
  <script src="../js/functional_admin.js"></script>
  <script src="../js/functional_bookings.js"></script>
  <script src="../js/functional_plenum.js"></script>
	<script src="../js/functional_page-loader.js?v=<?php echo time();?>"></script>

	<script> menu('login'); </script>

</body>
</html>
