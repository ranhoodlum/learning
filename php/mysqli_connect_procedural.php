 <?php
    $servername = "localhost";
    $username = "srj";
    $password = "setyourownpasswordhere";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password);

    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    echo "Connected successfully";

// should work, idk why not working
    /*$mysqli_close($conn);*/
