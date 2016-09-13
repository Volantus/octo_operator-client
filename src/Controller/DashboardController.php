<?php
namespace Volante\SkyBukkit\Monitor\Src\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class DashboardController
 * @package Volante\SkyBukkit\Monitor\Src\Controller
 */
class DashboardController extends Controller
{
    /**
     * @return Response
     */
    public function show()
    {
        return new Response("test");
    }
}