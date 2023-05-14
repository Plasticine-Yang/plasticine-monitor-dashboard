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
      <n-card :bordered="false" class="rounded-16px shadow-sm">
        <template #header>
          <n-tag type="primary" :bordered="false">FP(First Paint)</n-tag>
        </template>

        <div ref="fpLineChartRef" class="h-600px"></div>
      </n-card>

      <!-- FCP -->
      <n-card :bordered="false" class="rounded-16px shadow-sm">
        <template #header>
          <n-tag type="primary" :bordered="false">FCP(First Contentful Paint)</n-tag>
        </template>

        <div ref="fcpLineChartRef" class="h-600px"></div>
      </n-card>

      <!-- LCP -->
      <n-card :bordered="false" class="rounded-16px shadow-sm">
        <template #header>
          <n-tag type="primary" :bordered="false">LCP(Largest Contentful Paint)</n-tag>
        </template>

        <div ref="lcpLineChartRef" class="h-600px"></div>
      </n-card>

      <!-- FID -->
      <n-card :bordered="false" class="rounded-16px shadow-sm">
        <template #header>
          <n-tag type="primary" :bordered="false">FID(First Input Delay)</n-tag>
        </template>

        <div ref="fidLineChartRef" class="h-600px"></div>
      </n-card>
    </n-space>
  </n-space>
</template>

<script setup lang="tsx">
import { onBeforeMount } from 'vue';
import { NSpace, NTag } from 'naive-ui';
import { useEchartLine, usePerformanceEchartData, useProjectSelect, useTimeRangeSelect } from '~/src/hooks';
import { apiGetAllPerformanceEventLineChart } from '~/src/service';

const { projectOptions, selectedProjectId, loadProjectOptions } = useProjectSelect();
const { timeRangeOptions, selectedTimeRange } = useTimeRangeSelect();

const { categories: fpCategories, lineData: fpLineData } = usePerformanceEchartData();
const { categories: fcpCategories, lineData: fcpLineData } = usePerformanceEchartData();
const { categories: lcpCategories, lineData: lcpLineData } = usePerformanceEchartData();
const { categories: fidCategories, lineData: fidLineData } = usePerformanceEchartData();

const { domRef: fpLineChartRef } = useEchartLine(fpCategories, fpLineData);
const { domRef: fcpLineChartRef } = useEchartLine(fcpCategories, fcpLineData);
const { domRef: lcpLineChartRef } = useEchartLine(lcpCategories, lcpLineData);
const { domRef: fidLineChartRef } = useEchartLine(fidCategories, fidLineData);

async function refreshAllCharts() {
  const data = await apiGetAllPerformanceEventLineChart(selectedProjectId.value, selectedTimeRange.value);

  if (data !== null) {
    fpCategories.value = data.FP.categories;
    fpLineData.value = data.FP.values;

    fcpCategories.value = data.FCP.categories;
    fcpLineData.value = data.FCP.values;

    lcpCategories.value = data.LCP.categories;
    lcpLineData.value = data.LCP.values;

    fidCategories.value = data.FID.categories;
    fidLineData.value = data.FID.values;
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
