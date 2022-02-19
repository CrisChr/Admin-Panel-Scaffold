const messages = require(`./${process.env.locale}/messages.json`);

exports.format = (msgs) => {
  const output = {};

  Object.entries(msgs).forEach(([key]) => {
    output[key] = messages[key] || key;
  });

  return output;
};
