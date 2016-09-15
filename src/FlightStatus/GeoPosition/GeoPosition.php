<?php
namespace Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition;

use Carbon\Carbon;

/**
 * Class GeoPosition
 * @package Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition
 */
class GeoPosition implements \JsonSerializable
{
    /**
     * @var Carbon
     */
    private $time;

    /**
     * @var float
     */
    private $latitude;

    /**
     * @var float
     */
    private $longitude;

    /**
     * @var float
     */
    private $altitude;

    /**
     * GeoPosition constructor.
     * @param float $latitude
     * @param float $longitude
     * @param float $altimeter
     */
    public function __construct(float $latitude, float $longitude, float $altimeter)
    {
        $this->time = Carbon::now();
        $this->latitude = $latitude;
        $this->longitude = $longitude;
        $this->altitude = $altimeter;
    }

    /**
     * @return float
     */
    public function getLatitude(): float
    {
        return $this->latitude;
    }

    /**
     * @return float
     */
    public function getLongitude(): float
    {
        return $this->longitude;
    }

    /**
     * @return float
     */
    public function getAltitude(): float
    {
        return $this->altitude;
    }

    /**
     * @inheritdoc
     */
    public function jsonSerialize()
    {
        return [
            'time'      => $this->time->format('Y-m-d H:i:s'),
            'latitude'  => $this->latitude,
            'longitude' => $this->longitude,
            'altimeter' => $this->altitude
        ];
    }
}