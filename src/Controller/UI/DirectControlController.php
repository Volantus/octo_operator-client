<?php
namespace Volante\SkyBukkit\Monitor\Src\Controller\UI;

use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;
use Symfony\Component\HttpFoundation\Response;
use Volante\SkyBukkit\Monitor\Src\Controller\Controller;

/**
 * Class DirectControlController
 * @package Volante\SkyBukkit\Monitor\Src\Controller\UI
 */
class DirectControlController extends Controller
{
    /**
     * @var EngineInterface
     */
    private $TemplateEngine;

    /**
     * DirectControlController constructor.
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
        return $this->TemplateEngine->renderResponse('pages/control.html.twig', ['activeItem' => 'directControl']);
    }
}