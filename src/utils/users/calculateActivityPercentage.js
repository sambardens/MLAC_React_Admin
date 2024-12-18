export const calculateActivityPercentage = users => {
  if (!users) {
    return;
  }
  const currentDate = new Date();
  const oneDay = 24 * 60 * 60 * 1000; // number of milliseconds in one day
  const oneWeek = 7 * oneDay; // number of milliseconds in one week
  const oneMonth = 30 * oneDay; // number of milliseconds in one month

  const activeUsersDay = users.filter(user => {
    const lastSignInDate = new Date(user.token.lastSignIn);
    return currentDate - lastSignInDate <= oneDay;
  });

  const activeUsersWeek = users.filter(user => {
    const lastSignInDate = new Date(user.token.lastSignIn);
    return currentDate - lastSignInDate <= oneWeek;
  });

  const activeUsersMonth = users.filter(user => {
    const lastSignInDate = new Date(user.token.lastSignIn);
    return currentDate - lastSignInDate <= oneMonth;
  });

  const activityPercentageDay = (activeUsersDay.length / users.length) * 100;
  const activityPercentageWeek = (activeUsersWeek.length / users.length) * 100;
  const activityPercentageMonth =
    (activeUsersMonth.length / users.length) * 100;

  return {
    percentages: {
      day: activityPercentageDay.toFixed(2) + '%',
      week: activityPercentageWeek.toFixed(2) + '%',
      month: activityPercentageMonth.toFixed(2) + '%',
    },
    users: {
      day: activeUsersDay,
      week: activeUsersWeek,
      month: activeUsersMonth,
    },
  };
};
