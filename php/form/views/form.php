<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Personal Details</title>
  </head>
  <body>
<?php 
$form = '
    <form method="post"  action=' . $_SERVER["PHP_SELF"] . '>
      <div>
        <label for="username">Username</label
        ><input type="text" name="username" id="username" />
      </div>
      <div>
        <label for="password">Password</label
        ><input type="password" name="password" id="password" />
      </div>
      <div>
        <label for="email">email</label
        ><input type="email" name="email" id="email" />
      </div>
      <fieldset>
          <legend>Gender</legend>
          <label for="male">Male</label>
          <input id="male" type="checkbox" name="gender" value="male">
          <label for="female">female</label>
          <input id="female" type="checkbox" name="gender" value="female">
      </fieldset>
      <button type="submit"> Submit </button>
    </form>
';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    echo $form;
} else if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // validation
    $username = $_POST["username"];
    $password = $_POST["password"];
    $email = $_POST["email"];
    // since we're inserting them in database
    $gender = $_POST["gender"];

    if (!preg_match("/^[A-Za-z]+$/", $username)) {
        echo $form;
        echo "Username should be only alphabets!";
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo $form;
        echo "Email is of incorrect form.";
    } else {
        // connect to mysql
        require "connection.php";
        
        // use default hashing algorithm for hashing password
        // you need to use password_verify when verifying hash
        $hashed_pw = password_hash($password, PASSWORD_DEFAULT);

        // connection is defined in connection.php
        $stmt = $connection->prepare("INSERT INTO User (name, email, password, gender) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $username, $email, $hashed_pw, $gender);
        if ($stmt->execute()) {
            $url = "/";
            header("Location: $url");
            exit;
            // echo "Form submitted successfully as $username, password $password, email $email, gender $gender";
        } else {
            echo $form;
            echo "Server failure: Couldn't insert the values";
        }
    }
}

echo "<a href='/'>Back to home</a>";
?>
  </body>
</html>

