<?php
namespace Volante\SkyBukkit\Monitor\Src\FlightStatus\NetworkStatus;

/**
 * Class NetworkStatus
 * @package Volante\SkyBukkit\Monitor\Src\FlightStatus\NetworkStatus
 */
class NetworkStatus implements \JsonSerializable
{
    /**
     * @var string
     */
    private $ipAddress;

    /**
     * @var int
     */
    private $webSocketPort;

    /**
     * NetworkStatus constructor.
     * @param int $webSocketPort
     * @param string $ipAddress
     */
    public function __construct(int $webSocketPort, string $ipAddress = null)
    {
        $this->ipAddress = $ipAddress;
        $this->webSocketPort = $webSocketPort;
    }

    /**
     * @return string
     */
    public function getIpAddress(): string
    {
        return $this->ipAddress;
    }

    /**
     * @return int
     */
    public function getWebSocketPort(): int
    {
        return $this->webSocketPort;
    }


    /**
     * @inheritdoc
     */
    public function jsonSerialize()
    {
        return [
            'ipAddress'     => $this->ipAddress,
            'webSocketPort' => $this->webSocketPort
        ];
    }
}