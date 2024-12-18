const { useSelector } = require('react-redux');

const TransactionsAll = () =>
  useSelector(state => state.transactions.transactions);

const FilteredData = () =>
  useSelector(state => state.transactions.filteredData);

const UniqueFieldsData = () =>
  useSelector(state => state.transactions.uniqueFields);

const TransactionDetail = () =>
  useSelector(state => state.transactions.transactionDetail);

export { TransactionsAll, FilteredData, UniqueFieldsData, TransactionDetail };
