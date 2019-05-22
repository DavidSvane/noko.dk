<?php

// INFO: NEEDED FOR PHONEGAP FRAMEWORK7
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');


// INFO: MEDOO LIGHTWEIGHT PHP DATABASE FRAMEWORK
// https://medoo.in/
require 'Medoo.php';
use Medoo\Medoo;


// INFO: DEEP UTF8 ENCODING OF ARRAYS OBJECTS AND STRING
require 'utf8_encoder.php';


// INFO: DATABASE SETUP SPECIFIC FOR EACH PROJECT
$db = New Medoo([
	'database_type' => 'mysql',
	'database_name' => 'noko_intranet',
	'server' => 'mysql5.gigahost.dk',
	'username' => 'noko',
	'password' => '7@aahWhd3#^Wy8YF'
]);


// INFO: PROJECT SPECIFIC SQL STATEMENTS
function getImgSrc($id) {

	global $db;
	$data = $db->select('noko_dk_img', 'img_src', ['img_id' => $id]);
	return $data[0];

}
function updateImgSrc() {

	global $db;
	$db->update('noko_dk_img', ['img_src' => base64_decode($_POST['src'])], ['img_id' => $_POST['id']]);

}

function getFoods() {

	global $db;
	$min_week = new DateTime();
	$min_week->setISODate(date('Y'),date('W')-1,5);
	$min_week = $min_week->format('Y-m-d');

	$data = $db->select('kitchen_plans', ['d1','d2','d3','d4','d5','d6','d7'], ["week[>]" => $min_week, "ORDER" => ["week" => 'ASC']]);

	utf8_encode_deep($data);
	return $data;

}

function getPageText($l, $id) {

	global $db;
	$data = $db->select('noko_dk_text', 'text', ['text_id' => $id, 'text_lang' => $l]);
	return utf8_encode($data[0]);

}
function updatePageText() {

	global $db;
	$db->update('noko_dk_text', ['text' => base64_decode($_POST['text'])], ['text_id' => $_POST['id'], 'text_lang' => $_POST['l']]);

}

if (isset($_POST['update_content'])) {
	switch ($_POST['update_content']) {
		case 'img': updateImgSrc(); break;
		case 'text': updatePageText(); break;
		default: echo($_POST['update_content']);
	}
}

?>
