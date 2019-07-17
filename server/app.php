<?php

  // INFO: NEEDED IN SOME CASES LIKE FRAMEWORK7
  // header('Content-type: application/json');
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: text/html; charset=utf-8');


  // INFO: REUSABLE MODULES
  function runQuery($page, $returning=true, $append=false) {

    global $conn, $pages, $data;

    if ($returning) {
      $result = $conn->query($pages[$page]);

      if (!$append) {

        while($row = mysqli_fetch_array($result)){ $data[] = $row; }

      } else {

        $data[$append] = array();
        while($row = mysqli_fetch_array($result)){ $data[$append][] = $row; }

      }

    } else {
      $conn->query($pages[$page]);
    }

  }


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
     6 => 'Orlov retur*'
   );


   $date = new DateTime();
   $week1 = $date->setISODate(date('Y', time()), date('W', time()), 1)->format('Y-m-d');;
   $week2 = $date->setISODate(date('Y', time()), date('W', time())+1, 1)->format('Y-m-d');
   $d_f = $date->setISODate(date('Y'),date('W')-1,4)->format('Y-m-d');
   $d_l = $date->setISODate(date('Y'),date('W')-1,7)->format('Y-m-d 23:59:59');
   $d_p1 = date('Y').'-'.substr('00'.date('n'),-2);
   $d_p2 = date('Y').'-'.substr('00'.(date('n')+1),-2);


  // INFO: SQL STATEMTNS FOR ALLE PAGES (!! laundry | shifts)
  $pages = array(

    // INFO: FRONT PAGE QUERIES
    'i_food' => "SELECT d" . date("N") . ", week
        				FROM info_menu
        				WHERE week
        				  LIKE '" . date('Y-m-d', strtotime(date('Y') . 'W' . date('W'))) . "%'",
    'i_shifts' => "SELECT setting
          				FROM info_shifts
          				WHERE (
                    year='".date('Y')."'
                    AND month='".date('n')."'
                  )",
    'i_laundry' => "SELECT SUBSTRING(week,1,10) AS week, nr, day, time
            				FROM book_laundry
            				WHERE (
            					user=" . $_POST['rm'] . "
            					AND week>='" . $week1 . "'
            					AND week<'" . $week2 . "'
            					)
            				ORDER BY SUBSTRING(week,1,10), nr, day, time ASC",
    'i_party' => "SELECT date, name
            			FROM info_cal
            			WHERE (
                    active=1
                    AND date>='" . date("Y-m-d 00:00:00") . "'
                  )
            			ORDER BY date
            			LIMIT 1",
    'news' => 'SELECT id, time, title, place, img, priority, link
              FROM info_news
              WHERE (
                active=1
                AND time>"'.date("Y-m-d").'"
              )
              ORDER BY time ASC',


    // INFO: SUBPAGE QUERIES
    'alumni' => 'SELECT uid, status, CONCAT(first," ",last) AS name, room, nr
                FROM user
                WHERE (
                  active=1
                  AND status IN (0,2,3,6)
                  AND room > 0
                )
                ORDER BY room ASC',
    'calendar' => 'SELECT date, name, who
                  FROM info_cal
                  WHERE SUBSTRING(date,1,4)="'.date('Y').'"
                  ORDER BY date ASC',
    'food' => 'SELECT week, d1, d2, d3, d4, d5, d6, d7
              FROM info_menu
              WHERE week>"'.$d_f.'"
              ORDER BY week ASC',
    'guides' => 'SELECT *
                FROM guides
                ORDER BY title ASC',
    'laundry' => 'SELECT week, day, nr, time, user, id
                  FROM book_laundry
                  WHERE week>"'.$d_l.'"',
    'shifts' => 'SELECT s.year, s.month, s.setting
                FROM info_shifts AS s
                INNER JOIN (
                  SELECT MAX(id) AS id
                  FROM info_shifts
                  GROUP BY CONCAT(year,month)
                ) AS m
                ON s.id=m.id
                WHERE (
                  s.year="'.date('Y').'"
                  AND s.month>="'.date('n').'"
                )',

  );


  // INFO: SETTING SERVER VARIABLES AND CREATING CONNECTION
  $data = array();
  $servername = "mysql5.gigahost.dk";
	$username = "noko";
	$password = "7@aahWhd3#^Wy8YF";
	$dbname = "noko_intranet";
	$conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }


  // INFO: QUERY LOGICS
  if ($_POST['page'] == 'index') {

    runQuery('i_food', true, "food");
    runQuery('i_shifts', true, "shifts");
    runQuery('i_laundry', true, "laundry");
    runQuery('i_party', true, "party");

    // INFO: UTF8 ENCODE ARRAY
    require 'utf8_encoder.php';
    utf8_encode_deep($data);
    echo(json_encode($data));

  } else {

    $sql = $pages[$_POST['page']];

    // INFO: CHECK QUERY TYPE
    if (substr($sql,0,6) == 'SELECT') {

      runQuery($_POST['page']);

      require 'utf8_encoder.php';
      utf8_encode_deep($data);
      echo(json_encode($data));

    } else if (substr($sql,0,6) == 'UPDATE' || substr($sql,0,6) == 'DELETE' || substr($sql,0,6) == 'INSERT') {

      $conn->query($sql);
      echo('success');

    }

  }


  // INFO: CLOSING CONNECTION
  $conn->close();

?>
