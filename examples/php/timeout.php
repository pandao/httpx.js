<?php

header('Content-Type:text/html;charset=utf-8');  

for($i = 0; $i < 1000000000; $i++) {
	echo $i;
}

echo $_SERVER['REQUEST_METHOD'] . ':' . $_SERVER['REQUEST_URI'];