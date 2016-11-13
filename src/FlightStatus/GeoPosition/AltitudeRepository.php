<?php
namespace Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition;

use InfluxDB\Point;
use Volante\SkyBukkit\Monitor\Src\General\InfluxDbRepository;

/**
 * Class AltitudeRepository
 * @package Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition
 */
class AltitudeRepository extends InfluxDbRepository
{
    /**
     * @param Altitude $altitude
     */
    public function save(Altitude $altitude)
    {
        $points = [
            new Point('absolute_altitude', $altitude->getAbsolute()),
            new Point('relative_altitude', $altitude->getRelative())
        ];
        $this->database->writePoints($points);
    }
}