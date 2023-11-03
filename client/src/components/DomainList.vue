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
              <div class="col-md">
                {{ domain.name }}
              </div>
              <div class="col-md text-right">
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
    };
  },
  computed: {
    domains() {
      const domains = [];
      this.items.prefixe.forEach((prefix) => {
        this.items.sufixe.forEach((sufixe) => {
          const name = prefix.description + sufixe.description;
          const url = name.toLocaleLowerCase();
          const checkout = `https://cart.hostgator.com.br/?pid=d&sld=${url}&tld=.com`;
          domains.push({ name, checkout });
        });
      });
      return domains;
    },
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
        this.getItems(item.type);
      });
    },
    getItems(type) {
      axios({
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
  },
  created() {
    this.getItems("prefixe");
    this.getItems("sufixe");
  },
};
</script>
