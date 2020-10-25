const Validator = require("validator");
const validText = require("./valid_text.js");

module.exports = function (data) {
  let errors = {};
  //if email or password is valid, return it again else return empty string
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";
  //if this is not an email, populate errors
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  //returns all errors and a boolean to see if there were any errors in the errors object
  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
