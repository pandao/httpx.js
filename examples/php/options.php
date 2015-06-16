<?php

if ($_SERVER['REQUEST_METHOD']=='OPTIONS') {
    header('Access-Control-Allow-Origin : *');
    header('Access-Control-Allow-Methods : POST, GET, OPTIONS, PUT, DELETE, PATCH, HEAD');
    header('Access-Control-Allow-Headers : X-Requested-With, content-type');
}

echo $_SERVER['REQUEST_METHOD'] . ' : http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] . "\n\n";