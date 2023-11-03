<template>
  <div>
    <h5>
      {{ title }}
      <span class="badge badge-info">{{ items.length }}</span>
    </h5>
    <div class="card">
      <div class="card-body">
        <div class="list-group">
          <li class="list-group-item" v-for="item in items" :key="item.id">
            <div class="row">
              <div class="col-md">
                {{ item.description }}
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
            v-model="description"
            @keyup.enter="addItem(type, description)"
          />
          <div class="input-group-append">
            <button class="btn btn-info" @click="addItem(type, description)">
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
    type: { type: String, required: true },
  },
  data() {
    return {
      description: "",
    };
  },
  methods: {
    addItem(type, description) {
      this.$emit("add-item", {
        type,
        description,
      });
      this.description = "";
    },
    deleteItem(item) {
      this.$emit("delete-item", item);
    },
  },
};
</script>
