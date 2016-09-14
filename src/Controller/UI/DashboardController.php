<?php
namespace Volante\SkyBukkit\Monitor\Src\Controller\UI;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;
use Symfony\Component\HttpFoundation\Response;

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
    public function show()
    {
        return $this->TemplateEngine->renderResponse('dashboard.html.twig');
    }
}