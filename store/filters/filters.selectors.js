const { useSelector } = require('react-redux');

const GetSortBy = () => useSelector(state => state.filters.sortBy);
const GetSelectedReleaseType = () =>
  useSelector(state => state.filters.selectedReleaseType);
const GetSelectedPerformer = () =>
  useSelector(state => state.filters.selectedPerformer);
const GetSelectedGenre = () =>
  useSelector(state => state.filters.selectedGenre);
const GetSelectedSubGenre = () =>
  useSelector(state => state.filters.selectedSubGenre);
const GetSelectedBuyer = () =>
  useSelector(state => state.filters.selectedBuyer);
const GetSelectedRole = () => useSelector(state => state.filters.selectedRole);
const GetSelectedBap = () => useSelector(state => state.filters.selectedBap);

export {
  GetSortBy,
  GetSelectedReleaseType,
  GetSelectedPerformer,
  GetSelectedGenre,
  GetSelectedSubGenre,
  GetSelectedBuyer,
  GetSelectedRole,
  GetSelectedBap,
};
