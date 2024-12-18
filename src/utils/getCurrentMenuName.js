export function getCurrentMenuName(path) {
  if (path.startsWith('/releases')) {
    return 'Releases';
  }
  if (path.startsWith('/transactions')) {
    return 'Transactions';
  }
  if (path.startsWith('/users')) {
    return 'Users';
  }
  if (path.startsWith('/bap')) {
    return 'B.A.P.';
  }
  if (path.startsWith('/withdrawals')) {
    return 'Withdrawals';
  }
}
