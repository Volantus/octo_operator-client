<?php
namespace Volante\SkyBukkit\Monitor\Src\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller as WebController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

/**
 * Class Controller
 * @package Volante\SkyBukkit\Monitor\Src\Controller
 */
abstract class Controller extends WebController
{
    /**
     * @param callable $callable
     * @return Response
     */
    protected function protectedExecution(callable $callable) : Response
    {
        try {
            call_user_func($callable);
        } catch (\InvalidArgumentException $e) {
            return new Response($e->getMessage(), 400);
        } catch (UnauthorizedHttpException $e) {
            return new Response($e->getMessage(), 401);
        } catch (\Exception $e) {
            return new Response($e->getMessage(), 500);
        }

        return new Response();
    }

    /**
     * @param Request $request
     * @return array
     */
    protected function decodeJson(Request $request) : array
    {
        $data = json_decode($request->getContent(), true);

        if (!is_array($data)) {
            throw new \InvalidArgumentException('Invalid JSON structure');
        }

        return $data;
    }
}