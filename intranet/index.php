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
	<script src="../js/jQuery.js"></script>
	<script src="../js/PapaParse.js"></script>
	<script src="../js/MD5.js"></script>
	<script src="../js/cookies.js"></script>

</head>
<body id="i_">

	<header class="centered blocky">
    <h1 class="top_titles">Nordisk Kollegium's Intranet</h1>
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
    Nordisk Kollegiums Kontor | Strandboulevarden 32, Stuen, 2100 København Ø | Tlf. nr.: <a href="tel:+4535274500">35 27 45 00</a> | E-mail: <a href="mailto:kontoret@noko.dk">kontoret@noko.dk</a>
    <br /><br />
  </footer>


  <script src="../js/admin.js"></script>
  <script src="../js/bookings.js"></script>
	<script src="../js/menu_click.js"></script>
	<script src="../js/dating.js"></script>
	<script src="../js/tabs_n_tables.js"></script>
	<script src="../js/page_loader.js"></script>

	<script> menu('login'); </script>

</body>
</html>
