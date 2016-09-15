<?php
namespace Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition;

use Symfony\Component\Validator\Constraints\Collection;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Optional;
use Symfony\Component\Validator\Constraints\Required;
use Symfony\Component\Validator\Constraints\Type;
use Symfony\Component\Validator\ConstraintViolationInterface;
use Symfony\Component\Validator\Validation;

/**
 * Class GeoPositionFactory
 * @package Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition
 */
class GeoPositionFactory
{
    /**
     * @param array $data
     * @return GeoPosition
     */
    public static function createFromRequest(array $data) : GeoPosition
    {
        self::validate($data);
        return new GeoPosition($data['latitude'], $data['longitude'], $data['altitude']);
    }

    /**
     * @param array $data
     */
    private static function validate(array $data)
    {
        $constraints = new Collection([
            'latitude'  => new Required([new NotBlank(), new Type('numeric')]),
            'longitude' => new Required([new NotBlank(), new Type('numeric')]),
            'altitude' => new Required([new NotBlank(), new Type('numeric')]),
            'measurementTime' => new Optional()
        ]);

        $validator = Validation::createValidator();
        $violations =  $validator->validate($data, $constraints);

        foreach ($violations as $violation) {
            /** @var ConstraintViolationInterface $violation */
            throw new \InvalidArgumentException('GeoPosition has invalid format: ' . $violation->getPropertyPath() . ' => ' . $violation->getMessage());
        }
    }
}