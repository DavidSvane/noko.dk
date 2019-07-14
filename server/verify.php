<?php

  // INFO: NEEDED FOR REMOTE ACCESS
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: text/html; charset=utf-8');

  // INFO: LOGIN LOGIC
  $servername = "mysql5.gigahost.dk";
  $username = "noko";
  $password = "7@aahWhd3#^Wy8YF";
  $dbname = "noko_intranet";
  $conn = new mysqli($servername, $username, $password, $dbname);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  $conn->set_charset("utf8");


  if (isset($_POST['usr']) && isset($_POST['pas']) && ($_POST['usr'] == "admin" || $_POST['usr'] == "kontor") || $_POST['usr'] == "Køkkenet") {

    $sql = 'SELECT *
            FROM user
            WHERE (
              pass="'.$_POST["pas"].'"
              AND name="'.$_POST['usr'].'"
              AND status=1
            )
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
    $sql = 'SELECT uid, first, last, room, nr, mail, pass
            FROM user
            WHERE (
              pass="'.$_POST["pas"].'"
              AND (
                CONCAT(first," ",last)="'.$_POST["usr"].'"
                OR SUBSTRING(first,1,'.$len.')="'.$_POST["usr"].'"
                OR (nr="'.$_POST["usr"].'" AND nr!=0)
                OR mail="'.$_POST["usr"].'"
              )
            )
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
