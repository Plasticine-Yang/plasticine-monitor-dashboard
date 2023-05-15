<template>
  <n-space vertical>
    <n-card title="性能数据监控" :bordered="false" class="rounded-16px shadow-sm">
      <!-- 顶部操作按钮区域 -->
      <n-space class="pb-12px" justify="space-between">
        <!-- 左侧 -->
        <n-space align="center">
          <!-- 项目筛选 -->
          <n-space>
            <n-tag type="primary" size="large" :bordered="false">项目</n-tag>
            <n-select
              v-model:value="selectedProjectId"
              :options="projectOptions"
              :consistent-menu-width="false"
              @update:value="handleSelectedProjectIdUpdate"
            />
          </n-space>

          <n-divider vertical />

          <!-- 时间筛选 -->
          <n-space>
            <n-tag type="primary" size="large" :bordered="false">时间</n-tag>
            <n-select
              v-model:value="selectedTimeRange"
              :options="timeRangeOptions"
              :consistent-menu-width="false"
              @update:value="handleSelectedTimeUpdate"
            />
          </n-space>
        </n-space>

        <!-- 右侧 -->
        <n-space> </n-space>
      </n-space>
    </n-card>

    <!-- 图表 -->
    <n-space vertical>
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
import { NSpace, NTag } from 'naive-ui';
import EchartsLine from '~/src/components/business/echarts-line.vue';
import { usePerformanceEchartData, useProjectSelect, useTimeRangeSelect } from '~/src/hooks';
import { apiGetAllPerformanceEventLineChart } from '~/src/service';

const { projectOptions, selectedProjectId, loadProjectOptions } = useProjectSelect();
const { timeRangeOptions, selectedTimeRange } = useTimeRangeSelect();

const { xAxis: fpXAxis, yAxis: fpYAxis } = usePerformanceEchartData();
const { xAxis: fcpXAxis, yAxis: fcpYAxis } = usePerformanceEchartData();
const { xAxis: lcpXAxis, yAxis: lcpYAxis } = usePerformanceEchartData();
const { xAxis: fidXAxis, yAxis: fidYAxis } = usePerformanceEchartData();

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
  }
}

function initAllCharts() {
  return refreshAllCharts();
}

function handleSelectedProjectIdUpdate() {
  refreshAllCharts();
}

function handleSelectedTimeUpdate() {
  refreshAllCharts();
}

onBeforeMount(async () => {
  await loadProjectOptions();
  await initAllCharts();
});
</script>

<style scoped></style>
