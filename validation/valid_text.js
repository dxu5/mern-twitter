const validText = (str) => {
  //check that string is a string and whitespace - string greater than 0
  return typeof str === "string" && str.trim().length > 0;
};

module.exports = validText;
