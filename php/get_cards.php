<?php
	$con = mysqli_connect('localhost', 'fiziksph_admin', 'x9Gc662wCKa7', 'fiziksph_flashcards');
	if (!$con)
	{
		die('Could not connect: ' . mysqli_error());
	}
	
	// if (empty($_POST))
	// {
		// echo "post is empty";
	// }
	// else {
		// echo "Post value is " . $_POST['name'] . "<br />";
	// }

	// echo "testing php post";
	$sql = "SELECT front_text, back_text FROM deck WHERE name = '" . $_POST['name'] . "'";

	$result = mysqli_query($con, $sql);

	$table = array();
	while($row = mysqli_fetch_assoc($result))
	{
		$table[] = $row;
		// echo $row['front_text'] . "<br />";
	}

	echo json_encode($table);
	// echo "done";

	mysqli_free_result($result);
	mysqli_close($con);
?>