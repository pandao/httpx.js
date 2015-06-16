<?php

echo $_SERVER['REQUEST_METHOD'] . ' : http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] . "\n\n";

echo json_encode([$_GET, apache_request_headers()]);

