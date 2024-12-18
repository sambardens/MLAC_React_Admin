const { useSelector } = require('react-redux');

const WithdrawalsData = () => useSelector(state => state.withdrawals.withdrawals);

export { WithdrawalsData };
