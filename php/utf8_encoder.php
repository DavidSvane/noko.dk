<?php

// INFO: CONVERTING STRING OBJECTS ARRAYS TO UTF8
// http://php.net/manual/en/function.utf8-encode.php#109965

function utf8_encode_deep(&$input) {

	if (is_string($input)) {

		// STRING ENCODED AS UTF8
		$input = utf8_encode($input);

	} else if (is_array($input)) {

		// RECURSIVELY CALL ITSELF IF TYPE IS ARRAY
		foreach ($input as &$value) {
			utf8_encode_deep($value);
		}
		unset($value);

	} else if (is_object($input)) {

		// RECURSIVELY CALL ITSELF WITH OBJECT KEYS
		$vars = array_keys(get_object_vars($input));
		foreach ($vars as $var) {
			utf8_encode_deep($input->$var);
		}

	}

}

?>
