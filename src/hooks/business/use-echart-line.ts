import type { Ref } from 'vue';
import { computed } from 'vue';
import type { ECOption } from '~/src/composables';
import { useEcharts } from '~/src/composables';

export default function useEchartLine(categories: Ref<string[]>, lineData: Ref<number[]>) {
  const lineOption = computed(() => getLineOption());
  const { domRef } = useEcharts(lineOption);

  function getLineOption(): ECOption {
    const options: ECOption = {
      backgroundColor: '#0f375f',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        data: categories.value,
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        }
      },
      yAxis: {
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        }
      },
      series: [
        {
          name: 'line',
          type: 'line',
          smooth: true,
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 15,
          data: lineData.value
        },
        {
          name: 'dotted',
          type: 'pictorialBar',
          symbol: 'rect',
          itemStyle: {
            color: '#0f375f'
          },
          symbolRepeat: true,
          symbolSize: [12, 4],
          symbolMargin: 1,
          z: -10,
          data: lineData.value
        }
      ]
    };

    return options;
  }

  return {
    domRef
  };
}
