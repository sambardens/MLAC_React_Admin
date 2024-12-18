import { Box, Flex, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import SortIcon from '@/assets/icons/base/sort.svg';

import { useGetWithdrawalsQuery } from '../../../store/withdrawals/withdrawals.api';
import { WithdrawalsData } from '../../../store/withdrawals/withdrawals.selectors';
import { Search } from '../UI/Search';
import { PaginationProvider } from '../layouts/PaginationLayout';
import FullPageLoader from '../loaders/FullPageLoader';
import { HeaderTable } from './components/HeaderTable';
import { ItemWithdrawalsCard } from './components/ItemWithdrawalsCard';
import { poppins_500_16_24 } from '@/styles/fontStyles';
import sortByDate from '@/utils/sort/sortByDate';

export const Withdrawals = () => {
  const { isLoading } = useGetWithdrawalsQuery();
  const [sorted, setSorted] = useState(false);
  const [withdrawals, setWithdrawals] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);
  const [currentFilteredItems, setCurrentFilteredItems] = useState(null);
  const [newFilteredArr, setNewFilteredArr] = useState(null);

  const withdrawalsData = WithdrawalsData();

  useEffect(() => {
    setWithdrawals(withdrawalsData);
  }, [withdrawalsData]);

  useEffect(() => {
    if (withdrawals && !newFilteredArr) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(withdrawals.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(withdrawals.length / itemsPerPage));
    } else if (withdrawals && newFilteredArr) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentFilteredItems(newFilteredArr.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(newFilteredArr.length / itemsPerPage));
    }
  }, [withdrawals, itemOffset, itemsPerPage, newFilteredArr]);

  const handlePageChange = event => {
    const newOffset = (event.selected * itemsPerPage) % withdrawals?.length;
    const newFilteredOffset =
      (event.selected * itemsPerPage) % newFilteredArr?.length;
    setItemOffset(newFilteredArr ? newFilteredOffset : newOffset);
  };

  const checkingActualArray = () => {
    if (newFilteredArr) {
      return currentFilteredItems;
    } else {
      return currentItems;
    }
  };

  const sortedArray = () => {
    if (!sorted) {
      setSorted(true);
      setWithdrawals(sortByDate(withdrawals));
    } else {
      setSorted(false);
      setWithdrawals(withdrawalsData);
    }
  };

  return (
    <Box position={'relative'} h="100%">
      {isLoading ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          h="78vh"
          position="relative"
        >
          <FullPageLoader position="absolute" />
        </Flex>
      ) : (
        <Box
          p={'24px'}
          bg={'bg.main'}
          borderRadius={'10px'}
          position="relative"
          minH="84vh"
        >
          <Flex
            w={'100%'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Search
              arrForFilter={withdrawals}
              setterNewFilteredArr={setNewFilteredArr}
              isLoading={isLoading}
              currentItems={currentItems}
              handlePageChange={handlePageChange}
            />
            <Flex
              alignItems={'center'}
              gap={'8px'}
              cursor={'pointer'}
              onClick={sortedArray}
            >
              <SortIcon color={sorted ? 'red' : '#919191'} />
              <Text sx={poppins_500_16_24} color={'brand.200'}>
                {`Sort: ${sorted ? 'last created' : 'first created'}`}
              </Text>
            </Flex>
          </Flex>

          <HeaderTable />

          <PaginationProvider
            onPageChange={handlePageChange}
            pageCount={pageCount}
          >
            {checkingActualArray()?.length === 0 && (
              <Text mt={'15%'}>No data</Text>
            )}
            <UnorderedList
              width={'100%'}
              gap={'4px'}
              display={'flex'}
              flexDir="column"
              justify="center"
              margin={'0px'}
              h={`calc(100vh - 329px)`}
              overflowY={'overlay'}
              mt={'5px'}
            >
              {checkingActualArray()?.map(itemData => {
                return (
                  <ListItem key={itemData?.id} listStyleType={'none'}>
                    <ItemWithdrawalsCard itemData={itemData} />
                  </ListItem>
                );
              })}
            </UnorderedList>
          </PaginationProvider>
        </Box>
      )}
    </Box>
  );
};
