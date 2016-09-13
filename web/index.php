<?php
use Symfony\Component\HttpFoundation\Request;
use Volante\SkyBukkit\Monitor\App\AppKernel;

require __DIR__.'/../vendor/autoload.php';

$kernel = new AppKernel('dev', true);
$request = Request::createFromGlobals();
$response = $kernel->handle($request);
$response->send();
$kernel->terminate($request, $response);