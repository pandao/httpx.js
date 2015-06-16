<?php

$url = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

header("X-Method : HEAD");
header("X-HEAD-Request-Url : " . $url);
header("X-HEAD-Tag : PHP-HEAD-HEADER");

die;