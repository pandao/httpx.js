<?php

echo $_SERVER['REQUEST_METHOD'] . ' : http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] . "\n";

echo "<pre>";
print_r($_POST);
echo "</pre>";