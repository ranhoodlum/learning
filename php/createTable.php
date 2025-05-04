<?php
$servername = "localhost";
$username = "srj";
$password = "yourownpassword";
$dbname = "test";

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->error) {
    die("Connection error: " . $connection->error);
}

$sql = "
CREATE TABLE User (
 id INT(6) UNSIGNED AUTO_INCREMENT NOT NULL,
name VARCHAR(30),
email VARCHAR(30)
);";

// returns false query runs unsuccessfully, an object otherwise
if ($connection->query($sql)) {
    echo "Inserted the values";
} else {
    echo "Couldn't insert";
}
