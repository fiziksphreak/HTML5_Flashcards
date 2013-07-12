<?php
	$con = mysqli_connect('localhost', 'fiziksph_admin', 'x9Gc662wCKa7', 'fiziksph_flashcards');
	if (!$con)
	{
		die('Could not connect: ' . mysqli_error());
	}

	$sql = "SELECT DISTINCT class FROM deck";

	$result = mysqli_query($con, $sql);

	$table = array();
	while($row = mysqli_fetch_assoc($result))
	{
		$table[] = $row;
	}

	echo json_encode($table);

	mysqli_free_result($result);
	mysqli_close($con);
?>