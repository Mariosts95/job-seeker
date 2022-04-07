// logout user from the application
const LogoutUser = async () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
};

export { LogoutUser };
