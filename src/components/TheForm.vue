<template>
  <form class="form_wrapper" @submit.prevent="onSubmit">
    <div v-for="(item, idx) in model" :key="`frm-${idx}`" class="form_item">
      <span :title="item.description">
        {{ item.name }}
      </span>
      <smart-input
        type="text"
        class="item_input"
        :field="item"
        :category="category"
        @update="onUpdate"
      />
    </div>
    <input class="submit" type="submit" value="Сохранить JSON" />
  </form>
</template>

<script>
import smartInput from "./smartInput.vue";

export default {
  name: "TheForm",
  components: { smartInput },
  props: {
    model: {
      type: Array,
      default: () => [],
    },
    category: {
      type: String,
      default: "",
    },
  },
  emits: ["update", "json"],

  methods: {
    onUpdate(params) {
      // console.log(params);
      this.$emit("update", params);
    },
    onSubmit() {
      this.$emit("json");
    },
  },
};
</script>

<style scoped>
.form_wrapper {
  margin: auto;
  margin-top: 18px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.form_item {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
}
.item_input {
  margin-left: 8px;
  flex-grow: 2;
}
.submit {
  width: 20%;
  margin: auto;
}
</style>
