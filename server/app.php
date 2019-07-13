<?php

  // INFO: NEEDED IN SOME CASES LIKE FRAMEWORK7
  // header('Content-type: application/json');
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: text/html; charset=utf-8');

  // INFO: VARIABLES
  $status = array(
    -2 => 'Slet seneste',
    -1 => 'Uændret',
     0 => 'Indflyttet',
     1 => 'Orlov',
     2 => 'Orlov retur',
     3 => 'Omflyttet',
     4 => 'Fraflyttet',
     5 => 'Andet',
     6 => 'Orlov retur*');


   $week1 = new DateTime();
   $week1->setISODate(date('Y', time()), date('W', time()), 1);
   $week1 = $week1->format('Y-m-d');

   $week2 = new DateTime();
   $week2->setISODate(date('Y', time()), date('W', time())+1, 1);
   $week2 = $week2->format('Y-m-d');

   $d_f = new DateTime();
   $d_f->setISODate(date('Y'),date('W')-1,4);
   $d_f = date_format($d_f,'Y-m-d');

   $d_p1 = date('Y').'-'.substr('00'.date('n'),-2);
   $d_p2 = date('Y').'-'.substr('00'.(date('n')+1),-2);

   $d_l = new DateTime();
   $d_l->setISODate(date('Y'),date('W')-1,7);
   $d_l = date_format($d_l,'Y-m-d 23:59:59');


  // INFO: SQL STATEMTNS FOR ALLE PAGES
  $pages = array(

    'i_food' => "SELECT d" . date("N") . ", week
        				FROM kitchen_plans
        				WHERE week
        				LIKE '" . date('Y-m-d', strtotime(date('Y') . 'W' . date('W'))) . "%'",

    'i_shifts' => "SELECT day, pid
          				FROM vagtplan_felter
          				WHERE (d1=" . $_POST['rm'] . " OR d2=" . $_POST['rm'] . ")
          				AND pid IN (
          					SELECT id
          					FROM vagtplan_sider
          					WHERE month='" . date('Y-m-01 12:00:00', time()) . "'
          				)",

    'i_laundry' => "SELECT SUBSTRING(week,1,10) AS week, nr, day, time
            				FROM laundry
            				WHERE (
            					room=" . $_POST['rm'] . "
            					AND week>='" . $week1 . "'
            					AND week<='" . $week2 . "'
            					)
            				ORDER BY SUBSTRING(week,1,10), nr, day, time ASC",

    'i_party' => "SELECT date, name
            			FROM party
            			WHERE date>='" . date("Y-m-d 00:00:00") . "'
            			ORDER BY date
            			LIMIT 1",

    'news' => 'SELECT i.id, i.time, i.title, i.description, i.place, i.img, i.priority, i.type, i.user, i.link
              FROM info_news AS i
              INNER JOIN info_news_types AS t
              ON i.type=t.id
              WHERE (
                i.active=1
                AND i.time>"'.date("Y-m-d").'"
              )
              ORDER BY i.time ASC',

    'food' => 'SELECT week, d1, d2, d3, d4, d5, d6, d7
              FROM kitchen_plans
              WHERE week>"'.$d_f.'"
              ORDER BY week ASC',

    'shifts' => 'SELECT pid, day, d1, d2, month, type
                FROM vagtplan_felter
                INNER JOIN vagtplan_sider
                  ON vagtplan_felter.pid=vagtplan_sider.id
                WHERE SUBSTRING(vagtplan_sider.month,1,7)="'.$d_p1.'"
                  OR SUBSTRING(vagtplan_sider.month,1,7)="'.$d_p2.'"
                ORDER BY month ASC, day ASC, type ASC',

    'laundry' => 'SELECT week, day, nr, time, room, id
                  FROM laundry
                  WHERE week>"'.$d_l.'"',

    'alumni' => 'SELECT u.uid, a.status, u.name, a.room, m.nr
                FROM users AS u
                INNER JOIN
                (
                	SELECT CONCAT(date,uid) AS md, uid, date, status, room
                  FROM alumni_fields
                ) AS a
                ON a.uid=u.uid
                INNER JOIN
                (
                	SELECT CONCAT(MAX(date),uid) AS md, nr
                  FROM alumni_fields
                  GROUP BY uid
                ) AS m
                ON a.md=m.md
                WHERE (u.status=1
                  AND a.status IN (0,2,3,6)
                  AND a.room > 0)
                ORDER BY a.room ASC',

    'calendar' => 'SELECT date, name, who
                  FROM party
                  WHERE SUBSTRING(date,1,4)="'.date('Y').'"
                  ORDER BY date ASC',

    'guides' => 'SELECT *
                FROM guides
                ORDER BY title ASC'

  );


  // INFO: SETTING SERVER VARIABLES AND CREATING CONNECTION
  $servername = "mysql5.gigahost.dk";
	$username = "noko";
	$password = "7@aahWhd3#^Wy8YF";
	$dbname = (isset($_POST['ver']) && $_POST['ver'] > 0) ? "noko_intranet" : "noko_web";
	$conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  function normalQuery() {

    global $conn, $pages, $status;

    $specialklassen = [''];
    if (in_array($_POST['page'], $specialklassen)) { $conn->set_charset("utf8"); }
    $sql = $pages[$_POST['page']];

    // INFO: CHECK QUERY TYPE
    if (substr($sql,0,6) == 'SELECT') {

      $result = $conn->query($sql);
      $data = array();
      while($row = mysqli_fetch_array($result)){ $data[] = $row; }

      $admins = ['admin'];
      $package = [$data, in_array($_POST['nr'], $admins)];

      // INFO: UTF8 ENCODE ARRAY
      require 'utf8_encoder.php';
      utf8_encode_deep($package);
      echo(json_encode($package));

    } else if (substr($sql,0,6) == 'UPDATE' || substr($sql,0,6) == 'DELETE' || substr($sql,0,6) == 'INSERT') {

      $conn->query($sql);
      echo('success');

    }

  }


  if ($_POST['page'] == 'index') {

    $sql = $pages['i_food'];
    $result = $conn->query($sql);
    $data['food'] = array();
    if ($result->num_rows > 0) { while($row = mysqli_fetch_array($result)){ $data['food'][] = $row; } }

    $sql = $pages['i_shifts'];
    $result = $conn->query($sql);
    $data['shifts'] = array();
    if ($result->num_rows > 0) { while($row = mysqli_fetch_array($result)){ $data['shifts'][] = $row; } }

    $sql = $pages['i_laundry'];
    $result = $conn->query($sql);
    $data['laundry'] = array();
    if ($result->num_rows > 0) { while($row = mysqli_fetch_array($result)){ $data['laundry'][] = $row; } }

    $sql = $pages['i_party'];
    $result = $conn->query($sql);
    $data['party'] = array();
    if ($result->num_rows > 0) { while($row = mysqli_fetch_array($result)){ $data['party'][] = $row; } }

    // INFO: UTF8 ENCODE ARRAY
    require 'utf8_encoder.php';
    utf8_encode_deep($data);
    echo(json_encode($data));

  } else { normalQuery(); }


  // INFO: CLOSING CONNECTION
  $conn->close();

?>
