<?php

namespace App\Tests\_mock\Mock\core\legacy\Statistics;

use App\Legacy\Statistics\CaseDaysOpen;
use Doctrine\ORM\EntityManagerInterface;
use aCase;
use App\Tests\_mock\Helpers\core\legacy\Data\DBQueryResultsMocking;
use SugarBean;

/**
 * Class CaseDaysOpenMock
 * @package Mock\Core\Legacy\Statistics
 */
class CaseDaysOpenMock extends CaseDaysOpen
{
    use DBQueryResultsMocking;

    /**
     * @var aCase
     */
    public $case;

    /**
     * @param aCase $case
     */
    public function setCase(aCase $case): void
    {
        $this->case = $case;
    }

    /**
     * @param $id
     * @return aCase
     */
    protected function getCase(string $id): aCase
    {
        return $this->case;
    }

    protected function startLegacyApp(): void
    {
    }

    /**
     * @inheritDoc
     */
    protected function runAuditInfoQuery(
        EntityManagerInterface $em,
        SugarBean $bean,
        string $field,
        array $procedureParams,
        $innerQuery
    ): ?array {
        return $this->getAllMockQueryResults();
    }
}