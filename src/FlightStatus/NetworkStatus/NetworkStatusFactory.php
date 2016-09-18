<?php
namespace Volante\SkyBukkit\Monitor\Src\FlightStatus\NetworkStatus;
use Symfony\Component\Validator\Constraints\Blank;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Required;
use Symfony\Component\Validator\Constraints\Type;
use Volante\SkyBukkit\Monitor\Src\General\Factory;

/**
 * Class NetworkStatusFactory
 * @package Volante\SkyBukkit\Monitor\Src\FlightStatus\NetworkStatus
 */
class NetworkStatusFactory extends Factory
{
    /**
     * @inheritdoc
     */
    protected function build(array $data)
    {
        return new NetworkStatus($data['webSocketPort'], $data['ipAddress']);
    }

    /**
     * @inheritdoc
     */
    protected function getConstraint(): array
    {
        return [
            'ipAddress' => new Required(),
            'webSocketPort' => new Required([new NotBlank(), new Type('integer')])
        ];
    }
}