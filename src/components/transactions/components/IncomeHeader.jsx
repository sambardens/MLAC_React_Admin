import { Box, Checkbox, Flex, Icon, Text, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sortByDate from 'src/utils/sort/sortByDate';

import CalendarIcon from '@/assets/icons/base/calendar.svg';

import {
  FilteredData,
  TransactionsAll,
} from '../../../../store/transactions/transactions.selectors';
import { DrawerComponent } from '@/components/UI/Drawer';
// import { getUserInfo } from 'store/operations';
import CustomSelect from '@/components/UI/customInputs/CustomSelect';
import { useActions } from '@/hooks/useActions';
import { mockIncome } from '@/mockData/mockIncome';
import { poppins_400_16_24 } from '@/styles/fontStyles';

const IncomeHeader = ({
  dateOptions,
  sortOptions,
  dateType,
  sortType,
  setDateType,
  setSortType,
  currentIncomeList,
  setCurrentIncomeList,
  setIsLoadingSortByPeriod,
  setIsHideChart,
  isTransactionsPage = false,
  getTransactionsQuery,
}) => {
  const { setFilteredData } = useActions();
  const toast = useToast();
  const allTransactions = TransactionsAll();
  const incomes = allTransactions?.filteredReleases;
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const filteredData = FilteredData();

  useEffect(() => {
    setIsLoadingSortByPeriod(false);
  }, [filteredData, setIsLoadingSortByPeriod]);

  // const onClick = async () => {
  //   setIsLoading(true);
  //   const options = {
  //     amount: input,
  //   };
  //   try {
  //     const res = await createWithdrawals(jsonToFormData(options));
  //     if (res?.success) {
  //       dispatch(getUserInfo());
  //     }
  //     if (!res?.success) {
  //       toast({
  //         position: 'top',
  //         title: 'Error',
  //         description: res?.message,
  //         status: 'error',
  //         duration: 9000,
  //         isClosable: true,
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setShowWithdrawalsModal(false);
  //     setIsLoading(false);
  //     setInput('');
  //   }
  // };

  const sortTransactions = useCallback(
    (preparedSortType, incomesList) => {
      if (preparedSortType === 'Date') {
        const sortedDealsByType = sortByDate(incomesList);
        setFilteredData([...sortedDealsByType]);
        setCurrentIncomeList([...sortedDealsByType]);
      } else if (preparedSortType === 'Gross') {
        const sortedDealsByType = [...incomesList].sort(
          (a, b) => b.gross - a.gross,
        );
        setFilteredData([...sortedDealsByType]);
        setCurrentIncomeList([...sortedDealsByType]);
      } else if (preparedSortType === 'Reverse') {
        const sortedDealsReversed = [...incomesList].reverse();
        setFilteredData([...sortedDealsByType]);
        setCurrentIncomeList([...sortedDealsReversed]);
      }
    },
    [setCurrentIncomeList, setFilteredData],
  );

  const handleFilterByPeriod = useCallback(
    selectedDateType => {
      setDateType(selectedDateType);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();
      const currentWeekStart = new Date(
        currentYear,
        currentMonth,
        currentDay - currentDate.getDay(),
      );
      const currentWeekEnd = new Date(
        currentYear,
        currentMonth,
        currentDay + (6 - currentDate.getDay()),
      );
      let filteredIncomes = [];
      if (selectedDateType === 'All time') {
        filteredIncomes = incomes;
      } else if (selectedDateType === 'This year') {
        filteredIncomes = incomes.filter(el => {
          const incomeDate = new Date(el.createdAt);
          return incomeDate.getFullYear() === currentYear;
        });
      } else if (selectedDateType === 'This month') {
        filteredIncomes = incomes.filter(el => {
          const incomeDate = new Date(el.createdAt);
          return (
            incomeDate.getFullYear() === currentYear &&
            incomeDate.getMonth() === currentMonth
          );
        });
      } else if (selectedDateType === 'This week') {
        filteredIncomes = incomes.filter(el => {
          const incomeDate = new Date(el.createdAt);
          return incomeDate >= currentWeekStart && incomeDate <= currentWeekEnd;
        });
      } else if (selectedDateType === 'Today') {
        filteredIncomes = incomes.filter(el => {
          const incomeDate = new Date(el.createdAt);
          return (
            incomeDate.getFullYear() === currentYear &&
            incomeDate.getMonth() === currentMonth &&
            incomeDate.getDate() === currentDay
          );
        });
      }
      sortTransactions(sortType, filteredIncomes);
    },
    [setDateType, sortTransactions, sortType, incomes],
  );

  // const handleSort = selectedSortType => {
  //   if (selectedSortType === sortType) {
  //     sortTransactions('Reverse', currentIncomeList);
  //     return;
  //   }
  //   setSortType(selectedSortType);
  //   sortTransactions(selectedSortType, currentIncomeList);
  // };

  useEffect(() => {
    incomes && handleFilterByPeriod('This month');
  }, [handleFilterByPeriod, incomes]);

  return (
    <Flex justifyContent="space-between" mb="16px">
      <Flex align={'center'} gap={'15px'} w={'500px'}>
        <Box pos="relative" w="100%" maxW="420px">
          <Icon
            as={CalendarIcon}
            color="stroke"
            boxSize="24px"
            pos="absolute"
            top="50%"
            left="12px"
            transform="translateY(-50%)"
            zIndex={2}
          />
          <CustomSelect
            onChange={e => {
              setIsLoadingSortByPeriod(true);
              handleFilterByPeriod(e.value);
            }}
            value={dateType}
            options={dateOptions}
            plValueContainer="48px"
            isSearchable={false}
            w="100%"
          />
        </Box>

        <Flex alignItems={'center'} gap={'8px'} w={'200px'}>
          <Checkbox
            // isChecked={}
            onChange={() => {
              setIsHideChart(prev => !prev);
            }}
            colorScheme="checkbox"
            borderColor="bg.black"
            size="md"
          />
          <Text sx={poppins_400_16_24}>Hide chart</Text>
        </Flex>
      </Flex>

      <DrawerComponent
        isTransactionsPage={isTransactionsPage}
        getTransactionsQuery={getTransactionsQuery}
      />
      {/* <Flex justify="space-between" align="center" gap="20px" ml="20px">
        <Flex align="center">
          <Text
            fontSize="16px"
            fontWeight="400"
            color="secondary"
            whiteSpace="nowrap"
          >
            Sort by:
          </Text>
          <CustomSelect
            onChange={e => handleSort(e.value)}
            value={sortType}
            bgColor={'none'}
            borderSelect={'none'}
            phColor={'secondary'}
            isInput={false}
            options={sortOptions}
            pxDropdownIcon={'12px'}
            isSearchable={false}
            w="110px"
          />
        </Flex>
      </Flex> */}
    </Flex>
  );
};

export default IncomeHeader;
