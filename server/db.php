<?php

  // INFO: NEEDED IN SOME CASES LIKE FRAMEWORK7
  // header('Content-type: application/json');
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: text/html; charset=utf-8');


  if ($_POST['page'] == 'summaries') {

    $files = scandir('../plenum');
    echo(json_encode($files));
    die();

  } else if ($_POST['page'] == 'files') {

    $files = scandir('../files');
    echo(json_encode($files));
    die();

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

  // INFO: TIMESTAMPS OF WEEK FOR LAUNDRY ACCOUNTING
  if (isset($_POST['year']) && isset($_POST['week'])) {
    $d_a1 = new DateTime();
    $d_a1->setISODate($_POST['year'],$_POST['week']-1,7);
    $d_a1 = date_format($d_a1,'Y-m-d 23:59:59');
    $d_a2 = new DateTime();
    $d_a2->setISODate($_POST['year'],$_POST['week'],7);
    $d_a2 = date_format($d_a2,'Y-m-d 23:59:59');
  }

  // INFO: LIST OF UID WITH ADMIN ACCESS
  $admins = ['admin',4202];

  // INFO: VARIABLE SETUP FOR BOOKING QUERIES
  if ($_POST['page'] == 'laundry_book') { $binfo = explode("_", $_POST['bid']); }
  if ($_POST['page'] == 'bike_book') { $binfo = explode("_", $_POST['bid']); }
  if ($_POST['page'] == 'rooms_book') { $binfo = explode("_", $_POST['bid']); }
  if ($_POST['page'] == 'gym_book') { $binfo = explode("_", $_POST['bid']); }
  if ($_POST['page'] == 'speaker_book') { $binfo = explode("_", $_POST['bid']); }
  if ($_POST['page'] == 'food_insert' || $_POST['page'] == 'food_update') {
    $menu = json_decode(urldecode($_POST['m']), true);
    $fweek = new DateTime();
    $fweek->setISODate($_POST['y'],$_POST['w'],1);
    $fweek = date_format($fweek, 'Y-m-d 09:00:00');
  }
  if ($_POST['page'] == 'news_add' || $_POST['page'] == 'news_update') { $info = json_decode(urldecode($_POST['info']), true); }
  $blocked_users = [];
  if ($_POST['page'] == 'news_add' && in_array($_POST['nr'], $blocked_users)) { die("User access denied"); }

  if ($_POST['page'] == 'a_vagtplan' && !isset($_POST['y'])) {
    $vp_y = date('Y');
    $vp_m = date('n');
  } else {
    $vp_y = $_POST['y'];
    $vp_m = $_POST['m'];
  }

  if ($_POST['page'] == 'poll_open') { $data = urldecode($_POST['q']); }
  if ($_POST['page'] == 'a_lists_fetch') {
    $lists_data = json_decode($_POST['p']);
    if ($lists_data->restrict) {
      $lists_data->restrict = 'INNER JOIN (SELECT CONCAT(uid, MAX(date)) AS tag FROM alumni_fields GROUP BY uid) AS t ON CONCAT(f.uid, f.date)=t.tag';
    } else {
      $lists_data->restrict = null;
    }
  }

  // INFO: SQL STATEMTNS FOR ALLE PAGES
  $pages = array(
    'alumne_fetch' => 'SELECT u.name AS name,
                        f.nr AS nr,
                        f.room AS room,
                        f.status AS status,
                        s.title AS title,
                        p.study AS study,
                        u.mail AS mail,
                        p.phone AS phone,
                        f.date AS date
                      FROM users AS u
                      LEFT JOIN alumni_profile AS p
                        ON u.uid=p.uid
                      LEFT JOIN alumni_fields AS f
                        ON u.uid=f.uid
                      LEFT JOIN alumni_status AS s
                        ON f.status=s.status
                      WHERE u.uid="'.$_POST['u'].'"
                      ORDER BY date ASC',

    'cal' => 'SELECT date, name, who
                FROM party
                WHERE SUBSTRING(date,1,4)="'.date('Y').'"
                ORDER BY date ASC',

    'changes' => 'SELECT f.date,
                    u.name AS name,
                    f.room AS room,
                    f.status AS status,
                    sl.title AS title
                  FROM users AS u
                  LEFT JOIN alumni_fields AS f
                    ON u.uid=f.uid
                  LEFT JOIN alumni_status AS sl
                    ON f.status=sl.status
                  INNER JOIN (
                    SELECT CONCAT(uid, MAX(date)) AS tag
                    FROM alumni_fields
                    GROUP BY uid
                  ) AS t
                  ON CONCAT(f.uid, f.date)=t.tag
                  WHERE f.date>"'.date("Y-m",strtotime("-2 Months")).'"
                  ORDER BY f.date DESC, f.status ASC, u.name ASC',

    'current' => 'SELECT u.uid, a.status, u.name, a.room, m.nr
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
                  WHERE (u.status=1 AND a.status IN (0,1,2,3,6))
                  ORDER BY u.name ASC',

    'corridors' => 'SELECT u.uid, a.status, u.name, a.room, m.nr
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
                    WHERE (u.status=1 AND a.status IN (0,2,3,6))
                    ORDER BY a.room ASC',

    'bike' => 'SELECT week, day, time, room, id
                FROM mcbike
                WHERE week>"'.$d_l.'"',

    'bike_book' => 'INSERT INTO mcbike (week, day, time, room)
                      VALUES ("'.date('Y-m-d 00:00:00', strtotime("+".$binfo[0]." week")).'", '.$binfo[1].', '.$binfo[3].', '.$_POST['room'].')',

    'bike_remove' => 'DELETE FROM mcbike
                        WHERE id='.$_POST['bid'],

    'front' => 'SELECT id, text
                FROM news
                WHERE id
                IN (1,2,3,5,7)',

    'food' => 'SELECT week, d1, d2, d3, d4, d5, d6, d7
                FROM kitchen_plans
                WHERE week>"'.$d_f.'"
                ORDER BY week ASC',

    'food_insert' => 'INSERT INTO kitchen_plans (week, d1, d2, d3, d4, d5, d6, d7)
                      VALUES ("'.$fweek.'", "'.$menu[0].'", "'.$menu[1].'", "'.$menu[2].'", "'.$menu[3].'", "'.$menu[4].'", "'.$menu[5].'", "'.$menu[6].'")',

    'food_update' => 'UPDATE kitchen_plans
                        SET d1="'.$menu[0].'", d2="'.$menu[1].'", d3="'.$menu[2].'", d4="'.$menu[3].'", d5="'.$menu[4].'", d6="'.$menu[5].'", d7="'.$menu[6].'"
                        WHERE week="'.$fweek.'"',

    'guides' => 'SELECT *
                FROM guides
                ORDER BY title ASC',

    'gym_book' => 'INSERT INTO gym (week, day, time, room)
                      VALUES ("'.date('Y-m-d 00:00:00', strtotime("+".$binfo[0]." week")).'", '.$binfo[1].', '.$binfo[3].', '.$_POST['room'].')',

    'gym' => 'SELECT week, day, time, room, id
              FROM gym
              WHERE week>"'.$d_l.'"',

    'gym_remove' => 'DELETE FROM gym
                        WHERE id='.$_POST['bid'],

    'history' => 'SELECT f.date,
                    u.name AS name,
                    f.room AS room,
                    f.status AS status,
                    sl.title AS title
                  FROM users AS u
                  LEFT JOIN alumni_fields AS f
                    ON u.uid=f.uid
                  LEFT JOIN alumni_status AS sl
                    ON f.status=sl.status
                  WHERE f.date>"2007"
                  ORDER BY f.status ASC, u.name ASC',

    'laundry' => 'SELECT week, day, nr, time, room, id
                  FROM laundry
                  WHERE week>"'.$d_l.'"',

    'laundry_accounting' => 'SELECT l.room AS "Vaerelse", COUNT(l.room) AS "Antal"
                            FROM laundry AS l
                            INNER JOIN (
                              SELECT a.room AS room, a.nr AS nr
                              FROM alumni_fields AS a
                              INNER JOIN (
                                SELECT room, MAX(date) AS date
                                FROM alumni_fields
                                GROUP BY room
                              ) AS g
                              ON (
                                a.room=g.room
                                AND a.date=g.date
                              )
                              GROUP BY a.room
                            ) AS n
                            ON l.room=n.room
                            WHERE week BETWEEN "'.$d_a1.'" AND "'.$d_a2.'"
                            GROUP BY l.room
                            ORDER BY l.room ASC',

    'laundry_book' => 'INSERT INTO laundry (week, day, nr, time, room)
                      VALUES ("'.date('Y-m-d 00:00:00', strtotime("+".$binfo[0]." week")).'", '.$binfo[1].', '.$binfo[2].', '.$binfo[3].', '.$_POST['room'].')',

    'laundry_remove' => 'DELETE FROM laundry
                        WHERE id='.$_POST['bid'],

    'me' => 'SELECT p.first, p.last, f.room, f.nr, u.mail, p.phone, u.pass, p.study, u.uid
            FROM users AS u
            INNER JOIN
            alumni_fields AS f
            ON u.uid=f.uid
            INNER JOIN
            alumni_profile AS p
            ON u.uid=p.uid
            WHERE f.nr='.$_POST['nr'].'
            ORDER BY f.date DESC',

    'me_mail' => 'UPDATE users
                  SET mail="'.$_POST['d'].'"
                  WHERE uid="'.$_POST['u'].'"',

    'me_pass' => 'UPDATE users
                  SET pass="'.$_POST['d'].'"
                  WHERE uid="'.$_POST['u'].'"',

    'me_phone' => 'UPDATE alumni_profile
                  SET phone="'.$_POST['d'].'"
                  WHERE uid="'.$_POST['u'].'"',

    'news' => 'SELECT i.id, i.time, i.title, i.description, i.place, i.img, i.priority, i.type, i.user, i.link
                      FROM info_news AS i
                      INNER JOIN info_news_types AS t
                      ON i.type=t.id
                      WHERE (
                        i.active=1
                        AND i.time>"'.date("Y-m-d").'"
                      )
                      ORDER BY i.time ASC',

    'news_types' => 'SELECT id, type
                            FROM info_news_types',

    'news_edit' => 'SELECT i.id, i.time, i.title, i.description, i.place, i.img, i.priority, i.type, i.user, i.link
                            FROM info_news AS i
                            WHERE i.id="'.$_POST['re'].'"
                            LIMIT 1',

    'news_update' => 'UPDATE info_news
                              SET title="'.$info["title"].'", time="'.$info["time"].'", place="'.$info["place"].'", description="'.$info["description"].'", link="'.$info["link"].'", img="'.$info["img"].'", priority="'.$info["priority"].'", type="'.$info["type"].'"
                              WHERE id="'.$info["eid"].'"',

    'news_add' => 'INSERT INTO info_news (title, time, place, description, link, img, priority, type, user)
                          VALUES ("'.$info["title"].'", "'.$info["time"].'", "'.$info["place"].'", "'.$info["description"].'", "'.$info["link"].'", "'.$info["img"].'", "'.$info["priority"].'", "'.$info["type"].'", "'.$_POST["nr"].'")',

    'news_remove' => 'UPDATE info_news
                              SET active=0
                              WHERE id="'.$_POST['id'].'"',

    'photowall' => 'SELECT u.uid, u.name, a.room, m.nr
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
                  WHERE (u.status=1 AND a.status IN (0,2,3,6))
                  ORDER BY u.name ASC',

    'plan' => 'SELECT pid, day, d1, d2, month, type
                FROM vagtplan_felter
                INNER JOIN vagtplan_sider
                  ON vagtplan_felter.pid=vagtplan_sider.id
                WHERE SUBSTRING(vagtplan_sider.month,1,7)="'.$d_p1.'"
                  OR SUBSTRING(vagtplan_sider.month,1,7)="'.$d_p2.'"',

    'plan_insert' => 'INSERT INTO info_shifts (year, month, setting)
                      VALUES ("'.$_POST['y'].'", "'.$_POST['m'].'", \''.$_POST['plan'].'\')',

    'poll_close' => 'UPDATE vote_polls
                    SET active=0
                    WHERE (
                      id="'.$_POST['p'].'"
                      AND user="'.$_POST['nr'].'"
                    )',

    'poll_close_all' => 'UPDATE vote_polls
                        SET active=0
                        WHERE active=1',

    'poll_open' => 'INSERT INTO vote_polls (user, question, active, type)
                    VALUES ("'.$_POST["nr"].'","'.$data.'","1","'.$_POST["t"].'")',

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

    'rooms' => 'SELECT id, year, month, day, room, user
                  FROM book_rooms
                  WHERE year>="'.date('Y').'"
                  AND status=true',

    'rooms_book' => 'INSERT INTO book_rooms (year, month, day, room, user)
                      VALUES ('.(date('Y')+$binfo[0]).', '.$binfo[1].', '.$binfo[2].', '.$binfo[3].', '.$_POST['room'].')',

    'rooms_remove' => 'UPDATE book_rooms
                        SET status=0
                        WHERE id='.$_POST['bid'],

    'rooms_taken' => 'SELECT date
                      FROM party
                      WHERE date>"'.date('Y').'"',

    'speaker' => 'SELECT id, year, month, day, user
                  FROM book_speaker
                  WHERE year>="'.date('Y').'"
                  AND status=true',

    'speaker_book' => 'INSERT INTO book_speaker (year, month, day, user)
                      VALUES ('.(date('Y')+$binfo[0]).', '.$binfo[1].', '.$binfo[2].', '.$_POST['room'].')',

    'speaker_remove' => 'UPDATE book_speaker
                        SET status=0
                        WHERE id='.$_POST['bid'],

    'stem' => 'SELECT id, question, user, type
              FROM vote_polls
              WHERE active=1',

    'stem_pid' => 'SELECT id
                  FROM vote_polls
                  WHERE (
                    user="'.$_POST['nr'].'"
                    AND active=1
                  )
                  ORDER BY id DESC
                  LIMIT 1',



    'a_alumner' => 'SELECT u.uid AS uid,
                      u.name AS name,
                      f.nr AS nr,
                      f.room AS room
                    FROM users AS u
                    LEFT JOIN users_roles AS r
                      ON u.uid=r.uid
                    LEFT JOIN alumni_fields AS f
                      ON u.uid=f.uid
                    INNER JOIN (
                      SELECT CONCAT(uid, MAX(date)) AS tag
                      FROM alumni_fields
                      GROUP BY uid
                    ) AS t
                    ON CONCAT(f.uid, f.date)=t.tag
                    WHERE (
                      f.status IN (0,1,2,3,6)
                      AND r.rid=12
                    )
                    GROUP BY u.uid
                    ORDER BY u.name ASC',

    'a_alumner_fetch' => 'SELECT r.uid AS uid,
                      /*u.name AS name,*/
                      u.pass AS pass,
                      f.nr AS nr,
                      f.room AS room,
                      f.status AS status,
                      sl.title AS title,
                      p.sex AS sex,
                      /*r.rid AS rid,
                      rl.name AS role,*/
                      p.study AS study,
                      u.mail AS mail,
                      p.phone AS phone,
                      /*f.date AS date,*/
                      p.first AS first,
                      p.last AS last
                    FROM users AS u
                    LEFT JOIN users_roles AS r
                      ON u.uid=r.uid
                    INNER JOIN role AS rl
                      ON r.rid=rl.rid
                    LEFT JOIN alumni_profile AS p
                      ON u.uid=p.uid
                    LEFT JOIN alumni_fields AS f
                      ON u.uid=f.uid
                    LEFT JOIN alumni_status AS sl
                      ON f.status=sl.status
                    INNER JOIN (
                      SELECT CONCAT(uid, MAX(date)) AS tag
                      FROM alumni_fields
                      GROUP BY uid
                    ) AS t
                    ON CONCAT(f.uid, f.date)=t.tag
                    WHERE (
                      f.status IN (0,1,2,3,6)
                      AND r.rid=12
                      AND r.uid="'.$_POST['u'].'"
                    )
                    GROUP BY r.uid
                    ORDER BY p.first ASC',

    'a_alumner_insert' => '',

    'a_alumner_update' => '',

    'a_front' => 'SELECT *
                  FROM news',

    'a_lists' => '',

    /*'a_lists_fetch' => 'SELECT f.date, '.$lists_data->options.'
                  FROM users AS u
                  LEFT JOIN alumni_fields AS f
                    ON u.uid=f.uid
                  LEFT JOIN alumni_status AS sl
                    ON f.status=sl.status
                  '.$lists_data->restrict.'
                  WHERE (
                    f.date>"'.$lists_data->start.'"
                    AND f.date<"'.$lists_data->end.'"
                  )
                  ORDER BY '.$lists_data->sort,*/

    'a_lists_fetch' => 'SELECT r.uid AS uid,
                          f.date AS date,
                          '.$lists_data->options.'
                        FROM users AS u
                        LEFT JOIN users_roles AS r
                          ON u.uid=r.uid
                        INNER JOIN role AS rl
                          ON r.rid=rl.rid
                        LEFT JOIN alumni_profile AS p
                          ON u.uid=p.uid
                        LEFT JOIN alumni_fields AS f
                          ON u.uid=f.uid
                        LEFT JOIN alumni_status AS sl
                          ON f.status=sl.status
                        '.$lists_data->restrict.'
                        WHERE (
                          f.date>"'.$lists_data->start.'"
                          AND f.date<"'.$lists_data->end.'"
                        )
                        ORDER BY '.$lists_data->sort,

    'a_madplan' => 'SELECT *
                    FROM kitchen_plans
                    WHERE week>"'.$d_f.'"',

    'a_vagtplan' => 'SELECT s.year, s.month, s.setting
                    FROM info_shifts AS s
                    INNER JOIN (
                      SELECT MAX(id) AS id
                      FROM info_shifts
                      GROUP BY CONCAT(year,month)
                    ) AS m
                    ON s.id=m.id
                    WHERE (
                      s.year="'.$vp_y.'"
                      AND s.month="'.$vp_m.'"
                    )',


    'logud' => '',
    'login' => '',
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

  $specialklassen = ['food_insert','food_update','news_add','news_update'];
  if (in_array($_POST['page'], $specialklassen)) { $conn->set_charset("utf8"); }
  $sql = $pages[$_POST['page']];

  // INFO: CHECK QUERY TYPE
  if ($sql == "") {

    $package = ["", in_array($_POST['nr'], $admins)];
    echo(json_encode($package));

  } else if (substr($sql,0,6) == 'SELECT') {

    $result = $conn->query($sql);
    $data = array();
    while($row = mysqli_fetch_array($result)){ $data[] = $row; }

    if ($_POST['page'] == 'news_edit') {
      $sql = $pages['news_types'];
      $result = $conn->query($sql);
      $data['t'] = array();
      while($row = mysqli_fetch_array($result)){ $data['t'][] = $row; }
    }

    $package = [$data, in_array($_POST['nr'], $admins)];

    // INFO: UTF8 ENCODE ARRAY
    require 'utf8_encoder.php';
    utf8_encode_deep($package);
    echo(json_encode($package));

  } else if (substr($sql,0,6) == 'UPDATE' || substr($sql,0,6) == 'DELETE' || substr($sql,0,6) == 'INSERT') {

    if ($_POST['page'] == 'poll_close_all' && !in_array($_POST['nr'], $admins)) {

      echo('failed');

    } else if ($_POST['page'] == 'poll_open') {

      $sql = $pages['stem_pid'];
      $result = $conn->query($sql);
      $data = array();
      while($row = mysqli_fetch_array($result)){ $data[] = $row; }
      echo($data[0]);

    } else {

      $conn->query($sql);
      echo('success');

    }

  }

  // INFO: CLOSING CONNECTION
  $conn->close();

?>
