<?php

  // INFO: NEEDED IN SOME CASES LIKE FRAMEWORK7
  // header('Content-type: application/json');
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: text/html; charset=utf-8');

  $file_dir = "alumner/";
  $file_type = strtolower(pathinfo($file_dir . basename($_FILES["new_image"]["name"]), PATHINFO_EXTENSION));
  $file_name = $file_dir . $_GET['nr'] . "." . $file_type;


  /* INFO: CHECK IF THE FILE IS AN IMAGE */
  $check = getimagesize($_FILES["new_image"]["tmp_name"]);
  if ($check === false) {
    echo("File is not an image");
    die();
  }


  /* INFO: CHECK IF FILE SIZE IS MORE THAN 4 Mb */
  if ($_FILES["new_image"]["size"] > 3000000) {
    echo("File size is too big");
    die();
  }


  /* INFO: CHECK IF THE FILE IS A JPG */
  if($file_type != "jpg") {
    echo("File is not a JPG image");
    die();
  }


  /* INFO: REMOVE EXISTING FILES WITH THE SAME NAME */
  if (file_exists($target_file)) {
    unlink($target_file);
  }


  /* INFO: UPLOAD FILE IF SCRIPT HAS NOT DIED */
  if (move_uploaded_file($_FILES["new_image"]["tmp_name"], $file_name)) {
    echo("success");
  } else {
    echo("File did not get uploaded");
  }

?>
