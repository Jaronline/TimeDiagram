<script setup lang="ts">
import {Scatter} from "vue-chartjs";
import {
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  Plugin,
  PointElement,
  Tooltip
} from "chart.js";
import {computed, toRefs, useTemplateRef, watch, watchEffect} from "vue";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const props = withDefaults(
    defineProps<{
      label?: string;
      interval?: number;
      cycles?: number;
      time?: boolean;
      voltage?: boolean;
      animation?: boolean;
      backgroundColor?: `#${string}`;
    }>(),
    {
      label: "D13",
      interval: 1,
      cycles: 1,
      time: false,
      voltage: false,
      animation: false
    }
);
const emit = defineEmits(["update"]);
const { label, interval, cycles, time: displayTime, voltage: displayVoltage, animation, backgroundColor } = toRefs(props);

const data = computed(() => {
  const dataPoints = [
    { x: 0, y: 2.5 }
  ];
  const halfInterval = interval.value / 2;

  for (let i = 0; i < cycles.value; i++) {
    dataPoints.push(
        { x: halfInterval * i * 2, y: 5 },
        { x: halfInterval * (i * 2 + 1), y: 5 },
        { x: halfInterval * (i * 2 + 1), y: 0 },
        { x: halfInterval * (i * 2 + 2), y: 0 }
    );
  }

  dataPoints.push({ x: interval.value * cycles.value, y: 2.5 });

  return {
    datasets: [{
      label: label.value,
      data: dataPoints,
      lineTension: 0,
      showLine: true,
      pointBackgroundColor: "#000",
      borderColor: "#000",
      backgroundColor: "#000"
    }]
  };
});

const options: ChartOptions<"scatter"> = computed(() => ({
  scales: {
    x: {
      type: "linear",
      position: "bottom",
      title: {
        display: displayTime.value,
        text: "Time (s)",
        align: "start",
      },
      ticks: {
        display: displayTime.value,
      }
    },
    y: {
      title: {
        display: displayVoltage.value,
        text: "Voltage (V)",
        align: "start"
      },
      ticks: {
        display: displayVoltage.value,
      }
    }
  },
  layout: {
    padding: 20
  },
  animation: animation.value,
  plugins: {
    canvasBackgroundColor: {
      color: backgroundColor.value
    }
  }
}));

interface CanvasBackgroundPluginOptions { color?: string };
const plugins: Plugin<"scatter">[] = [{
  id: "canvasBackgroundColor",
  beforeDraw(chart: Chart<"scatter">, args: { cancelable: true }, options: CanvasBackgroundPluginOptions): boolean | void {
    if (!options.color) return;
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = options.color;
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
}];

const diagram = useTemplateRef("diagram");

let timeout: number | undefined;
function update() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const { canvas } = diagram.value?.chart;
    if (canvas) emit("update", canvas.toDataURL());
  }, 100);
}

watchEffect(update);
watch([backgroundColor, displayVoltage, displayTime, interval, cycles], update);
</script>

<template>
  <Scatter ref="diagram" :options="options" :plugins="plugins" :data="data" />
</template>
