<?php
$servername = "localhost";
// change to your username and password
$username = "srj";
$password = "whateves";

// create connection
$connection = new mysqli($servername, $username, $password);

// check connection
if ($connection->connect_error) {
    die("Connection Failed" . $connection->connect_error);
}

echo "Connected successfully";

// the connection is closed when script ends, to do it manually
// at any point in the code, use
$connection->close()
