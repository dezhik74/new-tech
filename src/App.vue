<template>
  <h1>Форма ввода атрибутов</h1>
  <div class="id_input_wrapper">
    <input v-model="categoryID" type="text" />
    <button :disabled="!isCategoryIDCorrect" @click="loadCategory">
      Загрузить
    </button>
  </div>
  <!-- <button class="load_json_button" @click="testAPI">API Test</button> -->
  <section v-if="isModel">
    <the-form
      :model="model"
      :category="categoryID"
      @update="onUpdate"
      @json="onJson"
    />
  </section>

  <section v-else class="no_data">Данные не загружены</section>
  <div v-if="haveJson">
    <textarea v-model="jsonData" class="json_area" />
    <button class="load_json_button" @click="loadCategoryFromJSON">
      Загрузить из JSON
    </button>
  </div>
</template>

<script>
import { getAttributes } from "./api/api";
import TheForm from "./components/TheForm.vue";

import { getCollection } from "./api/api";

export default {
  name: "App",
  components: { TheForm },
  data() {
    return {
      categoryID: "17028968",
      model: {},
      jsonData: "",
    };
  },
  computed: {
    isCategoryIDCorrect() {
      return this.categoryID && /^[0-9]+$/.test(this.categoryID);
    },
    isModel() {
      return Object.keys(this.model).length !== 0;
    },
    haveJson() {
      return this.jsonData.length > 0;
    },
  },
  async mounted() {},
  methods: {
    async loadCategory() {
      this.jsonData = "";
      this.model = await getAttributes(this.categoryID);
      if (this.isModel) {
        this.model.forEach((x) => (x["value"] = ""));
        for (let i = 0; i < this.model.length; i++) {
          if (this.model[i].is_collection) {
            let apiOption = await getCollection(
              this.categoryID,
              this.model[i].id
            );
            if (apiOption)
              this.model[i].options = apiOption.map((x) => x.value);
            else this.model[i].options = ["Ошибка загрузки из API"]; //не загрузился список опций
          }
        }

        // для отладки
        // this.model.forEach((x) => {
        //   x.value = x.is_required
        //     ? !x.is_collection
        //       ? "Обязательное"
        //       : x.options[0]
        //     : "";
        // });
      }
    },
    loadCategoryFromJSON() {
      try {
        let obj = JSON.parse(this.jsonData);
        this.model = {};
        this.model = obj;
      } catch {
        alert("Некорректный JSON");
      }
    },
    async testAPI() {
      let obj = await getCollection(17028968, 10096, 0, 20, "");
      console.log(obj.map((x) => x.value).sort());
      let obj2 = await getCollection(17028968, 10096, 0, 20, "белый");
      console.log(obj2.map((x) => x.value).sort());
      // let obj = await getCollection("17034410", 4080, 0, 20, "");
      // console.log("%cApp.vue line:84 obj", "color: #007acc;", obj);
    },
    onUpdate([value, fieldId]) {
      this.model.forEach((x) => {
        if (x.id === fieldId) {
          x.value = value;
        }
      });
    },
    onJson() {
      this.jsonData = JSON.stringify(this.model, null, 2);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto;
  margin-top: 20px;
  box-sizing: border-box;
  width: 900px;
}
.id_input_wrapper {
  margin: auto;
  width: 40%;
  display: flex;
  justify-content: space-between;
}
.no_data {
  margin-top: 10px;
}
.json_area {
  width: 100%;
  height: 300px;
  margin-top: 15px;
}
.load_json_button {
  margin-top: 10px;
  margin-bottom: 30px;
}
</style>
