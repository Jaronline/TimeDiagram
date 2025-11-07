<script setup lang="ts">
import TimeDiagram from "@/components/TimeDiagram.vue";
import URLSearchCheckbox from "@/components/URLSearchCheckbox.vue";
import {computed, ref} from "vue";
import DownloadButton from "@/components/DownloadButton.vue";
import URLSearchInput from "@/components/URLSearchInput.vue";

const displayVoltage = ref(false);
const displayTime = ref(false);
const whiteBackground = ref(false);
const diagramDataURL = ref<string | undefined>();
const duration = ref(1);
const hertz = ref(1);

function updateDiagramDataURL(dataURL: string) {
  diagramDataURL.value = dataURL;
}

const bgColor = computed(() => whiteBackground.value ? "#fff" : undefined);
</script>

<template>
  <main class="m-2">
    <div class="mb-2">
      <TimeDiagram class="block max-h-[35rem]" :voltage="displayVoltage" :time="displayTime"
                   :background-color="bgColor" @update="updateDiagramDataURL" :cycles="hertz" :interval="duration" />
      <URLSearchCheckbox name="background" param="bg" v-model="whiteBackground">Add white background</URLSearchCheckbox>
      <DownloadButton filename="time-diagram.png" :href="diagramDataURL">Save</DownloadButton>
    </div>
    <div class="mb-2">
      <URLSearchCheckbox name="voltage-enabled" param="v" v-model="displayVoltage">Show voltage</URLSearchCheckbox>
      <URLSearchCheckbox name="time-enabled" param="t" v-model="displayTime">Show time</URLSearchCheckbox>
    </div>
    <div>
      <URLSearchInput name="duration" param="d" type="number" v-model="duration" :min="1">Total time (s)</URLSearchInput>
      <URLSearchInput name="hertz" param="h" type="number" v-model="hertz" :min="1">Amount of hertz</URLSearchInput>
    </div>
  </main>
</template>
