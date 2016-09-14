<?php
namespace Volante\SkyBukkit\Monitor\Src\Persistence;

/**
 * Class RedisConnectionHandler
 * @package Volante\SkyBukkit\Monitor\Src\Persistence
 */
class RedisConnectionHandler
{
    /**
     * @var \Redis
     */
    protected static $connection;

    /**
     * @return \Redis
     */
    public static function getConnection()
    {
        if (self::$connection == null) {
            self::$connection = new \Redis();
            self::$connection->connect(getenv('REDIS_HOST'));
            self::$connection->auth(getenv('REDIS_PASSWORD'));
        }

        return self::$connection;
    }
}