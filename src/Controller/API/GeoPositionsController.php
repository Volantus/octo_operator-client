<?php
namespace Volante\SkyBukkit\Monitor\Src\Controller\API;

use Symfony\Component\HttpFoundation\Response;
use Volante\SkyBukkit\Monitor\Src\Controller\Controller;
use Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition\GeoPositionRepository;

/**
 * Class GeoPositionsController
 * @package Volante\SkyBukkit\Monitor\Src\Controller\API
 */
class GeoPositionsController extends Controller
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
     * @return Response
     */
    public function all()
    {
        $positions = $this->geoPositionRepository->all();
        return new Response(json_encode($positions, JSON_PRETTY_PRINT));
    }

    /**
     * @return Response
     */
    public function deleteAll()
    {
        $this->geoPositionRepository->deleteAll();
        return new Response();
    }
}