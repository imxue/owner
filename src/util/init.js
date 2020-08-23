import checkAuthority from "./Authority";
import router from "../router";
function init() {
  let time = Math.round(new Date() / 1000); //current Time
  let user = null;
  try {
    user = checkAuthority(localStorage.getItem("token"));
  } catch (error) {
    localStorage.removeItem("token");
  }
  if (localStorage.getItem("token")) {
    try {
      user = JSON.parse(user);
      if (time - user.exp > 0) {
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        router.push("/");
      }
    } catch (error) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  } else {
    localStorage.removeItem("token");
    router.push("/login");
  }
}

init();
