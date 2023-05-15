import type { Ref } from 'vue';
import { computed } from 'vue';
import type { ECOption } from '~/src/composables';
import { useEcharts } from '~/src/composables';

export default function useEchartLine(xAxis: Ref<string[]>, yAxis: Ref<number[]>) {
  const lineOption = computed(() => getLineOption());
  const { domRef } = useEcharts(lineOption);

  function getLineOption(): ECOption {
    const options: ECOption = {
      backgroundColor: '#0f375f',
      // @ts-ignore
      tooltip: {
        trigger: 'axis',
        valueFormatter: (value: number) => `${value.toFixed(2)} ms`,
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        data: xAxis.value,
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        }
      },
      yAxis: {
        name: '单位：ms',
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        }
      },
      series: [
        {
          name: '性能数据',
          type: 'line',
          smooth: true,
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 15,
          data: yAxis.value
        }
      ]
    };

    return options;
  }

  return {
    domRef
  };
}
