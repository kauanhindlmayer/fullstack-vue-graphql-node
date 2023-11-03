import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/domains",
    },
    {
      path: "/domains/:domain",
      component: () => import("./components/DomainView.vue"),
      props: true,
    },
    {
      path: "/domains",
      component: () => import("./components/DomainList.vue"),
    },
  ],
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
