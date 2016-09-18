<?php
namespace Volante\SkyBukkit\Monitor\Src\General;
use Symfony\Component\Validator\Constraints\Collection;
use Symfony\Component\Validator\ConstraintViolationInterface;
use Symfony\Component\Validator\Validation;

/**
 * Class Factory
 * @package Volante\SkyBukkit\Monitor\Src\General
 */
abstract class Factory
{
    /**
     * @var string
     */
    protected $entityTitle = 'Entity';

    /**
     * @param array $data
     * @return mixed
     */
    public function createFromRequest(array $data)
    {
        self::validate($data);
        return $this->build($data);
    }

    /**
     * Builds the entity from request
     *
     * @param array $data
     * @return mixed
     */
    abstract protected function build(array $data);

    /**
     * Returns the validation constraint
     *
     * @return array
     */
    abstract protected function getConstraint(): array;

    /**
     * @param array $data
     */
    private function validate(array $data)
    {
        $constraints = new Collection($this->getConstraint());

        $validator = Validation::createValidator();
        $violations =  $validator->validate($data, $constraints);

        foreach ($violations as $violation) {
            /** @var ConstraintViolationInterface $violation */
            throw new \InvalidArgumentException($this->entityTitle . ' has invalid format: ' . $violation->getPropertyPath() . ' => ' . $violation->getMessage());
        }
    }
}