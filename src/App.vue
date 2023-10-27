<template>
  <div>
    <div id="slogan" class="text-center">
      <h1>NameGator</h1>
      <br />
      <h6 class="text-secondary">
        Gerador de nomes utilizando Vue.js, GraphQL e Node
      </h6>
    </div>
    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md">
            <h5>
              Prefixos
              <span class="badge badge-info">{{ prefixes.length }}</span>
            </h5>
            <div class="card">
              <div class="card-body">
                <div class="list-group">
                  <li
                    class="list-group-item"
                    v-for="prefixe in prefixes"
                    :key="prefixe"
                  >
                    <div class="row">
                      <div class="col-md">
                        {{ prefixe }}
                      </div>
                      <div class="col-md text-right">
                        <button
                          class="btn btn-info"
                          @click="deletePrefixe(prefixe)"
                        >
                          <span class="fa fa-trash"></span>
                        </button>
                      </div>
                    </div>
                  </li>
                </div>
                <br />
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Digite o prefixo"
                    v-model="prefixe"
                    @keyup.enter="addPrefixe(prefixe)"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-info" @click="addPrefixe(prefixe)">
                      <span class="fa fa-plus"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md">
            <h5>
              Sufixos <span class="badge badge-info">{{ sufixes.length }}</span>
            </h5>
            <div class="card">
              <div class="card-body">
                <div class="list-group">
                  <li
                    class="list-group-item"
                    v-for="sufixe in sufixes"
                    :key="sufixe"
                  >
                    <div class="row">
                      <div class="col-md">
                        {{ sufixe }}
                      </div>
                      <div class="col-md text-right">
                        <button
                          class="btn btn-info"
                          @click="deleteSufixe(sufixe)"
                        >
                          <span class="fa fa-trash"></span>
                        </button>
                      </div>
                    </div>
                  </li>
                </div>
                <br />
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Digite o sufixo"
                    v-model="sufixe"
                    @keyup.enter="addSufixe(sufixe)"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-info" @click="addSufixe(sufixe)">
                      <span class="fa fa-plus"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
                      <span class="fa fa-shopping-cart"></span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

export default {
  name: "App",
  data: function () {
    return {
      prefixe: "",
      sufixe: "",
      prefixes: ["Air", "Jet", "Flight"],
      sufixes: ["Hub", "Station", "Mart"],
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
};
</script>

<style>
#slogan {
  margin-top: 30px;
  margin-bottom: 30px;
}
#main {
  background-color: #f1f1f1;
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>
