import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import FilterIcon from '@/assets/icons/base/filters.svg';

import {
  GetSelectedBap,
  GetSelectedBuyer,
  GetSelectedGenre,
  GetSelectedPerformer,
  GetSelectedReleaseType,
  GetSelectedRole,
  GetSelectedSubGenre,
  GetSortBy,
} from '../../../store/filters/filters.selectors';
import { SelectsForReleaseDrawer } from '../Releases/components/SelectsForReleaseDrawer';
import { SelectsForTransactionsDrawer } from '../transactions/components/SelectsForTransactionsDrawer';
import { SelectsForUsersDrawer } from '../users/components/SelectsForUsersDrawer';
import CustomButton from './buttons/CustomButton';
import { useActions } from '@/hooks/useActions';
import { poppins_500_16_24 } from '@/styles/fontStyles';

export const DrawerComponent = ({
  componentType,
  bapOptions = false,
  rolesOptions = false,
  getUsersQuery = false,
  isReleasePage = false,
  isUsersPage = false,
  genresOptions = false,
  performersOptions = false,
  releaseTypesOptions = false,
  subGenresOptions = false,
  getReleasesQuery = false,
  isTransactionsPage = false,
  getTransactionsQuery = false,
  setIsOpenDrawer = false,
}) => {
  const {
    setSortBy,
    setSelectedReleaseType,
    setSelectedPerformer,
    setSelectedGenre,
    setSelectedSubGenre,
    setSelectedBuyer,
    setSelectedRole,
    setSelectedBap,
  } = useActions();
  const sortBy = GetSortBy();
  const selectedReleaseType = GetSelectedReleaseType();
  const selectedPerformer = GetSelectedPerformer();
  const selectedGenre = GetSelectedGenre();
  const selectedBuyer = GetSelectedBuyer();
  const selectedRole = GetSelectedRole();
  const selectedBap = GetSelectedBap();
  const selectedSubGenre = GetSelectedSubGenre();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const isTransactionComponent = componentType === 'isTransactionComponent';
  const isUserComponent = componentType === 'isUserComponent';

  const countNonEmptyValues = (...values) => {
    const count = values.filter(value => value && value.trim() !== '').length;
    return `(${count})`;
  };

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

  const resetFilters = () => {
    setSortBy(null);
    setSelectedReleaseType(null);
    setSelectedPerformer(null);
    setSelectedSubGenre(null);
    setSelectedBuyer(null);
    setSelectedRole(null);
    setSelectedBap(null);
    setSelectedGenre(null);
    isUsersPage && getUsersQuery();
    isReleasePage && getReleasesQuery();
    isTransactionsPage && getTransactionsQuery();
  };

  // reset filters when unmount component
  useEffect(
    () => () => {
      setSortBy(null);
      setSelectedReleaseType(null);
      setSelectedPerformer(null);
      setSelectedSubGenre(null);
      setSelectedBuyer(null);
      setSelectedRole(null);
      setSelectedBap(null);
      setSelectedGenre(null);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Flex align={'center'} gap={'15px'}>
      <Button
        ref={btnRef}
        leftIcon={<FilterIcon />}
        onClick={() => {
          onOpen();
          setIsOpenDrawer && setIsOpenDrawer(prev => !prev);
        }}
        w={'120px'}
        bg={'transparent'}
        _hover={{}}
        _focus={{}}
        _active={{}}
      >
        <Text
          sx={poppins_500_16_24}
          color={checkForEmptiness() ? 'brand.500' : 'textColor.gray'}
          pt={'3px'}
        >
          Filters{' '}
          {checkForEmptiness() &&
            countNonEmptyValues(
              selectedRole,
              selectedBap,
              sortBy,
              selectedBuyer || selectedReleaseType,
              selectedPerformer,
              selectedGenre,
              selectedSubGenre,
            )}
        </Text>
      </Button>
      {checkForEmptiness() && (
        <CustomButton w={'120px'} h={'30px'} onClickHandler={resetFilters}>
          Reset filters
        </CustomButton>
      )}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={() => {
          onClose();
          setIsOpenDrawer && setIsOpenDrawer(prev => !prev);
        }}
        finalFocusRef={btnRef}
      >
        <DrawerContent
          mt={isTransactionComponent || isUserComponent ? '80px' : '96px'}
          boxShadow={'none'}
          maxW={'420px'}
          p={
            isTransactionComponent
              ? '34px 24px 24px 24px'
              : '40px 24px 24px 24px'
          }
        >
          <DrawerCloseButton
            color={'#919191'}
            mt={isTransactionComponent ? '25px' : '30px'}
          />
          <DrawerHeader p={'0px'}>
            <Flex gap={'8px'}>
              <FilterIcon />
              <Text
                sx={poppins_500_16_24}
                color={checkForEmptiness() ? 'brand.500' : 'textColor.gray'}
                pt={'3px'}
              >
                Filters{' '}
                {checkForEmptiness() &&
                  countNonEmptyValues(
                    selectedRole,
                    selectedBap,
                    sortBy,
                    selectedBuyer || selectedReleaseType,
                    selectedPerformer,
                    selectedGenre,
                    selectedSubGenre,
                  )}
              </Text>
              {/* {checkForEmptiness() && (
                <CustomButton
                  w={'120px'}
                  h={'30px'}
                  onClickHandler={resetFilters}
                >
                  Reset filters
                </CustomButton>
              )} */}
            </Flex>
          </DrawerHeader>

          <DrawerBody pr={'10px'} pl={'0px'} mt={'40px'}>
            <Flex flexDir={'column'} gap={'40px'}>
              {isUsersPage && (
                <SelectsForUsersDrawer
                  bapOptions={bapOptions}
                  rolesOptions={rolesOptions}
                  getUsersQuery={getUsersQuery}
                />
              )}
              {isReleasePage && (
                <SelectsForReleaseDrawer
                  genresOptions={genresOptions}
                  performersOptions={performersOptions}
                  releaseTypesOptions={releaseTypesOptions}
                  subGenresOptions={subGenresOptions}
                  getReleasesQuery={getReleasesQuery}
                />
              )}
              {isTransactionsPage && (
                <SelectsForTransactionsDrawer
                  getTransactionsQuery={getTransactionsQuery}
                />
              )}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
