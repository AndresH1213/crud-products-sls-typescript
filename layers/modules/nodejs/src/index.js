const uuid = require("uuid");

exports.generator = (name) => {
  return `${name}#${uuid.v4()}`;
};
