<?php
namespace Volante\SkyBukkit\Monitor\Src\FlightStatus\NetworkStatus;

use Volante\SkyBukkit\Monitor\Src\General\RedisRepository;

/**
 * Class NetworkStatusRepository
 * @package Volante\SkyBukkit\Monitor\Src\FlightStatus\NetworkStatus
 */
class NetworkStatusRepository extends RedisRepository
{
    /**
     * @param NetworkStatus $networkStatus
     */
    public function save(NetworkStatus $networkStatus)
    {
        $cacheItem = $this->cache->getItem('networkStatus');
        $cacheItem->set($networkStatus);
        $this->cache->save($cacheItem);
    }
}