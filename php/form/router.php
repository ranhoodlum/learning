<?php
$views = "/views/";
$request = $_SERVER["REQUEST_URI"];

switch ($request) {
    case "/":
    case "":
        require __DIR__ . $views . "details.php";
        break;

    case "/form":
        require __DIR__ . $views . "form.php";
        break;
    
    default:
        require __DIR__ . $views . "404.php";
        break;
}

