<?php
namespace Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition;

use Symfony\Component\Validator\Constraints\Collection;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Optional;
use Symfony\Component\Validator\Constraints\Required;
use Symfony\Component\Validator\Constraints\Type;
use Symfony\Component\Validator\ConstraintViolationInterface;
use Symfony\Component\Validator\Validation;
use Volante\SkyBukkit\Monitor\Src\General\Factory;

/**
 * Class GeoPositionFactory
 * @package Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition
 */
class GeoPositionFactory extends Factory
{
    /**
     * @inheritdoc
     */
    protected function build(array $data)
    {
        return new GeoPosition($data['latitude'], $data['longitude'], $data['altitude']);
    }

    /**
     * @inheritdoc
     */
    protected function getConstraint(): array
    {
        return [
            'latitude'  => new Required([new NotBlank(), new Type('numeric')]),
            'longitude' => new Required([new NotBlank(), new Type('numeric')]),
            'altitude' => new Required([new NotBlank(), new Type('numeric')]),
            'measurementTime' => new Optional()
        ];
    }
}