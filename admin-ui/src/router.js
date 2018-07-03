import Vue from "vue";
import Router from "vue-router";
import UsersList from "./views/UsersList.vue";
import ServersList from "./views/ServersList.vue";
import ServerNewEdit from "./views/ServerNewEdit.vue";
import UserNewEdit from "./views/UserNewEdit.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/users"
    },
    {
      path: "/users",
      name: "users",
      component: UsersList
    },
    {
      path: "user/:id",
      name: "user",
      component: UserNewEdit
    },
    {
      path: "/servers",
      name: "servers",
      component: ServersList
    },
    {
      path: "server/:id",
      name: "server",
      component: ServerNewEdit
    }
  ]
});
