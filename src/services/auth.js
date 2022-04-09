import axios from 'axios';

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

// validate number via regex
const ValidateNumber = (number) => {
  return /^[0-9]+$/.test(number);
};

// send axios request to server to check user credentials
const ValidateUser = async (email, password) => {
  return axios.post(`${import.meta.env.VITE_API_BASE_PATH}/login`, {
    email,
    password,
  });
};

export { ValidateEmail, ValidatePassword, ValidateUser, ValidateNumber };
