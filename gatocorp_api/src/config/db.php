<?php
    $host = 'ec2-54-209-43-223.compute-1.amazonaws.com';
    $dbname = 'df7a0bth968bdu';
    $user = 'vnauzcroqtjvrj';
    $password = 'e4c5059b5cbabac4837ac025cf9e5983d51a107637c69f7a6274144a3a3b8876';
    $conn = pg_connect("host=$host port=5432 dbname=$dbname user=$user password=$password");
    