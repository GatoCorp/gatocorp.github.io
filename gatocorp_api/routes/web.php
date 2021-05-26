<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('/home', function () {
    return 'hello world from lumen!';
});

$router->get('/probando', function () {
    $conn = pg_connect("host=localhost dbname=uni user=postgres password=");
    $result = pg_query($conn, "select * from carrera");
    while ($row = pg_fetch_row($result)) {
        echo "id: $row[0]  nss: $row[1] nombre: $row[2] telefono: $row[3]";
        echo "\n";
    }
});
