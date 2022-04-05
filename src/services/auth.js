// validate user email via regex
const ValidateEmail = (mail) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
};

// validate user password via regex
const ValidatePassword = (pass) => {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
    pass
  );
};

export { ValidateEmail, ValidatePassword };
