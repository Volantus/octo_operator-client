<?php
namespace Volante\SkyBukkit\Monitor\Src\Controller\API;

use Assert\Assertion;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Volante\SkyBukkit\Monitor\Src\Controller\Controller;
use Volante\SkyBukkit\Monitor\Src\FlightStatus\FlightStatusRepository;
use Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition\GeoPositionFactory;
use Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition\GeoPositionRepository;
use Volante\SkyBukkit\Monitor\Src\FlightStatus\NetworkStatus\NetworkStatusFactory;

/**
 * Class FlightStatusController
 * @package Volante\SkyBukkit\Monitor\Src\Controller\API
 */
class FlightStatusController extends Controller
{
    /**
     * @var FlightStatusRepository
     */
    private $flightStatusRepository;

    /**
     * FlightStatusController constructor.
     * @param FlightStatusRepository $flightStatusRepository
     */
    public function __construct(FlightStatusRepository $flightStatusRepository = null)
    {
        $this->flightStatusRepository = $flightStatusRepository ?: new FlightStatusRepository();
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function create(Request $request)
    {
        return $this->protectedExecution(function () use ($request) {
            $this->authenticate($request);
            $data = $this->decodeJson($request);
            $this->flightStatusRepository->handle($data);
        });
    }

    /**
     * @param Request $request
     */
    private function authenticate(Request $request)
    {
        $key = $request->get('apiKey');

        if ($key == null || $key != getenv('API_KEY')) {
            throw new UnauthorizedHttpException('API Key');
        }
    }
}