<?php
header("Access-Control-Allow-Origin: *");

$callback = isset($_GET["callback"]) ? $_GET["callback"] : "callback";

$json = [
	"title"    => "Javascript JSONP demo",
	"views"    => rand(1000, 9999),
	"url"      => 'http://' . $_SERVER["HTTP_HOST"] . $_SERVER['REQUEST_URI'],
	"add_time" => date('Y-m-d H:i:s'),
];

echo $callback . "(". json_encode($json) . ")";