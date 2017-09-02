<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: X-XXX-XXX, Access-Token, Origin, X-Requested-With, Content-Type, Accept, Authorization");
header("Access-Control-Allow-Methods: HEAD, TRACE, PATCH, POST, GET, PUT, DELETE, OPTIONS");

// for IE9 cross domain request and others
if (file_get_contents('php://input')) {
    $puts = [];

    parse_str(file_get_contents('php://input'), $puts);
    echo json_encode($puts);

    exit;
}

echo json_encode($_REQUEST);