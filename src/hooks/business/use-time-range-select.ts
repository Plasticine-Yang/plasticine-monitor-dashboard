import { ref } from 'vue';
import type { SelectOption } from 'naive-ui';

export default function useTimeRangeSelect() {
  const selectedTimeRange = ref('1h');
  const timeRangeOptions = ref<SelectOption[]>([
    {
      label: '过去 1 小时',
      value: '1h'
    },
    {
      label: '过去 3 小时',
      value: '3h'
    },
    {
      label: '过去 6 小时',
      value: '6h'
    },
    {
      label: '过去 1 天',
      value: '1d'
    },
    {
      label: '过去 3 天',
      value: '3d'
    },
    {
      label: '过去 7 天',
      value: '7d'
    }
  ]);

  return {
    selectedTimeRange,
    timeRangeOptions
  };
}
