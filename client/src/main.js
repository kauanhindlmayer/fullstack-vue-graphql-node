import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import axios from "axios";

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    items: {
      prefixe: [],
      sufixe: [],
    },
    domains: [],
  },
  mutations: {
    addItem(state, payload) {
      const { item, newItem } = payload;
      state.items[item.type].push(newItem);
    },
    deleteItem(state, payload) {
      const { item } = payload;
      state.items[item.type].splice(state.items[item.type].indexOf(item), 1);
    },
    setItems(state, payload) {
      const { type, items } = payload;
      state.items[type] = items;
    },
    setDomains(state, payload) {
      state.domains = payload;
    },
  },
  actions: {
    async addItem(context, payload) {
      const item = payload;
      axios({
        url: "http://localhost:4000",
        method: "post",
        data: {
          query: `
            mutation ($item: ItemInput) {
              newItem: saveItem (item: $item) {
                id
                type
                description
              }
            }
          `,
          variables: {
            item,
          },
        },
      }).then((response) => {
        const query = response.data;
        const newItem = query.data.newItem;
        context.commit("addItem", { item, newItem });
        context.dispatch("generateDomains");
      });
    },
    async deleteItem(context, payload) {
      const item = payload;
      axios({
        url: "http://localhost:4000",
        method: "post",
        data: {
          query: `
						mutation ($id: Int) {
							deleted: deleteItem(id: $id)
						}
					`,
          variables: {
            id: item.id,
          },
        },
      }).then(() => {
        context.commit("deleteItem", { item });
        context.dispatch("generateDomains");
      });
    },
    async getItems(context, payload) {
      const type = payload;
      return axios({
        url: "http://localhost:4000",
        method: "post",
        data: {
          query: `
          query ($type: String) {
            items: items (type: $type) {
              id
              type
              description
            }
          }
        `,
          variables: {
            type,
          },
        },
      }).then((response) => {
        const query = response.data;
        context.commit("setItems", { type, items: query.data.items });
      });
    },
    async generateDomains(context) {
      axios({
        url: "http://localhost:4000",
        method: "post",
        data: {
          query: `
          mutation {
            domains: generateDomains {
              name
              checkout
              available
            }
          }
        `,
        },
      }).then((response) => {
        const query = response.data;
        context.commit("setDomains", query.data.domains);
      });
    },
  },
});

Promise.all([
  store.dispatch("getItems", "prefixe"),
  store.dispatch("getItems", "sufixe"),
]).then(() => {
  store.dispatch("generateDomains");
});

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
  store,
  render: (h) => h(App),
}).$mount("#app");
