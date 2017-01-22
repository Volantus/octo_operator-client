<?php
namespace Volante\SkyBukkit\Monitor\Src\Controller\UI;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;
use Symfony\Component\HttpFoundation\Response;
use Volante\SkyBukkit\Monitor\Src\FlightStatus\NetworkStatus\NetworkStatusRepository;

/**
 * Class DashboardController
 * @package Volante\SkyBukkit\Monitor\Src\Controller\UI
 */
class DashboardController extends Controller
{
    /**
     * @var EngineInterface
     */
    private $TemplateEngine;

    /**
     * DashboardController constructor.
     * @param EngineInterface $TemplateEngine
     */
    public function __construct(EngineInterface $TemplateEngine)
    {
        $this->TemplateEngine = $TemplateEngine;
    }

    /**
     * @return Response
     */
    public function init()
    {
        return $this->TemplateEngine->renderResponse('base/init.html.twig', [
            'activeItem' => 'dashboard',
            'authenticationKey' => getenv('AUTH_KEY')
        ]);
    }
}