<template>
  <div v-click-outside="closeDropDown" class="wrapper">
    <template v-if="!isCollection">
      <input
        v-model="innerValue"
        :required="field.is_required"
        type="text"
        @input="$emit('update', [innerValue, field.id])"
      />
    </template>
    <template v-else>
      <input
        v-model="innerValue"
        :required="field.is_required"
        type="text"
        @input="onInput"
        @focus="openDropDown"
        @blur="onBlur"
      />
      <div class="picker_icon" @click="openCloseDropDown"></div>
      <div v-if="isDropDownOpen" class="drop_down">
        <div
          v-for="(opt, idx) in filteredOptions"
          :key="`${field.id}-${idx}`"
          class="drop_down_item"
          @mousedown.prevent
          @click.self="dropDownSelected"
        >
          {{ opt }}
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "SmartInput",
  props: {
    category: {
      type: String,
      default: "",
    },
    field: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["update"],
  data() {
    return {
      innerValue: "",
      dropDownOpen: false,
      options: [],
    };
  },
  computed: {
    isCollection() {
      return this.field.is_collection && this.field.options;
    },
    isDropDownOpen() {
      return this.dropDownOpen;
    },
    filteredOptions() {
      return this.field.options
        .filter((x) => x.startsWith(this.innerValue))
        .sort();
    },
    fieldValueTrigger() {
      return this.field.value;
    },
  },
  watch: {
    fieldValueTrigger() {
      this.innerValue = this.fieldValueTrigger;
    },
  },
  methods: {
    openCloseDropDown() {
      this.dropDownOpen = !this.dropDownOpen;
    },
    openDropDown() {
      this.dropDownOpen = true;
    },
    closeDropDown() {
      this.dropDownOpen = false;
    },
    dropDownSelected(e) {
      this.innerValue = e.target.innerText;
      this.$emit("update", [this.innerValue, this.field.id]);
      this.closeDropDown();
    },
    async onInput() {
      if (this.filteredOptions.length === 0) {
        this.innerValue = this.innerValue.slice(0, -1);
      }
      this.$emit("update", [this.innerValue, this.field.id]);
    },
    onBlur() {
      if (!this.options.includes(this.innerValue))
        this.innerValue = this.filteredOptions[0];
      this.$emit("update", [this.innerValue, this.field.id]);
      this.closeDropDown();
    },
  },
};
</script>

<style scoped>
.wrapper {
  position: relative;
}
.wrapper input {
  width: 100%;
}
.picker_icon {
  background-image: url(../assets/expand_more_black_18dp.svg);
  position: absolute;
  left: calc(100% - 10px);
  top: 0px;
  width: 18px;
  height: 18px;
  cursor: pointer;
}
.drop_down {
  position: absolute;
  width: 100%;
  max-height: 150px;
  z-index: 2;
  padding: 5px;
  border: 1px solid black;
  overflow-y: auto;
  background: white;
}
.drop_down_item {
  cursor: pointer;
}
</style>
