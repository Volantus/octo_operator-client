<?php
namespace Volante\SkyBukkit\Monitor\Src\General;

use Symfony\Component\Cache\Adapter\AdapterInterface;
use Symfony\Component\Cache\Adapter\RedisAdapter;
use Volante\SkyBukkit\Monitor\Src\Persistence\RedisConnectionHandler;

/**
 * Class RedisRepository
 * @package Volante\SkyBukkit\Monitor\Src\General
 */
abstract class RedisRepository
{
    /**
     * @var AdapterInterface
     */
    protected $cache;

    /**
     * GeoPositionRepository constructor.
     * @param AdapterInterface $cache
     */
    public function __construct(AdapterInterface $cache = null)
    {
        $this->cache = $cache ?: new RedisAdapter(RedisConnectionHandler::getConnection());
    }
}