<?php

header('Content-Type:text/html;charset=utf-8');  

echo $_SERVER['REQUEST_METHOD'] . ' : http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] . "\n";

$patch = [];

parse_str(file_get_contents('php://input'), $patch);

echo "<pre>";
print_r($patch);
echo "</pre>";