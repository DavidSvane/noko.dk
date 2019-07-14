<!DOCTYPE html>
<html>
<head>

  <meta charset="UTF-8"></meta>

  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="format-detection" content="telephone=no">
	<meta name="msapplication-tap-highlight" content="no">

	<meta name="description" content=""></meta>
	<meta name="keywords" content=""></meta>
	<meta name="author" content="David Svane"></meta>

	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="window-target" content="_top">
	<meta http-equiv="expires" content="Mon, 22 Jul 2002 11:12:01 GMT">

	<title>NOKO Afstemning</title>
	<!--<link rel="icon" href="../res/icon.ico" type="image/x-icon">-->
  <link rel="stylesheet" type="text/css" href="voting.css?v=<?php echo time();?>"></link>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="voting.js?v=<?php echo time();?>"></script>
	<script src="lib_md5.js"></script>

</head>
<body>

  <div id="login">
    <div class="cnt">
      <form action="javascript:userLogin()">
        <input type="text" pattern="[0-9]{4}" placeholder="Løbenummer" maxlength="4" id="ul_user"/>
        <input type="password" placeholder="Kode" id="ul_pass"/>
        <input type="submit" value="Login" id="ul_sub"/>
      </form>
    </div>
  </div>

  <header class="notverified"><h1><a href="javascript:showMenu()">NOKO AFSTEMNING</a></h1></header>
  <nav class="notverified"></nav>
  <main class="notverified"></main>

</body>
</html>
