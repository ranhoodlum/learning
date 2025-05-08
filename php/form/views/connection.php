<?php
// connect to mysql
$servername = "localhost";
$dbusername = "srj";
$dbpassword = "onepiece";
$db = "test";

$connection = mysqli_connect($servername, $dbusername, $dbpassword, $db);
if ($connection->error) {
    die("Connection failed $connection->connect_error");
}

?>
