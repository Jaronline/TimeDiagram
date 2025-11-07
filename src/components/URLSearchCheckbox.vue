<script setup lang="ts">
import {onMounted} from "vue";

const { id, name, param } = defineProps<{
  id?: string;
  name: string;
  param: string;
}>();
const model = defineModel({
  get() {
    const params = new URLSearchParams(location.search);
    return params.has(param);
  },
  set(value) {
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set(param, "");
    } else {
      params.delete(param);
    }
    const paramsString = params.toString().replaceAll("=&", "&").replace(/=$/, "");
    history.pushState(null, null, paramsString !== "" ? `?${paramsString}` : "./");
    return value;
  }
});

onMounted(() => {
  model.value = new URLSearchParams(location.search).has(param);
});
</script>

<template>
  <input class="mx-1" type="checkbox" :id="id ?? name" :name="name" v-model="model" />
  <label class="mx-1" :for="id ?? name"><slot/></label>
</template>