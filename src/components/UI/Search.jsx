import { Box, Input } from '@chakra-ui/react';
import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';

import SearchIcon from '@/assets/icons/downloads/search.svg';

export const Search = ({
  arrForFilter,
  setterNewFilteredArr,
  isLoading = false,
  currentItems,
  handlePageChange,
  w = false,
}) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const debouncedFilter = debounce(value => {
      const filteredArr = arrForFilter?.filter(item => {
        return (
          item?.name?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
          item?.lastName?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
          item?.firstName
            ?.toLowerCase()
            ?.includes(searchValue?.toLowerCase()) ||
          item?.role?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
          item?.title?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
          item?.band?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
          item?.email?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
          item?.paymentEmail
            ?.toLowerCase()
            ?.includes(searchValue?.toLowerCase())
        );
      });

      if (value === '') {
        setterNewFilteredArr(null);
        currentItems;
      } else {
        setterNewFilteredArr(filteredArr);
        handlePageChange({ selected: 0 });
      }
    }, 500);

    if (!isLoading) {
      debouncedFilter(searchValue);
    }

    return () => {
      debouncedFilter.cancel();
    };
  }, [
    arrForFilter,
    currentItems,
    isLoading,
    searchValue,
    setterNewFilteredArr,
    handlePageChange,
  ]);

  const filterHandler = ({ target }) => {
    setSearchValue(target.value);
  };

  return (
    <Box position={'relative'} w={'350px'}>
      <Input
        w={'100%'}
        borderRadius={'10px'}
        border={'1px'}
        borderColor={'main.lightGray'}
        p={'16px 12px 16px 48px'}
        h={'56px'}
        focusBorderColor={'transparent'}
        _hover={{}}
        _focus={{ borderColor: 'main.lightGray' }}
        placeholder={'Search'}
        _placeholder={{ color: 'textColor.lightGray' }}
        value={searchValue}
        onChange={filterHandler}
        bg={'main.white'}
      />
      <Box position={'absolute'} top={'15px'} left={'15px'} zIndex={50}>
        <SearchIcon />
      </Box>
    </Box>
  );
};
