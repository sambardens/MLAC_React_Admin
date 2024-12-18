import { Box, Flex, Text } from '@chakra-ui/react';
import { useLayoutEffect, useState } from 'react';

import SortIcon from '@/assets/icons/base/sort.svg';

import { useGetBapsQuery } from '../../../store/bap/bap.api';
import { Search } from '../UI/Search';
import { PaginationProvider } from '../layouts/PaginationLayout';
import FullPageLoader from '../loaders/FullPageLoader';
import BapCard from './components/BapCard';
import usePagedData from '@/hooks/usePageData';
import { poppins_500_16_24 } from '@/styles/fontStyles';

export const Bap = () => {
  const { data, isLoading } = useGetBapsQuery();
  const [sorted, setSorted] = useState(false);
  const [newFilteredArr, setNewFilteredArr] = useState(null);
  const [baps, setBaps] = useState([]);

  useLayoutEffect(() => {
    if (data?.baps) {
      setBaps(data?.baps);
    }
  }, [data?.baps]);

  const { currentItems, currentFilteredItems, pageCount, handlePageChange } =
    usePagedData(baps, newFilteredArr);

  const sortedArray = () => {
    const sortingOrder = sorted ? (a, b) => a.id - b.id : (a, b) => b.id - a.id;
    const newArr = baps?.slice()?.sort(sortingOrder);
    const newFilteredArray = newFilteredArr?.slice()?.sort(sortingOrder);
    setSorted(!sorted);
    setBaps(newFilteredArr ? newFilteredArray : newArr);
  };

  const checkingActualArray = () => {
    if (newFilteredArr) {
      return currentFilteredItems;
    } else {
      return currentItems;
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
          {' '}
          <Flex
            w={'100%'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Search
              arrForFilter={baps}
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
          <PaginationProvider
            onPageChange={handlePageChange}
            pageCount={pageCount}
          >
            <Flex
              as="ul"
              alignItems="space-between"
              gap="16px"
              w="100%"
              flexWrap="wrap"
              mt={'24px'}
              h={`calc(100vh - 304px)`}
              overflowY={'overlay'}
            >
              {checkingActualArray()?.map(bap => {
                return <BapCard key={bap.id} bap={bap} />;
              })}
            </Flex>
          </PaginationProvider>
        </Box>
      )}
    </Box>
  );
};
