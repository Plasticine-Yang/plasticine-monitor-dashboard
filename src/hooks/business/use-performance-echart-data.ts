import { ref } from 'vue';

export default function usePerformanceEchartData() {
  const categories = ref<string[]>([]);
  const lineData = ref<number[]>([]);

  return {
    categories,
    lineData
  };
}
