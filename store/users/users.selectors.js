const { useSelector } = require('react-redux');

const UsersData = () => useSelector(state => state.users.users);
const ItemUser = () => useSelector(state => state.users.itemUser);

export { UsersData, ItemUser };
