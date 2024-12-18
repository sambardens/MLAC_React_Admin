import { Box } from '@chakra-ui/react';

import {
  GetSelectedGenre,
  GetSelectedPerformer,
  GetSelectedReleaseType,
  GetSelectedSubGenre,
  GetSortBy,
} from '../../../../store/filters/filters.selectors';
import CustomSelect from '@/components/UI/customInputs/CustomSelect';
import { useActions } from '@/hooks/useActions';

const publicationDateSelectOptions = [
  { value: 'created_date', label: 'Created date' },
];

export const SelectsForReleaseDrawer = ({
  genresOptions = false,
  performersOptions = false,
  releaseTypesOptions = false,
  subGenresOptions = false,
  getReleasesQuery = false,
}) => {
  const {
    setSortBy,
    setSelectedReleaseType,
    setSelectedPerformer,
    setSelectedGenre,
    setSelectedSubGenre,
  } = useActions();
  const sortBy = GetSortBy();
  const selectedReleaseType = GetSelectedReleaseType();
  const selectedPerformer = GetSelectedPerformer();
  const selectedGenre = GetSelectedGenre();
  const selectedSubGenre = GetSelectedSubGenre();

  const handleSortingByDate = e => {
    if (!e) {
      setSortBy(null);
      getReleasesQuery(
        '' +
          (selectedReleaseType ? `?type=${selectedReleaseType}` : '') +
          (selectedPerformer
            ? `${
                !selectedReleaseType ? '?' : '&'
              }performer=${selectedPerformer}`
            : '') +
          (selectedGenre
            ? `${
                !selectedReleaseType && !selectedPerformer ? '?' : '&'
              }mainGenre=${selectedGenre}`
            : '') +
          (selectedSubGenre
            ? `${
                !selectedReleaseType && !selectedPerformer && !selectedGenre
                  ? '?'
                  : '&'
              }subGenres=${selectedSubGenre}`
            : ''),
      );
      return;
    } else {
      setSortBy(e.value);
      getReleasesQuery(
        `?orderBy=createdAt${
          (selectedReleaseType ? `&type=${selectedReleaseType}` : '') +
          (selectedPerformer ? `&performer=${selectedPerformer}` : '') +
          (selectedGenre ? `&mainGenre=${selectedGenre}` : '') +
          (selectedSubGenre ? `&subGenres=${selectedSubGenre}` : '')
        }`,
      );
    }
  };

  const sortByReleaseType = e => {
    if (!e) {
      setSelectedReleaseType(null);
      getReleasesQuery(
        (sortBy ? `?orderBy=createdAt` : '') +
          (selectedPerformer
            ? `${!sortBy ? '?' : '&'}performer=${selectedPerformer}`
            : '') +
          (selectedGenre
            ? `${
                !sortBy && !selectedPerformer ? '?' : '&'
              }mainGenre=${selectedGenre}`
            : '') +
          (selectedSubGenre
            ? `${
                !sortBy && !selectedPerformer && !selectedGenre ? '?' : '&'
              }subGenres=${selectedSubGenre}`
            : ''),
      );
      return;
    } else {
      setSelectedReleaseType(e.value);
      getReleasesQuery(
        `?type=${e.value}` +
          (sortBy ? `&orderBy=createdAt` : '') +
          (selectedPerformer ? `&performer=${selectedPerformer}` : '') +
          (selectedGenre ? `&mainGenre=${selectedGenre}` : '') +
          (selectedSubGenre ? `&subGenres=${selectedSubGenre}` : ''),
      );
    }
  };

  const sortByPerformer = e => {
    if (!e) {
      setSelectedPerformer(null);
      getReleasesQuery(
        (sortBy ? `?orderBy=createdAt` : '') +
          (selectedReleaseType
            ? `${!sortBy ? '?' : '&'}type=${selectedReleaseType}`
            : '') +
          (selectedGenre
            ? `${
                !sortBy && !selectedReleaseType ? '?' : '&'
              }mainGenre=${selectedGenre}`
            : '') +
          (selectedSubGenre
            ? `${
                !sortBy && !selectedReleaseType && !selectedGenre ? '?' : '&'
              }subGenres=${selectedSubGenre}`
            : ''),
      );
      return;
    } else {
      setSelectedPerformer(e.value);
      getReleasesQuery(
        `?performer=${e.value}` +
          (sortBy ? `&orderBy=createdAt` : '') +
          (selectedReleaseType ? `&type=${selectedReleaseType}` : '') +
          (selectedGenre ? `&mainGenre=${selectedGenre}` : '') +
          (selectedSubGenre ? `&subGenres=${selectedSubGenre}` : ''),
      );
    }
  };

  const sortByGenre = e => {
    if (!e) {
      setSelectedGenre(null);
      getReleasesQuery(
        (sortBy ? `?orderBy=createdAt` : '') +
          (selectedReleaseType
            ? `${!sortBy ? '?' : '&'}type=${selectedReleaseType}`
            : '') +
          (selectedPerformer
            ? `${
                !sortBy && !selectedReleaseType ? '?' : '&'
              }performer=${selectedPerformer}`
            : '') +
          (selectedSubGenre
            ? `${
                !sortBy && !selectedReleaseType && !selectedPerformer
                  ? '?'
                  : '&'
              }subGenres=${selectedSubGenre}`
            : ''),
      );
      return;
    } else {
      setSelectedGenre(e.value);
      getReleasesQuery(
        `?mainGenre=${e.value}` +
          (sortBy ? `&orderBy=createdAt` : '') +
          (selectedReleaseType ? `&type=${selectedReleaseType}` : '') +
          (selectedPerformer ? `&performer=${selectedPerformer}` : '') +
          (selectedSubGenre ? `&subGenres=${selectedSubGenre}` : ''),
      );
    }
  };

  const sortBySubGenre = e => {
    if (!e) {
      setSelectedSubGenre(null);
      getReleasesQuery(
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
                !sortBy && !selectedReleaseType && !selectedPerformer
                  ? '?'
                  : '&'
              }mainGenres=${selectedGenre}`
            : ''),
      );
      return;
    } else {
      setSelectedSubGenre(e.value);
      getReleasesQuery(
        `?subGenres=${e.value}` +
          (sortBy ? `&orderBy=createdAt` : '') +
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
