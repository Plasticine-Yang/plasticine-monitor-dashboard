import { ref } from 'vue';

export default function usePerformanceEchartData() {
  const xAxis = ref<string[]>([]);
  const yAxis = ref<number[]>([]);

  return {
    xAxis,
    yAxis
  };
}
