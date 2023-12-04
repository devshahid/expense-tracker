export const checkPassword = (password) => {
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const specialSymbolRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  const numberRegex = /[0-9]/;

  const isUppercase = uppercaseRegex.test(password);
  const isLowercase = lowercaseRegex.test(password);
  const isSpecialSymbol = specialSymbolRegex.test(password);
  const isNumber = numberRegex.test(password);

  const isPasswordValid = isUppercase && isLowercase && isSpecialSymbol && isNumber ? true : false;
  return ['isPasswordValid', isPasswordValid];
};

export const checkEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return ['isEmailValid', emailRegex.test(email)];
};

const checkMobileNumber = (number) => {
  const indianNumberRegex = /^[6-9]\d{9}$/;
  return ['isMobileNumberValid', indianNumberRegex.test(number)];
};
export const validateInput = (name, value, userDetails) => {
  if (name === 'email') {
    return checkEmail(value);
  } else if (name === 'password') {
    return checkPassword(value);
  } else if (name === 'cpassword') {
    // eslint-disable-next-line no-unused-vars
    const [_, validPassword] = checkPassword(value);
    if (validPassword && userDetails.password.trim() === value.trim()) {
      return ['isPasswordMatched', true];
    } else {
      return ['isPasswordMatched', false];
    }
  } else if (name === 'mobileNumber') {
    return checkMobileNumber(value);
  } else if (name === 'name') {
    return ['hasName', value.trim() !== ''];
  }
};
