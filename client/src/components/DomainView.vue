<template>
  <div>
    <div class="container">
      <div class="text-left">
        <router-link to="/domains">Voltar</router-link>
        <br />
        <br />
        <h2>{{ domain }}</h2>
        <br />
        <div class="card">
          <div class="card-body">
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="domain in domains"
                :key="domain.extension"
              >
                <div class="row">
                  <div class="col-md-6">
                    {{ domain.extension }}
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
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DomainView",
  props: {
    domain: { type: String, required: true },
  },
  data() {
    return {
      domains: [],
    };
  },
  created() {
    axios({
      url: "http://localhost:4000",
      method: "post",
      data: {
        query: `
          mutation ($name: String) {
            domains: generateDomain(name: $name) {
              name,
              extension,
              checkout,
              available
            }
          }
        `,
        variables: {
          name: this.domain,
        },
      },
    }).then((response) => {
      const query = response.data;
      this.domains = query.data.domains;
    });
  },
};
</script>
