<script setup lang="ts">
import {onMounted, useTemplateRef} from "vue";

const { param, min } = defineProps<{
  id?: string;
  name: string;
  param: string;
  type: string;
  min?: number;
  max?: number;
  step?: number;
}>();
const model = defineModel({
  get() {
    const params = new URLSearchParams(location.search);
    return params.get(param);
  },
  set(value) {
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set(param, value);
    } else {
      params.delete(param);
    }
    const paramsString = params.toString().replaceAll("=&", "&").replace(/=$/, "");
    history.pushState(null, null, paramsString !== "" ? `?${paramsString}` : "./");
    return value;
  }
});

const input = useTemplateRef("input");

onMounted(() => {
  model.value = new URLSearchParams(location.search).get(param) ?? min;
  input.value.value = model.value;
});
</script>

<template>
  <label class="mx-1" :for="id ?? name"><slot/></label>
  <input class="mx-2 border border-b-black" :type="type" :id="id ?? name" :name="name"
         :min="min" :max="max" :step="step" v-model="model" ref="input" />
</template>