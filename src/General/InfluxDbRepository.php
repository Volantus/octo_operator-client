<?php
namespace Volante\SkyBukkit\Monitor\Src\General;

use InfluxDB\Client;
use InfluxDB\Database;

/**
 * Class InfluxDbRepository
 * @package Volante\SkyBukkit\Monitor\Src\General
 */
class InfluxDbRepository
{
    /**
     * @var Client
     */
    protected $client;

    /**
     * @var Database
     */
    protected $database;

    /**
     * InfluxDbRepository constructor.
     * @param Client $client
     * @param string $schema
     */
    public function __construct(Client $client = null, $schema = null)
    {
        $this->client = $client ?: new Client(getenv('INFLUXDB_HOST'), getenv('INFLUXDB_PORT'), getenv('INFLUXDB_USERNAME'), getenv('INFLUXDB_PASSWORD'), true);
        $this->database = $this->client->selectDB($schema ?: getenv('INFLUXDB_DATABASE'));
    }
}