<?php

echo $_SERVER['REQUEST_METHOD'] . ' : http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] . "\n";

$puts = [];

parse_str(file_get_contents('php://input'), $puts);

echo "<pre>";
print_r($puts);
echo "</pre>";

