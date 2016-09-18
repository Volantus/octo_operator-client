<?php
namespace Volante\SkyBukkit\Monitor\Src\Controller\API;

use Assert\Assertion;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Volante\SkyBukkit\Monitor\Src\Controller\Controller;
use Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition\GeoPositionFactory;
use Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition\GeoPositionRepository;

/**
 * Class FlightStatusController
 * @package Volante\SkyBukkit\Monitor\Src\Controller\API
 */
class FlightStatusController extends Controller
{
    /**
     * @var GeoPositionRepository
     */
    private $geoPositionRepository;

    /**
     * FlightStatusController constructor.
     * @param GeoPositionRepository $geoPositionRepository
     */
    public function __construct(GeoPositionRepository $geoPositionRepository = null)
    {
        $this->geoPositionRepository = $geoPositionRepository ?: new GeoPositionRepository();
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

            if (isset($data['geoPosition']))  {
                $geoPosition = GeoPositionFactory::createFromRequest($data['geoPosition']);
                $this->geoPositionRepository->save($geoPosition);
            }
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