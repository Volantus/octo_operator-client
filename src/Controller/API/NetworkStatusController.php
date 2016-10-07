<?php
namespace Volante\SkyBukkit\Monitor\Src\Controller\API;

use Symfony\Component\HttpFoundation\JsonResponse;
use Volante\SkyBukkit\Monitor\Src\Controller\Controller;
use Volante\SkyBukkit\Monitor\Src\FlightStatus\NetworkStatus\NetworkStatusRepository;

/**
 * Class NetworkStatusRepository
 * @package Volante\SkyBukkit\Monitor\Src\Controller\API
 */
class NetworkStatusController extends Controller
{
    /**
     * @var NetworkStatusRepository
     */
    private $networkStatusRepository;

    /**
     * NetworkStatusRepository constructor.
     * @param NetworkStatusRepository $networkStatusRepository
     */
    public function __construct(NetworkStatusRepository $networkStatusRepository = null)
    {
        $this->networkStatusRepository = $networkStatusRepository ?: new NetworkStatusRepository();
    }

    /**
     * @return JsonResponse
     */
    public function getStatus()
    {
        $networkStatus = $this->networkStatusRepository->get();
        return new JsonResponse($networkStatus);
    }
}