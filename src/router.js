import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Enroll from "./views/Enroll1.vue";
import ForgetPW from "./views/ForgetPW.vue";
// import detail from './views/Detail.vue'
import trustNetbar from "./views/trustNetbar.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Detail",
      component: () => import("./views/Detail.vue")
    },
    {
      path: "/Enroll",
      name: "Enroll",
      component: Enroll
    },
    {
      path: "/Login",
      name: "Login",
      component: Login
    },
    {
      path: "/trustNetbar",
      name: "trustNetbar",
      component: trustNetbar
    },
    {
      path: "/ForgetPW",
      name: "ForgetPW",
      component: ForgetPW
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ]
});
