<?php
$servername = "localhost";
$username = "srj";
$password = "yourownpassword";
$dbname = "test";

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->error) {
    die("Error: " . $connection->error);
}

// prepare the statement
// returns the statement object
$preparedStatement = $connection->prepare("INSERT INTO User (name, email) VALUES (?, ?)");

// bind the params (datatypes s = string, i = integer)
// to the variables (not yet defined)
// must be defined before execute() of prepared statment is called
$preparedStatement->bind_param("ss", $name, $email);

$name =  "Saugat Again";
$email =  "saugat@gmail.com";
$preparedStatement->execute();

echo "Records created successfully";

$preparedStatement->close()();
$connection->close();
