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
     * @var AltitudeFactory
     */
    private $altitudeFactory;

    /**
     * GeoPositionFactory constructor.
     * @param AltitudeFactory $altitudeFactory
     */
    public function __construct(AltitudeFactory $altitudeFactory = null)
    {
        $this->altitudeFactory = $altitudeFactory ?: new AltitudeFactory();
    }

    /**
     * @inheritdoc
     */
    protected function build(array $data)
    {
        $altitude = $this->altitudeFactory->createFromRequest($data['altitude']);
        return new GeoPosition($data['latitude'], $data['longitude'], $altitude);
    }

    /**
     * @inheritdoc
     */
    protected function getConstraint(): array
    {
        return [
            'latitude'  => new Required([new NotBlank(), new Type('numeric')]),
            'longitude' => new Required([new NotBlank(), new Type('numeric')]),
            'altitude' => new Required([new NotBlank(), new Type('array')]),
            'measurementTime' => new Optional()
        ];
    }
}