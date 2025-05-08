<?php
// require just pulls / copies the code, and nothing more
require "connection.php";

$sql = "SELECT name, email, gender FROM User";
$result = $connection->query($sql);
if ($result->num_rows > 0) {
    echo "
    <table>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
        <tr>
    ";
    // returns null if there's no more rows
    while ($row = $result->fetch_assoc()) {
        echo '
            <tr>
                <td>' . $row["name"] . '</td>
                <td>' . $row["email"] . '</td>
                <td>' . $row["gender"] . '</td>
            </tr>
        ';
    }
} else {
    echo "No users, create user first!";
}

echo "<a href='/form'>Create more users</a>";
