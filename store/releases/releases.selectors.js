const { useSelector } = require('react-redux');

const ReleasesAll = () => useSelector(state => state.releases.releases);
const CurrentRelease = () => useSelector(state => state.releases.itemRelease);

export { ReleasesAll, CurrentRelease };
