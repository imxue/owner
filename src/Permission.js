import Router from "./router";

Router.beforeEach((to, from, next) => {
  if (localStorage.getItem("token")) {
    if (to.path === "/Login") {
      next("/");
    }
    next();
  } else {
    if (to.path === "/Login") {
      next();
    } else if (to.path === "/ForgetPW") {
      next();
    } else if (to.path === "/Enroll") {
      next();
    } else {
      next("/Login");
    }
  }
});
