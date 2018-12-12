<?php

  // INFO: NEEDED IN SOME CASES LIKE FRAMEWORK7
  // header('Content-type: application/json');
  header('Access-Control-Allow-Origin: *');

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

  // INFO: GETS THURSDAY OF LAST WEEK, FOOD TABLE IS ORDERED BY MONDAY OF EVERY WEEK
  $d_f = new DateTime();
  $d_f->setISODate(date('Y'),date('W')-1,4);
  $d_f = date_format($d_f,'Y-m-d');

  // INFO: GETS CURRENT AND NEXT MONTH, VAGTPLAN TABLES ARE ORDERED BY 1ST OF EVERY MONTH
  $d_p1 = date('Y').'-'.substr('00'.date('n'),-2);
  $d_p2 = date('Y').'-'.substr('00'.(date('n')+1),-2);

  // INFO: GETS SUNDAY 1SEC TO MIDNIGHT OF LAST WEEK, LAUNDRY TABLE ORDERED BY DATES AND TIMESTAMP FROM BOOK TIME
  $d_l = new DateTime();
  $d_l->setISODate(date('Y'),date('W')-1,7);
  $d_l = date_format($d_l,'Y-m-d 23:59:59');

  // INFO: SQL STATEMTNS FOR ALLE PAGES
  $pages = array(
    'front' => 'SELECT id, text
                FROM news
                WHERE id
                  IN (1,2,3,5,7)',

    'food' => 'SELECT week, d1, d2, d3, d4, d5, d6, d7
                FROM kitchen_plans
                WHERE week>"'.$d_f.'"
                ORDER BY week ASC',

    'plan' => 'SELECT pid, day, d1, d2, month, type
                FROM vagtplan_felter
                INNER JOIN vagtplan_sider
                  ON vagtplan_felter.pid=vagtplan_sider.id
                WHERE SUBSTRING(vagtplan_sider.month,1,7)="'.$d_p1.'"
                  OR SUBSTRING(vagtplan_sider.month,1,7)="'.$d_p2.'"',

    'cal' => 'SELECT date, name, who
                FROM party
                WHERE SUBSTRING(date,1,4)="'.date('Y').'"
                ORDER BY date ASC',

    'laundry' => 'SELECT week, day, nr, time, room
                  FROM laundry
                  WHERE week>"'.$d_l.'"',

    'bike' => 'SELECT week, day, time, room
                FROM mcbike
                WHERE week>"'.$d_l.'"',

    'rooms' => 'SELECT week, day, time, room
                FROM rooms
                WHERE week>"'.$d_l.'"',

    'current' => 'SELECT a.status, u.name, a.room
                  FROM users AS u
                  INNER JOIN
                  (
                  	SELECT CONCAT(date,uid) AS md, uid, date, status, room
                    FROM alumni_fields
                  ) AS a
                  ON a.uid=u.uid
                  INNER JOIN
                  (
                  	SELECT CONCAT(MAX(date),uid) AS md
                    FROM alumni_fields
                    GROUP BY uid
                  ) AS m
                  ON a.md=m.md
                  WHERE (u.status=1 AND a.status IN (0,1,2,3,6))
                  ORDER BY u.name ASC',

    'previous' => 'SELECT u.name, a.room, u.mail, a.date
                  FROM users AS u
                  INNER JOIN
                  (
                  	SELECT CONCAT(date,uid) AS md, uid, date, status, room
                      FROM alumni_fields
                  ) AS a
                  ON a.uid=u.uid
                  INNER JOIN
                  (
                  	SELECT CONCAT(MAX(date),uid) AS md
                      FROM alumni_fields
                      GROUP BY uid
                  ) AS m
                  ON a.md=m.md
                  WHERE u.status=0
                  ORDER BY u.name ASC',

    'me' => '',
    'logud' => '',
    'login' => ''
  );

  // INFO: SETTING SERVER VARIABLES AND CREATING CONNECTION
  $servername = "mysql5.gigahost.dk";
	$username = "noko";
	$password = "7@aahWhd3#^Wy8YF";
	$dbname = "noko_web";
	$conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  $sql = $pages[$_POST['page']];

  // INFO: CHECK QUERY TYPE
  if (substr($sql,0,6) == 'SELECT') {

    $result = $conn->query($sql);
    $data = array();
    while($row = mysqli_fetch_array($result)){ $data[] = $row; }

    // INFO: UTF8 ENCODE ARRAY
    require 'utf8_encoder.php';
    utf8_encode_deep($data);
    echo(json_encode($data));

  }

  // INFO: CLOSING CONNECTION
  $conn->close();

?>
