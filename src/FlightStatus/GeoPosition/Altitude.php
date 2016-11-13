<?php
namespace Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition;

/**
 * Class Altitude
 * @package Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition
 */
class Altitude implements \JsonSerializable
{
    /**
     * @var float
     */
    private $relative;

    /**
     * @var float
     */
    private $absolute;

    /**
     * Altitude constructor.
     * @param float $relative
     * @param float $absolute
     */
    public function __construct(float $relative, float $absolute)
    {
        $this->relative = $relative;
        $this->absolute = $absolute;
    }

    /**
     * @return float
     */
    public function getRelative(): float
    {
        return $this->relative;
    }

    /**
     * @return float
     */
    public function getAbsolute(): float
    {
        return $this->absolute;
    }

    /**
     * @inheritdoc
     */
    public function jsonSerialize()
    {
        return [
            'relative' => $this->relative,
            'absolute' => $this->absolute
        ];
    }
}