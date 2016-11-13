<?php
namespace Volante\SkyBukkit\Monitor\Src\FlightStatus;
use Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition\AltitudeFactory;
use Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition\AltitudeRepository;
use Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition\GeoPosition;
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
     * @var AltitudeRepository
     */
    private $altitudeRepository;

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
     * @param AltitudeFactory $altitudeFactory
     */
    public function __construct(GeoPositionFactory $geoPositionFactory = null, NetworkStatusFactory $networkStatusFactory = null, GeoPositionRepository $geoPositionRepository = null, NetworkStatusRepository $networkStatusRepository = null, AltitudeFactory $altitudeFactory = null)
    {
        $this->geoPositionFactory = $geoPositionFactory ?: new GeoPositionFactory();
        $this->networkStatusFactory = $networkStatusFactory ?: new NetworkStatusFactory();
        $this->geoPositionRepository = $geoPositionRepository ?: new GeoPositionRepository();
        $this->altitudeRepository = $this->altitudeRepository ?: new AltitudeRepository();
        $this->networkStatusRepository = $networkStatusRepository ?: new NetworkStatusRepository();
    }

    /**
     * @param array $data
     */
    public function handle(array $data)
    {
        if (isset($data['geoPosition']) && $data['geoPosition'] != null)  {
            /** @var GeoPosition $geoPosition */
            $geoPosition = $this->geoPositionFactory->createFromRequest($data['geoPosition']);
            $this->geoPositionRepository->save($geoPosition);
            $this->altitudeRepository->save($geoPosition->getAltitude());
        }

        if (isset($data['networkStatus']) && $data['networkStatus'] != null) {
            $networkStatus = $this->networkStatusFactory->createFromRequest($data['networkStatus']);
            $this->networkStatusRepository->save($networkStatus);
        }
    }
}