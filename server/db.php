<?php

  // INFO: NEEDED IN SOME CASES LIKE FRAMEWORK7
  // header('Content-type: application/json');
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: text/html; charset=utf-8');



  // INFO: LISTS OF USER nr WITH SPECIAL ACCESS
  $admins = [4202,'admin','kontor','Køkkenet'];
  $ansvar = [4202,'admin',4249,2027,'kontor'];

  $blocked = ['news_add'];
  $a_pages = ['food_insert',
    'food_update',
    'a_madfavs',
    'a_alumner',
    'a_alumner_deactivate',
    'a_alumner_fetch',
    'a_alumner_insert',
    'a_alumner_update',
    'a_lists_fetch',
    'a_madplan',
    'a_pass',
    'a_vagtplan',
    'plan_insert',
    'laundry_accounting',
    'a_laundry',
    'a_lists'];
  $r_pages = ['r_apart',
    'r_cal',
    'r_groups',
    'r_posts'];

  if ( (in_array($_POST['page'], $a_pages) && !in_array($_POST['nr'], $admins))
    || (in_array($_POST['page'], $r_pages) && !in_array($_POST['nr'], $ansvar))
    || (in_array($_POST['page'], $blocked) && in_array($_POST['nr'], $blocked))
  ) { die("User access denied"); }


  // INFO: REUSABLE MODULES
  function wrapData($output, $mb=false, $utf=true, $json=true) {

    global $admins, $ansvar;
    require 'utf8_encoder.php';

    $output = [
      $output,
      in_array($_POST['nr'], $admins),
      in_array($_POST['nr'], $ansvar)
    ];

    if ($mb) $output[0] = mb_convert_encoding($output[0], 'UTF-8', 'ISO-8859-1');
    if ($utf) utf8_encode_deep($output);
    if ($json) $output = json_encode($output);

    return $output;

  }
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


  // INFO: PAGES LOADING LIST OF FILES INSTEAD OF REGULAR DB CONTENT
  if ($_POST['page'] == 'summaries' || $_POST['page'] == 'files') {

    $page = $_POST['page'] == 'summaries' ? 'plenum' : $_POST['page'];
    $files = scandir('../'.$page);
    echo(wrapData($files,true,false,true));
    die();

  }



  // INFO: VARIABLES AND SERVER SETUP
  $data = array();
  $servername = "mysql5.gigahost.dk";
  $username = "noko";
  $password = "7@aahWhd3#^Wy8YF";
  $dbname = "noko_intranet";

  $conn = new mysqli($servername, $username, $password, $dbname);
  if ($conn->connect_error) { die("Connection failed: " . $conn->connect_error); }

  $specialklassen = ['food_insert','food_update','news_add','news_update','poll_open','a_alumner_insert','a_alumner_update','r_apart_update','r_cal_add','r_groups_add','r_posts_add'];
  if (in_array($_POST['page'], $specialklassen)) { $conn->set_charset("utf8"); }

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



  // INFO: SETTING DATE VARIABLES
  $date = new DateTime();
  $d_f = $date->setISODate(date('Y'),date('W')-2,4)->format('Y-m-d'); // FOOD (THURSDAY LAST WEEK)
  $d_l = $date->setISODate(date('Y'),date('W')-1,7)->format('Y-m-d 23:59:59'); // LAUNDRY (1S TO MIDNIGHT LAST WEEK)
  $d_p1 = date('Y').'-'.substr('00'.date('n'),-2); // PLAN (CURRENT MONTH)
  $d_p2 = date('Y').'-'.substr('00'.(date('n')+1),-2); // PLAN (NEXT MONTH)
  if (isset($_POST['year']) && isset($_POST['week'])) {
    $d_a1 = $date->setISODate($_POST['year'],$_POST['week']-1,7)->format('Y-m-d 23:59:59'); // LAUNDRY ACCOUNTING (START)
    $d_a2 = $date->setISODate($_POST['year'],$_POST['week'],7)->format('Y-m-d 23:59:59'); // LAUNDRY ACCOUNTING (END)
  }



  // INFO:  PACE SPECIFIC VARIABLE SETUP
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
  if ($_POST['page'] == 'a_vagtplan' && !isset($_POST['y'])) {
    $vp_y = date('Y');
    $vp_m = date('n');
  } else if ($_POST['page'] == 'a_vagtplan') {
    $vp_y = $_POST['y'];
    $vp_m = $_POST['m'];
  }
  if ($_POST['page'] == 'poll_open') { $poll_data = urldecode($_POST['q']); }
  if ($_POST['page'] == 'a_lists_fetch') {
    $lists_data = json_decode($_POST['p']);
    if ($lists_data->restrict) {
      $lists_data->restrict = 'AND active=1';
    } else {
      $lists_data->restrict = null;
    }
  }
  if ($_POST['page'] == 'a_alumner_insert' || $_POST['page'] == 'a_alumner_update') { $info = json_decode(urldecode($_POST['inf']), true); }



  // INFO: SQL STATEMTNS FOR PAGES (REMEMBER TO ADD admin AND ansvar PAGE TITLES TO RELEVANT ARRAYS IN THE TOP OF THE DOCUMENT)
  $pages = array(

    // INFO: UNCATEGORIZED PAGE FUNCTIONS (updated)
    'cal' => 'SELECT date, name, who
              FROM info_cal
              WHERE (
                active=1
                AND SUBSTRING(date,1,4)="'.date('Y').'"
              )
              ORDER BY date ASC',
    'food' => 'SELECT week, d1, d2, d3, d4, d5, d6, d7
                FROM info_menu
                WHERE week>"'.$d_f.'"
                ORDER BY week DESC',
    'food_favs' => 'SELECT week, day
                    FROM user_favorite_food
                    WHERE user="'.$_POST['nr'].'"
                    ORDER BY time DESC
                    LIMIT 25',
    'food_fav_add' => 'INSERT INTO user_favorite_food (user, week, day)
                      VALUES ("'.$_POST['nr'].'","'.$_POST['w'].'","'.$_POST['d'].'")',
    'food_fav_remove' => 'DELETE FROM user_favorite_food
                          WHERE (
                            user="'.$_POST['nr'].'"
                            AND week="'.$_POST['w'].'"
                            AND day="'.$_POST['d'].'"
                          )',
    'groups' => 'SELECT *
                FROM plenum_groups
                WHERE active=1
                ORDER BY title ASC',
    'guides' => 'SELECT *
                FROM guides
                ORDER BY title ASC',
    'me' => 'SELECT first, last, room, nr, mail, phone, pass, study, uid
            FROM user
            WHERE nr='.$_POST['nr'].'
            ORDER BY date DESC',
    'me_mail' => 'UPDATE user
                  SET mail="'.$_POST['d'].'"
                  WHERE uid="'.$_POST['u'].'"',
    'me_pass' => 'UPDATE user
                  SET pass="'.$_POST['d'].'"
                  WHERE uid="'.$_POST['u'].'"',
    'me_phone' => 'UPDATE user
                  SET phone="'.$_POST['d'].'"
                  WHERE uid="'.$_POST['u'].'"',
    'plan' => 'SELECT year, month
              FROM info_shifts
              WHERE (
                year>="'.date('Y').'"
                AND month>="'.date('n').'"
              )
              GROUP BY CONCAT(year,month)
              ORDER BY year ASC, month ASC',
    'posts' => 'SELECT *
                FROM plenum_posts
                WHERE active=1
                ORDER BY title ASC',


    // INFO: FUNCTIONS FOR THE FRONT PAGE EVENTS (update not needed)
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
                      SET title="'.$info["title"].'", time="'.$info["time"].'", place="'.$info["place"].'", description="'.$info["description"].'",
                        link="'.$info["link"].'", img="'.$info["img"].'", priority="'.$info["priority"].'", type="'.$info["type"].'"
                      WHERE id="'.$info["eid"].'"',
    'news_add' => 'INSERT INTO info_news (title, time, place, description, link, img, priority, type, user)
                  VALUES ("'.$info["title"].'", "'.$info["time"].'", "'.$info["place"].'", "'.$info["description"].'", "'.$info["link"].'", "'.$info["img"].'", "'.$info["priority"].'", "'.$info["type"].'", "'.$_POST["nr"].'")',
    'news_remove' => 'UPDATE info_news
                      SET active=0
                      WHERE id="'.$_POST['id'].'"',


    // INFO: FUNCTIONS FOR THE VOTING SYSTEM (update not needed)
    'poll_close' => 'UPDATE vote_polls
                    SET active=0
                    WHERE (
                      id="'.$_POST['p'].'"
                      AND user="'.$_POST['nr'].'"
                    )',
    'poll_close_all' => 'UPDATE vote_polls
                        SET active=0
                        WHERE (
                          user="'.$_POST["nr"].'"
                          AND active=1
                        )',
    'poll_open' => 'INSERT INTO vote_polls (user, active, type, question)
                    VALUES ("'.$_POST["nr"].'","1","'.$_POST["t"].'",\''.$poll_data.'\')',
    'poll_reopen' => 'SELECT *
                      FROM vote_polls
                      WHERE id="'.$_POST['id'].'"',
    'poll_result' => 'SELECT type, vote, question
                      FROM vote_votes AS v
                      INNER JOIN vote_polls AS p
                        ON v.vid=p.id
                      WHERE vid="'.$_POST['id'].'"',
    'poll_check' => 'SELECT *
                    FROM vote_voters
                    WHERE (
                      vid="'.$_POST['id'].'"
                      AND nr="'.$_POST['nr'].'"
                    )',
    'poll_register' => 'INSERT INTO vote_voters (vid, nr)
                        VALUES ("'.$_POST['id'].'","'.$_POST['nr'].'")',
    'poll_vote' => 'INSERT INTO vote_votes (vid, vote)
                    VALUES ("'.$_POST['id'].'",\''.$_POST['v'].'\')',
    'stem' => 'SELECT id, question, user, type
              FROM vote_polls
              WHERE active=1
              ORDER BY id DESC',
    'stem_all' => 'SELECT id, question, type
              FROM vote_polls
              WHERE user="'.$_POST['nr'].'"
              ORDER BY id DESC',
    'stem_pid' => 'SELECT id
                  FROM vote_polls
                  WHERE (
                    user="'.$_POST['nr'].'"
                    AND active=1
                  )
                  ORDER BY id DESC
                  LIMIT 1',


    // INFO: FUNCTIONS FOR THE ALUMNI PAGES (updated)
    'alumne_fetch' => 'SELECT first, last, nr, room, status, study, mail, phone, date
                      FROM user
                      WHERE uid="'.$_POST['u'].'"
                      ORDER BY date ASC',
    'changes' => 'SELECT date, first, last, room, status
                  FROM user
                  WHERE date>"'.date("Y-m",strtotime("-2 Months")).'"
                  ORDER BY date DESC, status ASC, first ASC',
    'current' => 'SELECT uid, status, first, last, room, nr
                  FROM user
                  WHERE (active=1 AND status IN (0,1,2,3,6))
                  ORDER BY first ASC',
    'corridors' => 'SELECT uid, status, first, last, room, nr
                    FROM user
                    WHERE (active=1 AND status IN (0,2,3,6))
                    ORDER BY CHAR_LENGTH(room) ASC, room ASC',
    'corridors_aparts' => 'SELECT *
                          FROM user_aparts',
    'history' => 'SELECT h.date, u.first, u.last, h.room, h.status
                  FROM user AS u
                  INNER JOIN user_history AS h
                    ON u.uid=h.uid
                  WHERE h.date>"2007"
                  ORDER BY h.status ASC, u.first ASC',
    'photowall' => 'SELECT uid, first, last, room, nr
                  FROM user
                  WHERE (active=1 AND status IN (0,2,3,6))
                  ORDER BY first ASC',
    'previous' => 'SELECT first, last, room, mail, date
                  FROM user
                  WHERE (active=0 AND date>"2000")
                  ORDER BY first ASC',


    // INFO: FUNCTIONS FOR THE BOOKING SYSTEMS (updated)
    'bike' => 'SELECT week, day, time, user, id
                FROM book_bike
                WHERE week>"'.$d_l.'"',
    'bike_book' => 'INSERT INTO book_bike (week, day, time, user)
                      VALUES ("'.date('Y-m-d 00:00:00', strtotime("+".$binfo[0]." week")).'", '.$binfo[1].', '.$binfo[3].', '.$_POST['room'].')',
    'bike_remove' => 'DELETE FROM book_bike
                      WHERE id='.$_POST['bid'],
    'gym' => 'SELECT week, day, time, user, id
              FROM book_gym
              WHERE week>"'.$d_l.'"',
    'gym_book' => 'INSERT INTO book_gym (week, day, time, user)
                  VALUES ("'.date('Y-m-d 00:00:00', strtotime("+".$binfo[0]." week")).'", '.$binfo[1].', '.$binfo[3].', '.$_POST['room'].')',
    'gym_remove' => 'DELETE FROM book_gym
                    WHERE id='.$_POST['bid'],
    'laundry' => 'SELECT week, day, nr, time, user, id
                  FROM book_laundry
                  WHERE week>"'.$d_l.'"',
    'laundry_book' => 'INSERT INTO book_laundry (week, day, nr, time, user)
                      VALUES ("'.date('Y-m-d H:i:s', strtotime("+".$binfo[0]." week")).'", '.$binfo[1].', '.$binfo[2].', '.$binfo[3].', '.$_POST['room'].')',
    'laundry_check' => 'SELECT id
                        FROM book_laundry
                        WHERE (
                          week>="'.date('Y-m-d 23:59:59', strtotime("+".$binfo[0]." week", strtotime("sunday last week"))).'"
                          AND week<"'.date('Y-m-d', strtotime("+".($binfo[0]+1)." week", strtotime("monday this week"))).'"
                          AND day='.$binfo[1].'
                          AND nr='.$binfo[2].'
                          AND time='.$binfo[3].'
                        )',
    'laundry_remove' => 'DELETE FROM book_laundry
                        WHERE id='.$_POST['bid'],
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


    // INFO: FUNCTIONS FOR THE ANSVAR PAGES (update not needed)
    'r_apart' => 'SELECT *
                  FROM user_aparts',
    'r_apart_update' => 'UPDATE user_aparts
                        SET who = CASE
                          WHEN which="LSS" THEN "'.urldecode($_POST["lss"]).'"
                          WHEN which="L2N" THEN "'.urldecode($_POST["l2n"]).'"
                          WHEN which="L5N" THEN "'.urldecode($_POST["l5n"]).'"
                          END, liable="'.$_POST['nr'].'"',
    'r_cal' => 'SELECT *
                FROM info_cal
                WHERE (
                  active=1
                  AND date>"'.date('Y').'"
                )
                ORDER BY date ASC',
    'r_cal_remove' => 'UPDATE info_cal
                      SET active=0
                      WHERE id="'.$_POST["e"].'"',
    'r_cal_add' => 'INSERT INTO info_cal (name, date, who)
                    VALUES ("'.$_POST['n'].'", "'.$_POST['d'].'", "'.$_POST['w'].'")',
    'r_groups' => 'SELECT *
                  FROM plenum_groups
                  WHERE active=1
                  ORDER BY title ASC',
    'r_groups_remove' => 'UPDATE plenum_groups
                          SET active=0
                          WHERE id="'.$_POST["e"].'"',
    'r_groups_add' => 'INSERT INTO plenum_groups (title, description, leader, liable)
                      VALUES ("'.$_POST['t'].'", "'.$_POST['d'].'", "'.$_POST['le'].'", "'.$_POST['li'].'")',
    'r_posts' => 'SELECT *
                  FROM plenum_posts
                  WHERE active=1
                  ORDER BY title ASC',
    'r_posts_remove' => 'UPDATE plenum_posts
                          SET active=0
                          WHERE id="'.$_POST["e"].'"',
    'r_posts_add' => 'INSERT INTO plenum_posts (title, description, who, liable)
                      VALUES ("'.$_POST['t'].'", "'.$_POST['d'].'", "'.$_POST['w'].'", "'.$_POST['l'].'")',


    // INFO: FUNCTIONS FOR THE ADMIN PAGES (updated)
    'food_insert' => 'INSERT INTO info_menu (week, d1, d2, d3, d4, d5, d6, d7)
                      VALUES ("'.$fweek.'", "'.$menu[0].'", "'.$menu[1].'", "'.$menu[2].'", "'.$menu[3].'", "'.$menu[4].'", "'.$menu[5].'", "'.$menu[6].'")',
    'food_update' => 'UPDATE info_menu
                      SET d1="'.$menu[0].'", d2="'.$menu[1].'", d3="'.$menu[2].'", d4="'.$menu[3].'", d5="'.$menu[4].'", d6="'.$menu[5].'", d7="'.$menu[6].'"
                      WHERE week="'.$fweek.'"',
    'a_madfavs' => 'SELECT *
                    FROM user_favorite_food',
    'a_alumner' => 'SELECT uid, first, last, room
                    FROM user
                    WHERE (
                      active=1
                      AND status in (0,1,2,3,6)
                    )
                    ORDER BY first ASC',
    'a_alumner_deactivate' => 'UPDATE user
                              SET active=0
                              WHERE uid="'.$_POST['u'].'"',
    'a_alumner_fetch' => 'SELECT *
                          FROM user
                          WHERE uid="'.$_POST['u'].'"',
    'a_alumner_insert' => 'INSERT INTO user (pass, first, last, nr, room, mail, phone, status, sex, study)
                          VALUES ("'.$info["pass"].'", "'.$info["first"].'", "'.$info["last"].'", "'.$info["nr"].'", "'.$info["room"].'",
                            "'.$info["mail"].'", "'.$info["phone"].'", "'.$info["status"].'", "'.$info["sex"].'", "'.$info["study"].'")',
    'a_alumner_update' => 'UPDATE user
                          SET pass="'.$info["pass"].'", first="'.$info["first"].'", last="'.$info["last"].'", nr="'.$info["nr"].'", room="'.$info["room"].'",
                            mail="'.$info["mail"].'", phone="'.$info["phone"].'", status="'.$info["status"].'", sex="'.$info["sex"].'", study="'.$info["study"].'"
                          WHERE uid="'.$_POST['u'].'"',
    'a_lists_fetch' => 'SELECT uid, date,
                          '.$lists_data->options.'
                        FROM user
                        WHERE (
                          date>"'.$lists_data->start.'"
                          AND date<"'.$lists_data->end.'"
                          '.$lists_data->restrict.'
                        )
                        ORDER BY '.$lists_data->sort,
    'a_madplan' => 'SELECT *
                    FROM info_menu
                    WHERE week>"'.$d_f.'"',
    'a_pass' => 'SELECT *
                FROM admin_pass',
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
    'plan_insert' => 'INSERT INTO info_shifts (year, month, setting)
                      VALUES ("'.$_POST['y'].'", "'.$_POST['m'].'", \''.$_POST['plan'].'\')',
    'laundry_accounting' => 'SELECT user AS "Vaerelse", COUNT(user) AS "Antal"
                            FROM book_laundry
                            WHERE week
                              BETWEEN "'.$d_a1.'" AND "'.$d_a2.'"
                            GROUP BY user
                            ORDER BY CHAR_LENGTH(Vaerelse) ASC, Vaerelse ASC',


    // INFO: BACKUP OF OLD DATABASE QUERIES (before update)
    /*
    'BU_a_alumner' => 'SELECT u.uid AS uid,
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
    'BU_a_alumner_fetch' => 'SELECT r.uid AS uid,
                      u.pass AS pass,
                      f.nr AS nr,
                      f.room AS room,
                      f.status AS status,
                      sl.title AS title,
                      p.sex AS sex,
                      p.study AS study,
                      u.mail AS mail,
                      p.phone AS phone,
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
    'BU_a_alumner_insert' => '',
    'BU_a_alumner_update' => '',
    'BU_laundry_accounting' => 'SELECT l.room AS "Vaerelse", COUNT(l.room) AS "Antal"
                            FROM book_laundry AS l
                            WHERE week BETWEEN "'.$d_a1.'" AND "'.$d_a2.'"
                            GROUP BY l.room
                            ORDER BY l.room ASC',
    'BU_alumne_fetch' => 'SELECT u.name AS name,
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
    'BU_changes' => 'SELECT f.date,
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
    'BU_current' => 'SELECT u.uid, a.status, u.name, a.room, m.nr
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
    'BU_corridors' => 'SELECT u.uid, a.status, u.name, a.room, m.nr
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
    'BU_history' => 'SELECT f.date,
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
    'BU_photowall' => 'SELECT u.uid, u.name, a.room, m.nr
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
    'BU_previous' => 'SELECT u.name, a.room, u.mail, a.date
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
    'BU_plan' => 'SELECT pid, day, d1, d2, month, type
                FROM vagtplan_felter
                INNER JOIN vagtplan_sider
                  ON vagtplan_felter.pid=vagtplan_sider.id
                WHERE SUBSTRING(vagtplan_sider.month,1,7)="'.$d_p1.'"
                  OR SUBSTRING(vagtplan_sider.month,1,7)="'.$d_p2.'"',
    */


    'front' => '',
    'a_laundry' => '',
    'a_lists' => '',
    'logud' => '',
    'login' => '',
  );
  $sql = $pages[$_POST['page']];



  // INFO: QUERY LOGIC AND SPECIAL CASES
  if ($sql == "") {

    echo(wrapData(""));

  } else if (substr($sql,0,6) == 'SELECT') {

    runQuery($_POST['page']);
    if ($_POST['page'] == 'news_edit') { runQuery('news_edit', true, "t"); }

    echo(wrapData($data));

  } else if (substr($sql,0,6) == 'UPDATE' || substr($sql,0,6) == 'DELETE' || substr($sql,0,6) == 'INSERT') {

    if ($_POST['page'] == 'poll_close_all' && !in_array($_POST['nr'], $admins)) {

      echo('failed');

    } else if ($_POST['page'] == 'poll_open') {

      runQuery('poll_open', false);
      runQuery('stem_pid');
      echo($data[0]["id"]);

    } else if ($_POST['page'] == 'laundry_book') {

      runQuery('laundry_check');
      if (sizeof($data) == 0) { runQuery('laundry_book', false); }

    } else if ($_POST['page'] == 'poll_vote') {

      runQuery('poll_check');
      if (sizeof($data) == 0) {
        runQuery('poll_register', false);
        runQuery('poll_vote', false);
      }

    } else {

      runQuery($_POST['page'], false);
      echo('success');

    }

  }

  // INFO: CLOSING CONNECTION
  $conn->close();

?>
