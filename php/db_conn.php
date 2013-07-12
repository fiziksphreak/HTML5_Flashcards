<?php
$q=$_GET["q"];

$con = mysqli_connect('localhost', 'fiziksph_admin', 'x9Gc662wCKa7', 'fiziksph_flashcards');
if (!$con)
  {
  die('Could not connect: ' . mysqli_error());
  }

//mysqli_select_db("fiziksph_flashcards", $con);

/*$sql="SELECT * FROM user WHERE id = '".$q."'";*/
$sql = "SELECT * FROM deck WHERE name='test'";

$result = mysqli_query($con, $sql);

// echo "<table border='1'>
// <tr>
// <th>Deck Name</th>
// <th>index</th>
// <th>front</th>
// <th>back</th>
// </tr>";
// 
// while($row = mysql_fetch_array($result))
  // {
  // echo "<tr>";
  // echo "<td>" . $row['name'] . "</td>";
  // echo "<td>" . $row['index'] . "</td>";
  // echo "<td>" . $row['front_text'] . "</td>";
  // echo "<td>" . $row['back_text'] . "</td>";
  // echo "</tr>";
  // }
// echo "</table>";
session_start();
$table = array();
//$row = mysqli_fetch_array($result);
//$table = mysqli_fetch_all($result, MYSQLI_ASSOC);
while($row = mysqli_fetch_assoc($result))
{
	$table[] = $row;
}

// echo $row['front_text'];
// $bvar = $row['back_text'];
// echo $bvar;
$_SESSION['backvar'] = json_encode($table);
echo "Loaded";

mysqli_free_result($result);
mysqli_close($con);
?>
