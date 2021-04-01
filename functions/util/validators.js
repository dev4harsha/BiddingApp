const isEmpty = (string) => {
  if (string.trim() === '') return true;
  else return false;
};

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

exports.validateSignupData = (newUser) => {
  let errors = {};
  if (isEmpty(newUser.email)) {
    errors.email = 'Must not be empty';
  } else if (!isEmail(newUser.email)) {
    errors.email = 'Must be a valid email address';
  }

  if (isEmpty(newUser.password)) errors.password = 'Must not be empty';
  if (newUser.password !== newUser.confirmPassword)
    errors.confirmPassword = 'Passwords must match';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateLoginData = (userCred) => {
  let errors = {};
  if (isEmpty(userCred.email)) {
    errors.email = 'Must not be empty';
  } else if (!isEmail(userCred.email)) {
    errors.email = 'Must be a valid email address';
  }
  if (isEmpty(userCred.password)) errors.password = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateAddAuction = (newAuction) => {
  let errors = {};
  if (isEmpty(newAuction.auctionName)) {
    errors.auctionName = 'Must not be empty';
  }
  if (isEmpty(newAuction.auctionType)) {
    errors.auctionType = 'Must not be empty';
  }
  if (isEmpty(newAuction.itemDescription)) {
    errors.itemDescription = 'Must not be empty';
  } else if (newAuction.itemDescription.length > 400) {
    errors.itemDescription =
      'The description is too long, limit to 400 characters';
  }

  if (isEmpty(newAuction.initAmount)) {
    errors.initAmount = 'Must not be empty';
  } else if (
    isNaN(parseFloat(newAuction.initAmount)) ||
    parseFloat(newAuction.initAmount) == 0
  ) {
    errors.initAmount = 'Invalid amount';
  }

  if (isEmpty(newAuction.buyNowAmount)) {
    errors.buyNowAmount = 'Must not be empty';
  } else if (
    isNaN(parseFloat(newAuction.buyNowAmount)) ||
    parseFloat(newAuction.buyNowAmount) == 0
  ) {
    errors.buyNowAmount = 'Invalid amount';
  } else if (
    parseFloat(newAuction.initAmount) >= parseFloat(newAuction.buyNowAmount)
  ) {
    errors.buyNowAmount = 'Need to be higher than base price';
  }
  if (new Date(newAuction.endDateTime) < new Date()) {
    errors.endDateTime = 'Invalid Date';
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
exports.reduceUserDetails = (data) => {
  let userDetails = {};
  if (!isEmpty(data.firstName)) userDetails.firstName = data.firstName;
  if (!isEmpty(data.lastName)) userDetails.lastName = data.lastName;
  if (!isEmpty(data.mobile)) userDetails.mobile = data.mobile;
  if (!isEmpty(data.country)) userDetails.country = data.country;
  return userDetails;
};
