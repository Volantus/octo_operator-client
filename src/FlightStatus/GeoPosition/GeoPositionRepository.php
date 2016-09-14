<?php
namespace Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition;

use Symfony\Component\Cache\Adapter\AdapterInterface;
use Symfony\Component\Cache\Adapter\RedisAdapter;
use Volante\SkyBukkit\Monitor\Src\Persistence\RedisConnectionHandler;

/**
 * Class GeoPositionRepository
 * @package Volante\SkyBukkit\Monitor\Src\FlightStatus\GeoPosition
 */
class GeoPositionRepository
{
    /**
     * @var AdapterInterface
     */
    private $cache;

    /**
     * GeoPositionRepository constructor.
     * @param AdapterInterface $cache
     */
    public function __construct(AdapterInterface $cache = null)
    {
        $this->cache = $cache ?: new RedisAdapter(RedisConnectionHandler::getConnection());
    }

    /**
     * @return GeoPosition[]
     */
    public function all() : array
    {
        $cacheItem = $this->cache->getItem('geoPositions');
        return $cacheItem->isHit() ? $cacheItem->get() : [];
    }

    /**
     * @param GeoPosition $geoPosition
     */
    public function save(GeoPosition $geoPosition)
    {
        $cacheItem = $this->cache->getItem('geoPositions');

        $list = $cacheItem->isHit() ? $cacheItem->get() : [];
        $list[] = $geoPosition;

        $cacheItem->set($list);
        $this->cache->save($cacheItem);
    }

    public function deleteAll()
    {
        $cacheItem = $this->cache->getItem('geoPositions');
        $cacheItem->set([]);
        $this->cache->save($cacheItem);
    }
}