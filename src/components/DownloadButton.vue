<script setup lang="ts">
import {computed} from "vue";

const { filename, href } = defineProps<{
  filename: string;
  href?: string;
}>();

function downloadFile() {
  const link = document.createElement("a");
  link.download = filename;
  link.href = href;
  link.click();
}

const disabled = computed(() => !href);
</script>

<template>
  <button class="bg-gray-300 px-1 border border-b-black rounded-l disabled:bg-gray-400" type="button" @click="downloadFile" :disabled="disabled">
    <slot/>
  </button>
</template>
