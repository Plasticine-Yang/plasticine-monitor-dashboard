<template>
  <n-space vertical>
    <n-card title="性能数据监控" :bordered="false" class="rounded-16px shadow-sm">
      <data-filter
        v-model:project-id="selectedProjectId"
        v-model:time-range="selectedTimeRange"
        :project-options="projectOptions"
        :time-range-options="timeRangeOptions"
        @update:project-id="handleSelectedProjectIdUpdate"
        @update:time-range="handleSelectedTimeRangeUpdate"
      />
    </n-card>

    <!-- 图表 -->
    <n-space vertical>
      <!-- TTI -->
      <echarts-line title="TTI(Time To Interactive)" :x-axis="ttiXAxis" :y-axis="ttiYAxis" />

      <!-- FP -->
      <echarts-line title="FP(First Paint)" :x-axis="fpXAxis" :y-axis="fpYAxis" />

      <!-- FCP -->
      <echarts-line title="FCP(First Contentful Paint)" :x-axis="fcpXAxis" :y-axis="fcpYAxis" />

      <!-- LCP -->
      <echarts-line title="LCP(Largest Contentful Paint)" :x-axis="lcpXAxis" :y-axis="lcpYAxis" />

      <!-- FID -->
      <echarts-line title="FID(First Input Delay)" :x-axis="fidXAxis" :y-axis="fidYAxis" />
    </n-space>
  </n-space>
</template>

<script setup lang="tsx">
import { onBeforeMount } from 'vue';
import { NSpace } from 'naive-ui';
import EchartsLine from '~/src/components/business/echarts-line.vue';
import { usePerformanceEchartData, useProjectSelect, useTimeRangeSelect } from '~/src/hooks';
import { apiGetAllPerformanceEventLineChart } from '~/src/service';

const { projectOptions, selectedProjectId, loadProjectOptions } = useProjectSelect();
const { timeRangeOptions, selectedTimeRange } = useTimeRangeSelect();

const { xAxis: fpXAxis, yAxis: fpYAxis } = usePerformanceEchartData();
const { xAxis: fcpXAxis, yAxis: fcpYAxis } = usePerformanceEchartData();
const { xAxis: lcpXAxis, yAxis: lcpYAxis } = usePerformanceEchartData();
const { xAxis: fidXAxis, yAxis: fidYAxis } = usePerformanceEchartData();
const { xAxis: ttiXAxis, yAxis: ttiYAxis } = usePerformanceEchartData();

async function refreshAllCharts() {
  const data = await apiGetAllPerformanceEventLineChart(selectedProjectId.value, selectedTimeRange.value);

  if (data !== null) {
    fpXAxis.value = data.FP.xAxis;
    fpYAxis.value = data.FP.yAxis;

    fcpXAxis.value = data.FCP.xAxis;
    fcpYAxis.value = data.FCP.yAxis;

    lcpXAxis.value = data.LCP.xAxis;
    lcpYAxis.value = data.LCP.yAxis;

    fidXAxis.value = data.FID.xAxis;
    fidYAxis.value = data.FID.yAxis;

    ttiXAxis.value = data.TTI.xAxis;
    ttiYAxis.value = data.TTI.yAxis;
  }
}

function initAllCharts() {
  return refreshAllCharts();
}

function handleSelectedProjectIdUpdate(projectId: string) {
  selectedProjectId.value = projectId;
  refreshAllCharts();
}

function handleSelectedTimeRangeUpdate(timeRange: string) {
  selectedTimeRange.value = timeRange;
  refreshAllCharts();
}

onBeforeMount(async () => {
  await loadProjectOptions();
  await initAllCharts();
});
</script>

<style scoped></style>
