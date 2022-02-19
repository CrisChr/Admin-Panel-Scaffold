exports.format = (msgs) => {
  const output = {};

  Object.entries(msgs).forEach(([key, { defaultMessage }]) => {
    output[key] = key;
  });

  return output;
};
