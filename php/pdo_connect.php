<?php
$servername = "localhost";
// change to your username and password
$username = "srj";
$password = "whateves";

try {
    // create connection
    // since pdo can create connections to many databases, you can 
    // specify which db to connect to with mysql: 
    // and which host and db to connect to on that database
    $connection = new PDO("mysql:host=$servername;dbname=test", $username, $password);

    // check connection
    // :: = scope resolution operator
    // in php, it is used to access the static properties, methods of a class
    // ATTR_ERRMODE specifies how PDO specifies errors, it can be set silent, or
    // only throw messages, but setting it to ERRMODE_EXCEPTION tells PDO to 
    // throw exception on error
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "Connected successfully";
    // thrown by PDO, don't throw yourself

    // the connection is closed when script ends, to do it manually
    // at any point in the code, use
    // idk why doesn't work
    /*$connection->close()*/
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
