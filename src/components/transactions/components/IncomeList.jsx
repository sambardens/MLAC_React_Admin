import { Box, Flex, Text } from '@chakra-ui/react';

import {
  GetSelectedBap,
  GetSelectedBuyer,
  GetSelectedGenre,
  GetSelectedPerformer,
  GetSelectedReleaseType,
  GetSelectedRole,
  GetSelectedSubGenre,
  GetSortBy,
} from '../../../../store/filters/filters.selectors';
import { TransactionsAll } from '../../../../store/transactions/transactions.selectors';
import IncomeItem from './IncomeItem';
import TableTitle from './TableTitle';
import { PaginationProvider } from '@/components/layouts/PaginationLayout';
import usePagedData from '@/hooks/usePageData';

const IncomeList = ({ currentIncomeList, isLoading, isFetching }) => {
  const allTransactions = TransactionsAll();
  const incomes = allTransactions?.filteredReleases;

  const sortBy = GetSortBy();
  const selectedReleaseType = GetSelectedReleaseType();
  const selectedPerformer = GetSelectedPerformer();
  const selectedGenre = GetSelectedGenre();
  const selectedBuyer = GetSelectedBuyer();
  const selectedRole = GetSelectedRole();
  const selectedBap = GetSelectedBap();
  const selectedSubGenre = GetSelectedSubGenre();

  const checkForEmptiness = () => {
    return (
      sortBy ||
      selectedBuyer ||
      selectedRole ||
      selectedBap ||
      selectedReleaseType ||
      selectedGenre ||
      selectedSubGenre ||
      selectedPerformer
    );
  };

  const { currentItems, _, pageCount, handlePageChange } = usePagedData(
    currentIncomeList,
    false,
  );

  return (
    <Flex
      flexDir="column"
      justify="center"
      gap="12px"
      h="100%"
      position={'relative'}
    >
      {currentItems?.length > 0 && (
        <>
          <TableTitle key="title" />
          <PaginationProvider
            onPageChange={handlePageChange}
            pageCount={pageCount}
          >
            <Flex as="ul" flexDir="column" gap="8px" width={'100%'}>
              {currentItems.map(el => (
                <IncomeItem key={el.id} transaction={el} />
              ))}
            </Flex>
          </PaginationProvider>
        </>
      )}

      {currentItems &&
        currentItems?.length === 0 &&
        !checkForEmptiness() &&
        !isLoading &&
        !isFetching && (
          <Box h={'400px'}>
            <Text
              position={'absolute'}
              top="50%"
              right="50%"
              transform={'translate(50%, -50%)'}
              color="black"
              fontSize="18px"
              fontWeight="600"
              textAlign="center"
            >
              No transactions found for the selected period
            </Text>
          </Box>
        )}

      {incomes &&
        incomes?.length === 0 &&
        checkForEmptiness() &&
        !isLoading &&
        !isFetching && (
          <Box h={'400px'}>
            <Text
              position={'absolute'}
              top="50%"
              right="50%"
              transform={'translate(50%, -50%)'}
              color="black"
              fontSize="18px"
              fontWeight="600"
              textAlign="center"
            >
              No transactions for selected filters
            </Text>
          </Box>
        )}
    </Flex>
  );
};

export default IncomeList;
