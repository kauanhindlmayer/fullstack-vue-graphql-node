<template>
  <div class="container">
    <div class="row">
      <div class="col-md">
        <AppItemList
          title="Prefixos"
          type="prefixe"
          :items="items.prefixe"
          @add-item="addItem"
          @delete-item="deleteItem"
        />
      </div>
      <div class="col-md">
        <AppItemList
          title="Sufixos"
          type="sufixe"
          :items="items.sufixe"
          @add-item="addItem"
          @delete-item="deleteItem"
        />
      </div>
    </div>
    <br />
    <h5>
      Domínios <span class="badge badge-info">{{ domains.length }}</span>
    </h5>
    <div class="card">
      <div class="card-body">
        <ul class="list-group">
          <li
            class="list-group-item"
            v-for="domain in domains"
            :key="domain.name"
          >
            <div class="row">
              <div class="col-md-6">
                {{ domain.name }}
              </div>
              <div class="col-md-3">
                <span class="badge badge-info">
                  {{ domain.available ? "Disponível" : "Não Disponível" }}
                </span>
              </div>
              <div class="col-md-3 text-right">
                <a
                  class="btn btn-info"
                  href="http://hostgator.com.br"
                  target="_blank"
                >
                  <span class="fa fa-shopping-cart" />
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import axios from "axios";
import AppItemList from "@/components/AppItemList.vue";

export default {
  name: "DomainList",
  components: {
    AppItemList,
  },
  data: function () {
    return {
      items: {
        prefixe: [],
        sufixe: [],
      },
      domains: [],
    };
  },
  methods: {
    addItem(item) {
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
        this.items[item.type].push(newItem);
        this.generateDomains();
      });
    },
    deleteItem(item) {
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
        this.items[item.type].splice(this.items[item.type].indexOf(item), 1);
        this.generateDomains();
      });
    },
    getItems(type) {
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
        this.items[type] = query.data.items;
      });
    },
    generateDomains() {
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
        this.domains = query.data.domains;
      });
    },
  },
  created() {
    Promise.all([this.getItems("prefixe"), this.getItems("sufixe")]).then(
      () => {
        this.generateDomains();
      }
    );
  },
};
</script>
