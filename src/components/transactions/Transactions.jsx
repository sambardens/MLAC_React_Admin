import { Box, useToast } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';

import {
  useGetTransactionsQuery,
  useGetUniqueFieldsForTransactionsQuery,
  useLazyGetTransactionsQuery,
} from '../../../store/transactions/transactions.api';
import { TransactionsAll } from '../../../store/transactions/transactions.selectors';
import ScrollToTop from '../ScrollToTop';
import FullPageLoader from '../loaders/FullPageLoader';
import { IncomeChart } from './components/IncomeChart';
import { IncomeChartHeader } from './components/IncomeChartHeader';
import IncomeHeader from './components/IncomeHeader';
import IncomeList from './components/IncomeList';

const dateOptions = [
  { id: '1', value: 'Today', label: 'Today' },
  { id: '2', value: 'This week', label: 'This week' },
  { id: '3', value: 'This month', label: 'This month' },
  { id: '4', value: 'This year', label: 'This year' },
  { id: '5', value: 'All time', label: 'All time' },
];

const sortOptions = [
  { id: '1', value: 'Date', label: 'Date' },
  { id: '2', value: 'Gross', label: 'Gross' },
];

const Transactions = () => {
  const initialDateType = dateOptions[3].value;
  const initialSortType = sortOptions[0].value;
  const [getTransactions, resultGetTransactions] =
    useLazyGetTransactionsQuery();
  // const { data: uniqueFields, isLoading: isLoadingFilters } =
  useGetUniqueFieldsForTransactionsQuery();
  const [currentIncomeList, setCurrentIncomeList] = useState([]);
  const [dateType, setDateType] = useState(initialDateType);
  const [sortType, setSortType] = useState(initialSortType);
  const [activeChart, setActiveChart] = useState('Gross');
  const [isLoadingSortByPeriod, setIsLoadingSortByPeriod] = useState(false);
  const [isHideChart, setIsHideChart] = useState(true);

  const allTransactions = TransactionsAll();

  const getTransactionsQuery = useCallback(
    async paramsQuery => {
      try {
        await getTransactions(paramsQuery);
      } catch (error) {
        console.error('error');
      }
    },
    [getTransactions],
  );

  useEffect(() => {
    getTransactionsQuery();
    if (allTransactions) {
      setCurrentIncomeList(allTransactions?.filteredReleases);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box position={'relative'} h="100%">
        {resultGetTransactions?.isLoading ? (
          <FullPageLoader position={'absolute'} />
        ) : (
          <Box minH="100%">
            <ScrollToTop />
            <Box
              opacity={isLoadingSortByPeriod ? 0.6 : 1}
              position={'relative'}
            >
              {isLoadingSortByPeriod && (
                <FullPageLoader left={'60%'} top={'60%'} />
              )}

              <IncomeHeader
                isTransactionsPage={true}
                dateType={dateType}
                sortType={sortType}
                setSortType={setSortType}
                setDateType={setDateType}
                dateOptions={dateOptions}
                setCurrentIncomeList={setCurrentIncomeList}
                currentIncomeList={currentIncomeList}
                setIsLoadingSortByPeriod={setIsLoadingSortByPeriod}
                setIsHideChart={setIsHideChart}
                getTransactionsQuery={getTransactionsQuery}
              />
              {currentIncomeList?.length !== 0 && (
                <>
                  <IncomeChartHeader
                    setActiveChart={setActiveChart}
                    activeChart={activeChart}
                  />
                  {isHideChart && (
                    <IncomeChart
                      dateType={dateType}
                      activeChart={activeChart}
                      currentIncomeList={currentIncomeList}
                    />
                  )}
                </>
              )}
              <IncomeList
                currentIncomeList={currentIncomeList}
                isLoading={resultGetTransactions?.isLoading}
                isFetching={resultGetTransactions?.isFetching}
              />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Transactions;
