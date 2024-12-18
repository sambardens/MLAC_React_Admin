import { Box } from '@chakra-ui/react';

import {
  GetSelectedBuyer,
  GetSelectedGenre,
  GetSelectedPerformer,
  GetSelectedReleaseType,
  GetSelectedSubGenre,
  GetSortBy,
} from '../../../../store/filters/filters.selectors';
import { UniqueFieldsData } from '../../../../store/transactions/transactions.selectors';
import CustomSelect from '@/components/UI/customInputs/CustomSelect';
import { useActions } from '@/hooks/useActions';
import { transformArrayToOptions } from '@/utils/transformArrayToOptions';

const publicationDateSelectOptions = [
  { value: 'created_date', label: 'Created date' },
];

export const SelectsForTransactionsDrawer = ({
  getTransactionsQuery = false,
}) => {
  const {
    setSortBy,
    setSelectedReleaseType,
    setSelectedPerformer,
    setSelectedGenre,
    setSelectedSubGenre,
    setSelectedBuyer,
  } = useActions();
  const sortBy = GetSortBy();
  const selectedReleaseType = GetSelectedReleaseType();
  const selectedPerformer = GetSelectedPerformer();
  const selectedGenre = GetSelectedGenre();
  const selectedSubGenre = GetSelectedSubGenre();
  const selectedBuyer = GetSelectedBuyer();
  const uniqueFields = UniqueFieldsData();

  const buyersOptions =
    transformArrayToOptions(uniqueFields?.paymentEmail) || [];
  const releaseTypesOptions =
    transformArrayToOptions(uniqueFields?.releaseTypes) || [];
  const performersOptions =
    transformArrayToOptions(uniqueFields?.performers) || [];
  const genresOptions = transformArrayToOptions(uniqueFields?.genres) || [];
  const subGenresOptions =
    transformArrayToOptions(uniqueFields?.subGenres) || [];

  const handleSortingByDate = e => {
    if (!e) {
      setSortBy(null);
      getTransactionsQuery(
        (selectedBuyer ? `?buyer=${selectedBuyer}` : '') +
          (selectedReleaseType
            ? `${!selectedBuyer ? '?' : '&'}type=${selectedReleaseType}`
            : '') +
          (selectedPerformer
            ? `${
                !selectedReleaseType && !selectedBuyer ? '?' : '&'
              }performer=${selectedPerformer}`
            : '') +
          (selectedGenre
            ? `${
                !selectedReleaseType && !selectedPerformer && !selectedBuyer
                  ? '?'
                  : '&'
              }mainGenre=${selectedGenre}`
            : '') +
          (selectedSubGenre
            ? `${
                !selectedReleaseType &&
                !selectedPerformer &&
                !selectedGenre &&
                !selectedBuyer
                  ? '?'
                  : '&'
              }subGenres=${selectedSubGenre}`
            : ''),
      );
      return;
    } else {
      setSortBy(e.value);
      getTransactionsQuery(
        `?orderBy=createdAt${
          (selectedBuyer ? `&buyer=${selectedBuyer}` : '') +
          (selectedReleaseType ? `&type=${selectedReleaseType}` : '') +
          (selectedPerformer ? `&performer=${selectedPerformer}` : '') +
          (selectedGenre ? `&mainGenre=${selectedGenre}` : '') +
          (selectedSubGenre ? `&subGenres=${selectedSubGenre}` : '')
        }`,
      );
    }
  };

  const sortByBuyer = e => {
    if (!e) {
      setSelectedBuyer(null);
      getTransactionsQuery(
        (sortBy ? `?orderBy=createdAt` : '') +
          (selectedReleaseType
            ? `${!sortBy ? '?' : '&'}type=${selectedReleaseType}`
            : '') +
          (selectedPerformer
            ? `${
                !sortBy && !selectedReleaseType ? '?' : '&'
              }performer=${selectedPerformer}`
            : '') +
          (selectedGenre
            ? `${
                !sortBy && !selectedPerformer && !selectedReleaseType
                  ? '?'
                  : '&'
              }mainGenre=${selectedGenre}`
            : '') +
          (selectedSubGenre
            ? `${
                !sortBy &&
                !selectedPerformer &&
                !selectedGenre &&
                !selectedReleaseType
                  ? '?'
                  : '&'
              }subGenres=${selectedSubGenre}`
            : ''),
      );
      return;
    } else {
      setSelectedBuyer(e.value);
      getTransactionsQuery(
        `?buyer=${e.value}` +
          (selectedReleaseType ? `&type=${selectedReleaseType}` : '') +
          (sortBy ? `&orderBy=createdAt` : '') +
          (selectedPerformer ? `&performer=${selectedPerformer}` : '') +
          (selectedGenre ? `&mainGenre=${selectedGenre}` : '') +
          (selectedSubGenre ? `&subGenres=${selectedSubGenre}` : ''),
      );
    }
  };

  const sortByReleaseType = e => {
    if (!e) {
      setSelectedReleaseType(null);
      getTransactionsQuery(
        (sortBy ? `?orderBy=createdAt` : '') +
          (selectedBuyer
            ? `${!sortBy ? '?' : '&'}buyer=${selectedBuyer}`
            : '') +
          (selectedPerformer
            ? `${
                !sortBy && !selectedBuyer ? '?' : '&'
              }performer=${selectedPerformer}`
            : '') +
          (selectedGenre
            ? `${
                !sortBy && !selectedPerformer && !selectedBuyer ? '?' : '&'
              }mainGenre=${selectedGenre}`
            : '') +
          (selectedSubGenre
            ? `${
                !sortBy &&
                !selectedPerformer &&
                !selectedGenre &&
                !selectedBuyer
                  ? '?'
                  : '&'
              }subGenres=${selectedSubGenre}`
            : ''),
      );
      return;
    } else {
      setSelectedReleaseType(e.value);
      getTransactionsQuery(
        `&type=${e.value}` +
          (sortBy ? `&orderBy=createdAt` : '') +
          (selectedBuyer ? `&buyer=${selectedBuyer}` : '') +
          (selectedPerformer ? `&performer=${selectedPerformer}` : '') +
          (selectedGenre ? `&mainGenre=${selectedGenre}` : '') +
          (selectedSubGenre ? `&subGenres=${selectedSubGenre}` : ''),
      );
    }
  };

  const sortByPerformer = e => {
    if (!e) {
      setSelectedPerformer(null);
      getTransactionsQuery(
        (sortBy ? `?orderBy=createdAt` : '') +
          (selectedBuyer
            ? `${!sortBy ? '?' : '&'}buyer=${selectedBuyer}`
            : '') +
          (selectedReleaseType
            ? `${
                !sortBy && !selectedBuyer ? '?' : '&'
              }type=${selectedReleaseType}`
            : '') +
          (selectedGenre
            ? `${
                !sortBy && !selectedReleaseType && !selectedBuyer ? '?' : '&'
              }mainGenre=${selectedGenre}`
            : '') +
          (selectedSubGenre
            ? `${
                !sortBy &&
                !selectedReleaseType &&
                !selectedGenre &&
                !selectedBuyer
                  ? '?'
                  : '&'
              }subGenres=${selectedSubGenre}`
            : ''),
      );
      return;
    } else {
      setSelectedPerformer(e.value);
      getTransactionsQuery(
        `?performer=${e.value}` +
          (sortBy ? `&orderBy=createdAt` : '') +
          (selectedBuyer ? `&buyer=${selectedBuyer}` : '') +
          (selectedReleaseType ? `&type=${selectedReleaseType}` : '') +
          (selectedGenre ? `&mainGenre=${selectedGenre}` : '') +
          (selectedSubGenre ? `&subGenres=${selectedSubGenre}` : ''),
      );
    }
  };

  const sortByGenre = e => {
    if (!e) {
      setSelectedGenre(null);
      getTransactionsQuery(
        (sortBy ? `?orderBy=createdAt` : '') +
          (selectedBuyer
            ? `${!sortBy ? '?' : '&'}buyer=${selectedBuyer}`
            : '') +
          (selectedReleaseType
            ? `${
                !sortBy && !selectedBuyer ? '?' : '&'
              }type=${selectedReleaseType}`
            : '') +
          (selectedPerformer
            ? `${
                !sortBy && !selectedReleaseType && !selectedBuyer ? '?' : '&'
              }performer=${selectedPerformer}`
            : '') +
          (selectedSubGenre
            ? `${
                !sortBy &&
                !selectedReleaseType &&
                !selectedPerformer &&
                !selectedBuyer
                  ? '?'
                  : '&'
              }subGenres=${selectedSubGenre}`
            : ''),
      );
      return;
    } else {
      setSelectedGenre(e.value);
      getTransactionsQuery(
        `?mainGenre=${e.value}` +
          (sortBy ? `&orderBy=createdAt` : '') +
          (selectedBuyer ? `&buyer=${selectedBuyer}` : '') +
          (selectedReleaseType ? `&type=${selectedReleaseType}` : '') +
          (selectedPerformer ? `&performer=${selectedPerformer}` : '') +
          (selectedSubGenre ? `&subGenres=${selectedSubGenre}` : ''),
      );
    }
  };

  const sortBySubGenre = e => {
    if (!e) {
      setSelectedSubGenre(null);
      getTransactionsQuery(
        (sortBy ? `?orderBy=createdAt` : '') +
          (selectedBuyer
            ? `${!sortBy ? '?' : '&'}buyer=${selectedBuyer}`
            : '') +
          (selectedReleaseType
            ? `${
                !sortBy && !selectedBuyer ? '?' : '&'
              }type=${selectedReleaseType}`
            : '') +
          (selectedPerformer
            ? `${
                !sortBy && !selectedReleaseType && !selectedBuyer ? '?' : '&'
              }performer=${selectedPerformer}`
            : '') +
          (selectedGenre
            ? `${
                !sortBy &&
                !selectedReleaseType &&
                !selectedPerformer &&
                !selectedBuyer
                  ? '?'
                  : '&'
              }mainGenres=${selectedGenre}`
            : ''),
      );
      return;
    } else {
      setSelectedSubGenre(e.value);
      getTransactionsQuery(
        `?subGenres=${e.value}` +
          (sortBy ? `&orderBy=createdAt` : '') +
          (selectedBuyer ? `&buyer=${selectedBuyer}` : '') +
          (selectedReleaseType ? `&type=${selectedReleaseType}` : '') +
          (selectedPerformer ? `&performer=${selectedPerformer}` : '') +
          (selectedGenre ? `&mainGenres=${selectedGenre}` : ''),
      );
    }
  };

  return (
    <>
      <Box position={'relative'}>
        <CustomSelect
          onChange={e => {
            handleSortingByDate(e);
          }}
          value={sortBy}
          options={publicationDateSelectOptions}
          isSearchable={false}
          w="100%"
          placeholder={'Change sort by'}
          label={'Sort by'}
          plValueContainer={'12px'}
          mbLabel="4px"
          mlLabel="0px"
          isClearable={true}
        />
      </Box>
      <CustomSelect
        onChange={e => {
          sortByBuyer(e);
        }}
        value={selectedBuyer}
        options={buyersOptions}
        isSearchable={true}
        isClearable={true}
        w="100%"
        placeholder={'All'}
        label={'Buyer'}
        plValueContainer={'12px'}
        mbLabel="4px"
        mlLabel="0px"
      />
      <CustomSelect
        onChange={e => {
          sortByReleaseType(e);
        }}
        value={selectedReleaseType}
        options={releaseTypesOptions}
        isSearchable={true}
        isClearable={true}
        w="100%"
        placeholder={'All'}
        label={'Release type'}
        plValueContainer={'12px'}
        mbLabel="4px"
        mlLabel="0px"
      />

      <CustomSelect
        onChange={e => {
          sortByPerformer(e);
        }}
        value={selectedPerformer}
        options={performersOptions}
        isSearchable={true}
        isClearable={true}
        w="100%"
        placeholder={'All'}
        label={'Performer'}
        plValueContainer={'12px'}
        mbLabel="4px"
        mlLabel="0px"
      />
      <CustomSelect
        onChange={e => {
          sortByGenre(e);
        }}
        value={selectedGenre}
        options={genresOptions}
        isSearchable={true}
        isClearable={true}
        w="100%"
        placeholder={'All'}
        label={'Genre'}
        plValueContainer={'12px'}
        mbLabel="4px"
        mlLabel="0px"
      />
      <CustomSelect
        onChange={e => {
          sortBySubGenre(e);
        }}
        value={selectedSubGenre}
        options={subGenresOptions}
        isSearchable={true}
        isClearable={true}
        w="100%"
        placeholder={'All'}
        label={'Subgenres (optional)'}
        plValueContainer={'12px'}
        mbLabel="4px"
        mlLabel="0px"
      />
    </>
  );
};
