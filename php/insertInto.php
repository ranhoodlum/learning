<?php
$servername = "localhost";
$username = "srj";
$password = "yourownpassword";
$dbname = "test";

$connection = new mysqli($servername, $username, $password, $dbname);

// connection error (connect_error) is also a type of "error"
if ($connection->error) {
    die("Connection error: " . $connection->error);
}

$sql = "
INSERT INTO User (name, email) VALUES 
('Saugat Rijal', 'srj@gmail.com'), 
('Saroj', 'saroj@gmail.com')";

// returns false query runs unsuccessfully, an object otherwise
if ($connection->query($sql)) {
    echo "Inserted the values";
} else {
    echo "Couldn't insert";
}
