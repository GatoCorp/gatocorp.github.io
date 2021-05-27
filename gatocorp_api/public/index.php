<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
require __DIR__ . '/../vendor/autoload.php';

// hardcodeado para probar nomas


$app = AppFactory::create();

include '../src/config/db.php';
$app->get('/', function (Request $request, Response $response, $args) {
  $json = ['hello' => 'world', 'from' => 'slim'];
  $response->getBody()->write(json_encode($json));
  return $response->withHeader('Content-Type', 'application/json');;
});

$app->get('/materias', function (Request $request, Response $response, $args) {
  global $conn;
  $result = pg_query($conn, "select * from materia");
  $response->getBody()->write(json_encode(pg_fetch_all($result)));
  return $response->withHeader('Content-Type', 'application/json');
});

$app->get('/estudiantes', function (Request $request, Response $response, $args)  use($conn) {

  $result = pg_query($conn, "select * from estudiante");
  $response->getBody()->write(json_encode(pg_fetch_all($result)));
  return $response->withHeader('Content-Type', 'application/json');
});


$app->post('/estudiantes', function (Request $request, Response $response, $args) {

});


$app->run();
