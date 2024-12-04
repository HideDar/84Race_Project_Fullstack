<template>
  <div>
    <canvas ref="barChartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const barChartCanvas = ref(null);

    onMounted(() => {
      const ctx = barChartCanvas.value.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: props.data,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });

    return { barChartCanvas };
  },
};
</script>

<style scoped>
/* Optional: Add styles for your chart */
</style>
