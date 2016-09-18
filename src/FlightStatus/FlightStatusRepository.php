<?php
namespace Volante\SkyBukkit\Monitor\Src\FlightStatus;
use Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition\GeoPositionFactory;
use Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition\GeoPositionRepository;
use Volante\SkyBukkit\Monitor\Src\FlightStatus\NetworkStatus\NetworkStatusFactory;
use Volante\SkyBukkit\Monitor\Src\FlightStatus\NetworkStatus\NetworkStatusRepository;

/**
 * Class FlightStatusRepository
 * @package Volante\SkyBukkit\Monitor\Src\FlightStatus
 */
class FlightStatusRepository
{
    /**
     * @var GeoPositionFactory
     */
    private $geoPositionFactory;

    /**
     * @var NetworkStatusFactory
     */
    private $networkStatusFactory;

    /**
     * @var GeoPositionRepository
     */
    private $geoPositionRepository;

    /**
     * @var NetworkStatusRepository
     */
    private $networkStatusRepository;

    /**
     * FlightStatusRepository constructor.
     * @param GeoPositionFactory $geoPositionFactory
     * @param NetworkStatusFactory $networkStatusFactory
     * @param GeoPositionRepository $geoPositionRepository
     * @param NetworkStatusRepository $networkStatusRepository
     */
    public function __construct(GeoPositionFactory $geoPositionFactory = null, NetworkStatusFactory $networkStatusFactory = null, GeoPositionRepository $geoPositionRepository = null, NetworkStatusRepository $networkStatusRepository = null)
    {
        $this->geoPositionFactory = $geoPositionFactory ?: new GeoPositionFactory();
        $this->networkStatusFactory = $networkStatusFactory ?: new NetworkStatusFactory();
        $this->geoPositionRepository = $geoPositionRepository ?: new GeoPositionRepository();
        $this->networkStatusRepository = $networkStatusRepository ?: new NetworkStatusRepository();
    }

    /**
     * @param array $data
     */
    public function handle(array $data)
    {
        if (isset($data['geoPosition']) && $data['geoPosition'] != null)  {
            $geoPosition = $this->geoPositionFactory->createFromRequest($data['geoPosition']);
            $this->geoPositionRepository->save($geoPosition);
        }

        if (isset($data['networkStatus']) && $data['networkStatus'] != null) {
            $networkStatus = $this->networkStatusFactory->createFromRequest($data['networkStatus']);
            $this->networkStatusRepository->save($networkStatus);
        }
    }
}