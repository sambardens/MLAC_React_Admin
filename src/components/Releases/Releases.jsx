import { useRouter } from 'next/router';

import { Box, Flex, Text } from '@chakra-ui/react';
import { useCallback, useLayoutEffect, useState } from 'react';

import { useGetReleasesOfBapQuery } from '../../../store/bap/bap.api';
import { ReleasesOfBap } from '../../../store/bap/bap.selectors';
import {
  GetSelectedGenre,
  GetSelectedPerformer,
  GetSelectedReleaseType,
  GetSelectedSubGenre,
  GetSortBy,
} from '../../../store/filters/filters.selectors';
import {
  useGetUniqueFieldsForReleasesQuery,
  useLazyGetReleasesQuery,
} from '../../../store/releases/releases.api';
import { ReleasesAll } from '../../../store/releases/releases.selectors';
import { DrawerComponent } from '../UI/Drawer';
import { Search } from '../UI/Search';
import { PaginationProvider } from '../layouts/PaginationLayout';
import FullPageLoader from '../loaders/FullPageLoader';
import ReleaseCard from './components/ReleaseCard';
import usePagedData from '@/hooks/usePageData';
import { transformArrayToOptions } from '@/utils/transformArrayToOptions';

export const Releases = ({ isBapPage }) => {
  const { query } = useRouter();
  const [getReleases, resultGetReleases] = useLazyGetReleasesQuery();
  const { data, isLoading } = useGetReleasesOfBapQuery(query?.bapId, {
    skip: !query?.bapId,
  });
  const { data: dataUnique, isLoading: isLoadingFilters } =
    useGetUniqueFieldsForReleasesQuery();

  const genresOptions = transformArrayToOptions(
    dataUnique?.uniqueFields?.genres,
  );
  const performersOptions = transformArrayToOptions(
    dataUnique?.uniqueFields?.performers,
  );
  const releaseTypesOptions = transformArrayToOptions(
    dataUnique?.uniqueFields?.releaseTypes,
  );
  const subGenresOptions = transformArrayToOptions(
    dataUnique?.uniqueFields?.subGenres,
  );

  const releasesOfBap = ReleasesOfBap();

  const [newFilteredArr, setNewFilteredArr] = useState([]);
  const [releases, setReleases] = useState([]);

  const sortBy = GetSortBy();
  const selectedReleaseType = GetSelectedReleaseType();
  const selectedPerformer = GetSelectedPerformer();
  const selectedGenre = GetSelectedGenre();
  const selectedSubGenre = GetSelectedSubGenre();

  const getReleasesQuery = useCallback(
    async paramsQuery => {
      try {
        const { data } = await getReleases(paramsQuery);
        setReleases(data?.releases);
      } catch (error) {
        console.error('error');
      }
    },
    [getReleases],
  );

  useLayoutEffect(() => {
    isBapPage ? setReleases(releasesOfBap) : getReleasesQuery();
  }, [getReleasesQuery, isBapPage, releasesOfBap]);

  const { currentItems, currentFilteredItems, pageCount, handlePageChange } =
    usePagedData(releases, newFilteredArr);

  const checkingActualArray = () => {
    if (newFilteredArr) {
      return currentFilteredItems;
    } else {
      return currentItems;
    }
  };

  const checkForEmptiness = () => {
    return (
      sortBy ||
      selectedReleaseType ||
      selectedPerformer ||
      selectedGenre ||
      selectedSubGenre
    );
  };

  return (
    <Box position={'relative'} h="100%">
      {isLoading || resultGetReleases?.isLoading ? (
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
          p={!isBapPage && '24px'}
          bg={'bg.main'}
          borderRadius={'10px'}
          position="relative"
          minH={isBapPage ? `calc(100vh - 250px)` : `calc(100vh - 112px)`}
        >
          <Flex
            w={'100%'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Search
              arrForFilter={releases}
              setterNewFilteredArr={setNewFilteredArr}
              isLoading={isLoading}
              currentItems={currentItems}
              handlePageChange={handlePageChange}
            />
            {!isBapPage && (
              <DrawerComponent
                isReleasePage={true}
                genresOptions={genresOptions}
                performersOptions={performersOptions}
                releaseTypesOptions={releaseTypesOptions}
                subGenresOptions={subGenresOptions}
                getReleasesQuery={getReleasesQuery}
              />
            )}
          </Flex>
          {checkingActualArray()?.length !== 0 ? (
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
                h={`calc(100vh - 305px)`}
                overflowY={'overlay'}
              >
                {checkingActualArray()?.map(release => {
                  return <ReleaseCard key={release.id} release={release} />;
                })}
              </Flex>
            </PaginationProvider>
          ) : (
            !isLoading &&
            !resultGetReleases?.isLoading &&
            data?.baps?.length === 0 && (
              <Flex
                alignItems={'center'}
                justifyContent={'center'}
                mt={'200px'}
              >
                <Text
                  color="black"
                  fontSize="18px"
                  fontWeight="600"
                  textAlign="center"
                >
                  There are no releases in this bap
                </Text>
              </Flex>
            )
          )}
        </Box>
      )}
      {checkingActualArray()?.length === 0 &&
        !resultGetReleases?.isLoading &&
        !resultGetReleases?.isFetching &&
        checkForEmptiness() && (
          <Box h={'50px'}>
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
    </Box>
  );
};
