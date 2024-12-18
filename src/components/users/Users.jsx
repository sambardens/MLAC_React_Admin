import { useRouter } from 'next/router';

import { Box, Flex, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { useCallback, useLayoutEffect, useState } from 'react';

import { useGetMembersOfBapQuery } from '../../../store/bap/bap.api';
import { UsersOfBap } from '../../../store/bap/bap.selectors';
import {
  GetSelectedBap,
  GetSelectedRole,
  GetSortBy,
} from '../../../store/filters/filters.selectors';
import {
  useGetUniqueFieldsForUserQuery,
  useLazyGetUsersQuery,
} from '../../../store/users/users.api';
import { PaginationProvider } from '../layouts/PaginationLayout';
import FullPageLoader from '../loaders/FullPageLoader';
import { ItemUserCard } from './components/ItemUserCard';
import { UsersHeader } from './components/UsersHeader';
import usePagedData from '@/hooks/usePageData';
import { transformArrayToOptions } from '@/utils/transformArrayToOptions';
import { calculateActivityPercentage } from '@/utils/users/calculateActivityPercentage';
import { isEqual } from '@/utils/users/isEqualArray';

export const Users = ({ isBapPage = false }) => {
  const router = useRouter();
  const usersOfBap = UsersOfBap();
  const [getUsers, resultGetUsers] = useLazyGetUsersQuery();
  const { data: uniqueFields, isLoading: isLoadingFilters } =
    useGetUniqueFieldsForUserQuery();
  const { dataUsers, isLoading: isLoadingUsersOfBap } = useGetMembersOfBapQuery(
    router.query.bapId,
    {
      skip: !router.query.bapId && !isBapPage,
    },
  );

  const bapOptions = transformArrayToOptions(uniqueFields?.user?.performers);
  const rolesOptions = transformArrayToOptions(uniqueFields?.user?.roles);

  const [allUsers, setAllUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [newFilteredArr, setNewFilteredArr] = useState([]);

  const sortBy = GetSortBy();
  const selectedRole = GetSelectedRole();
  const selectedBap = GetSelectedBap();

  const getUsersQuery = useCallback(
    async paramsQuery => {
      try {
        const { data } = await getUsers(paramsQuery);
        !paramsQuery && setAllUsers(data?.user);
        setFilteredUsers(data?.user);
      } catch (error) {
        console.error('error');
      }
    },
    [getUsers],
  );

  useLayoutEffect(() => {
    isBapPage ? setFilteredUsers(usersOfBap) : getUsersQuery();
  }, [dataUsers, getUsersQuery, isBapPage, usersOfBap]);

  const { currentItems, currentFilteredItems, pageCount, handlePageChange } =
    usePagedData(filteredUsers, newFilteredArr);

  const checkingActualArray = () => {
    if (newFilteredArr) {
      return currentFilteredItems;
    } else {
      return currentItems;
    }
  };

  const checkForEmptiness = () => {
    return sortBy || selectedRole || selectedBap;
  };

  const activityPercentage = calculateActivityPercentage(allUsers);
  const isEqualArrays = isEqual(allUsers, filteredUsers);

  return (
    <Box position={'relative'} h="100%">
      {resultGetUsers?.isLoading || isLoadingUsersOfBap ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          h="78vh"
          position="relative"
        >
          <FullPageLoader position="absolute" />
        </Flex>
      ) : (
        <>
          <UsersHeader
            isBapPage={isBapPage}
            isUsersPage={true}
            arrForFilter={filteredUsers}
            setNewFilteredArr={setNewFilteredArr}
            isLoading={resultGetUsers?.isLoading || isLoadingUsersOfBap}
            currentItems={currentItems}
            handlePageChange={handlePageChange}
            componentType={'isUserComponent'}
            bapOptions={bapOptions}
            rolesOptions={rolesOptions}
            getUsersQuery={getUsersQuery}
            activityPercentage={activityPercentage}
            setFilteredUsers={setFilteredUsers}
            isEqualArrays={isEqualArrays}
          />
          <PaginationProvider
            onPageChange={handlePageChange}
            pageCount={pageCount}
          >
            {filteredUsers?.length !== 0 && (
              <UnorderedList
                width={'100%'}
                gap={'4px'}
                display={'flex'}
                flexDir="column"
                justify="center"
                margin={'0px'}
                h={isBapPage ? `calc(100vh - 370px)` : `calc(100vh - 256px)`}
                overflowY={'overlay'}
                mt={'24px'}
              >
                {checkingActualArray()?.map(user => {
                  // console.log(user, 'user');
                  return (
                    <ListItem
                      key={user?.id}
                      listStyleType={'none'}
                      onClick={() => {
                        router.push(
                          `/users/${isBapPage ? user.userId : user.id}`,
                        );
                      }}
                    >
                      <ItemUserCard user={user} />
                    </ListItem>
                  );
                })}
              </UnorderedList>
            )}

            {filteredUsers?.length === 0 &&
              !resultGetUsers?.isLoading &&
              !resultGetUsers?.isFetching &&
              !checkForEmptiness() && (
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
                    No users found
                  </Text>
                </Box>
              )}

            {filteredUsers?.length === 0 &&
              !resultGetUsers?.isLoading &&
              !resultGetUsers?.isFetching &&
              checkForEmptiness() && (
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
                    No data for selected filters
                  </Text>
                </Box>
              )}
          </PaginationProvider>
        </>
      )}
    </Box>
  );
};
