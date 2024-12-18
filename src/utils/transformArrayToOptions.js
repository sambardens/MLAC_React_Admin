export const transformArrayToOptions = array => {
  if (!array) {
    return;
  }
  const options = [];
  array.forEach(item => {
    if (item) {
      options.push({ value: item, label: item });
    }
  });

  return options;
};
