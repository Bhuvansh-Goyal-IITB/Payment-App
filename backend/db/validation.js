function regexValidator(regex, message) {
  return {
    validator: (value) => regex.test(value),
    message,
  };
}

const emailValidators = [
  regexValidator(
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    "Invalid email. Please enter a valid email.",
  ),
];
const passwordValidators = [
  {
    validator: (value) => value.length >= 8,
    message: "Password must be atleast 8 characters long.",
  },
  regexValidator(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/,
    "Please choose a stronger password. Try a mix of letters, numbers, and symbols.",
  ),
];

const firstNameValidators = [
  {
    validator: (value) => value.length > 2 && value.length <= 30,
    message: "Invalid first name. It must be between 3 and 30 characters.",
  },
  regexValidator(
    /^[a-zA-z]*$/,
    "Invalid first name. It can only contain alphabets",
  ),
];

const lastNameValidators = [
  {
    validator: (value) => value.length > 2 && value.length <= 30,
    message: "Invalid last name. It must be between 3 and 30 characters.",
  },
  regexValidator(
    /^[a-zA-z]*$/,
    "Invalid last name. It can only contain alphabets",
  ),
];

export {
  firstNameValidators,
  lastNameValidators,
  passwordValidators,
  emailValidators,
};
