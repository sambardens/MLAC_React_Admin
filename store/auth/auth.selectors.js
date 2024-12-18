const { useSelector } = require('react-redux');

const Token = () => useSelector(state => state.auth.token);
const IsLoggedIn = () => useSelector(state => state.auth.isLoggedIn);

export { Token, IsLoggedIn };
