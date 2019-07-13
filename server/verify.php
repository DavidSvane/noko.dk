<?php

  // INFO: NEEDED FOR REMOTE ACCESS
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: text/html; charset=utf-8');

  // INFO: LOGIN LOGIC
  $servername = "mysql5.gigahost.dk";
  $username = "noko";
  $password = "7@aahWhd3#^Wy8YF";
  $dbname = "noko_web";
  $conn = new mysqli($servername, $username, $password, $dbname);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  $conn->set_charset("utf8");


  if (isset($_POST['usr']) && isset($_POST['pas']) && ($_POST['usr'] == "admin" || $_POST['usr'] == "kontor") || $_POST['usr'] == "Køkkenet") {

    $sql = 'SELECT *
            FROM users
            WHERE pass="'.$_POST["pas"].'"
              AND name="'.$_POST['usr'].'"
              AND status=1
            ORDER BY uid ASC';

    $result = $conn->query($sql);
    $data = array();
    while($row = mysqli_fetch_array($result)){ $data[] = $row; }

    if (count($data) > 0) {
      $salt = mt_rand();
      $sql = 'INSERT INTO user_sessions (user, salt, admin)
              VALUES ("'.$_POST['usr'].'", '.$salt.', 1)';

      $conn->query($sql);
      $data['salt'] = $salt;
    }

    require 'utf8_encoder.php';
    utf8_encode_deep($data);
    echo(json_encode($data));

  } else if (isset($_POST['usr']) && isset($_POST['pas'])) {

    $len = strlen($_POST["usr"]) > 1 ? strlen($_POST["usr"]) : 100;
    $sql = 'SELECT u.name, p.first, p.last, f.room, f.nr, u.mail, u.pass, f.uid
            FROM users AS u
            INNER JOIN
            alumni_fields AS f
            ON u.uid=f.uid
            INNER JOIN
            alumni_profile AS p
            ON u.uid=p.uid
            WHERE u.pass="'.$_POST["pas"].'" AND (
              u.name="'.$_POST["usr"].'"
              OR SUBSTRING(p.first,1,'.$len.')="'.$_POST["usr"].'"
              OR (f.nr="'.$_POST["usr"].'" AND f.nr!=0)
              OR u.mail="'.$_POST["usr"].'"
            )
            ORDER BY f.id DESC
            LIMIT 1';

    $result = $conn->query($sql);
    $data = array();
    while($row = mysqli_fetch_array($result)){ $data[] = $row; }

    if (count($data) > 0) {
      $salt = mt_rand();
      $sql = 'INSERT INTO user_sessions (user, salt)
              VALUES ('.$data[0]["nr"].', '.$salt.')';

      $conn->query($sql);
      $data['salt'] = $salt;
    }

    require 'utf8_encoder.php';
    utf8_encode_deep($data);
    echo(json_encode($data));

  } else if (isset($_POST['usr']) && isset($_POST['sal'])) {

    $sql = 'SELECT user, salt
            FROM user_sessions
            WHERE user="'.$_POST['usr'].'" AND salt='.$_POST['sal'];

    $result = $conn->query($sql);
    $data = array();
    while($row = mysqli_fetch_array($result)){ $data[] = $row; }

    require 'utf8_encoder.php';
    utf8_encode_deep($data);
    echo(json_encode($data));

  }

$conn->close();

?>
