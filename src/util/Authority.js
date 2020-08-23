const checkAuthority = token => {
  try {
    let user = window.atob(token.split(".")[1]);
    return user;
  } catch (error) {
    localStorage.removeItem("token");
  }
};

export default checkAuthority;
