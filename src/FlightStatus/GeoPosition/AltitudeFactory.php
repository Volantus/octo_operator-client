<?php
namespace Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition;

use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Required;
use Symfony\Component\Validator\Constraints\Type;
use Volante\SkyBukkit\Monitor\Src\General\Factory;

/**
 * Class AltitudeFactory
 * @package Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition
 */
class AltitudeFactory extends Factory
{
    /**
     * @inheritdoc
     */
    protected function build(array $data)
    {
        return new Altitude($data['relative'], $data['absolute']);
    }

    /**
     * @inheritdoc
     */
    protected function getConstraint(): array
    {
        return [
            'relative'  => new Required([new NotBlank(), new Type('numeric')]),
            'absolute' => new Required([new NotBlank(), new Type('numeric')]),
        ];
    }
}