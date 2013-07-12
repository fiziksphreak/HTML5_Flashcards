<?php
	$con = mysqli_connect('localhost', 'fiziksph_admin', 'x9Gc662wCKa7', 'fiziksph_flashcards');
	if (!$con)
	{
		die('Could not connect: ' . mysqli_error());
	}
	
	$sql="INSERT INTO deck (name, front_text, back_text, image, front_audio, back_audio)
	VALUES ('$_POST[deckname]','$_POST[front]','$_POST[back]','$_POST[image]','$_POST[audio_front]','$_POST[audio_back]')";

	if (!mysqli_query($con,$sql))
	{
		die('Error: ' . mysqli_error($con));
	}
	echo "1 record added";

	mysqli_close($con);
?>