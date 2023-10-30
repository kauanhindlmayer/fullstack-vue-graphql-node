<template>
  <div>
    <h5>
      {{ title }}
      <span class="badge badge-info">{{ items.length }}</span>
    </h5>
    <div class="card">
      <div class="card-body">
        <div class="list-group">
          <li class="list-group-item" v-for="item in items" :key="item">
            <div class="row">
              <div class="col-md">
                {{ item }}
              </div>
              <div class="col-md text-right">
                <button class="btn btn-info" @click="deleteItem(item)">
                  <span class="fa fa-trash" />
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
            placeholder="Digite o item"
            v-model="item"
            @keyup.enter="addItem(item)"
          />
          <div class="input-group-append">
            <button class="btn btn-info" @click="deleteItem(item)">
              <span class="fa fa-plus" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppItemList",
  props: {
    title: { type: String, required: true },
    items: { type: Array, required: true },
  },
  data() {
    return {
      item: "",
    };
  },
  methods: {
    addItem(item) {
      this.$emit("add-item", item);
      this.item = "";
    },
    deleteItem(item) {
      this.$emit("delete-item", item);
    },
  },
};
</script>
