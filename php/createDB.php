<?php
$servername = "localhost";
$username = "srj";
$password = "yourownpassword";

$connection = new mysqli($servername, $username, $password);

if ($connection->connect_error) {
    die("Connection failed" . $connection->connect_error);
}

$sql = "CREATE DATABASE test";

if ($connection->query($sql) === TRUE) {
    echo "Database created successfully";
} else {
    echo "DATAbase creation failed" . $connection->error;
}

$connection->close();
