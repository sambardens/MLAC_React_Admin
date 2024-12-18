const { useSelector } = require('react-redux');

const Baps = () => useSelector(state => state.baps.baps);
const UsersOfBap = () => useSelector(state => state.baps.usersOfBap);
const ReleasesOfBap = () => useSelector(state => state.baps.releasesOfBap);

export { Baps, UsersOfBap, ReleasesOfBap };
