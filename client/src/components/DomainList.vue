<template>
  <div class="container">
    <div class="row">
      <div class="col-md">
        <AppItemList
          title="Prefixos"
          :items="prefixes"
          @add-item="addPrefixe"
          @delete-item="deletePrefixe"
        />
      </div>
      <div class="col-md">
        <AppItemList
          title="Sufixos"
          :items="sufixes"
          @add-item="addSufixe"
          @delete-item="deleteSufixe"
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
      prefixe: "",
      sufixe: "",
      prefixes: [],
      sufixes: [],
    };
  },
  computed: {
    domains() {
      const domains = [];
      this.prefixes.forEach((prefix) => {
        this.sufixes.forEach((sufixe) => {
          const name = prefix + sufixe;
          const url = name.toLocaleLowerCase();
          const checkout = `https://cart.hostgator.com.br/?pid=d&sld=${url}&tld=.com`;
          domains.push({ name, checkout });
        });
      });
      return domains;
    },
  },
  methods: {
    addPrefixe(prefixe) {
      this.prefixes.push(prefixe);
      this.prefixe = "";
    },
    deletePrefixe(prefixe) {
      this.prefixes.splice(this.prefixes.indexOf(prefixe), 1);
    },
    addSufixe(sufixe) {
      this.sufixes.push(sufixe);
      this.sufixe = "";
    },
    deleteSufixe(sufixe) {
      this.sufixes.splice(this.sufixes.indexOf(sufixe), 1);
    },
  },
  created() {
    axios({
      url: "http://localhost:4000",
      method: "post",
      data: {
        query: `
          query {
            prefixes: items (type: "Prefixe") {
              id
              type
              description
            }
            sufixes: items (type: "Sufixe") {
              description
            }
          }
        `,
      },
    }).then((response) => {
      const query = response.data;
      this.prefixes = query.data.prefixes.map((prefix) => prefix.description);
      this.sufixes = query.data.sufixes.map((sufixe) => sufixe.description);
    });
  },
};
</script>
