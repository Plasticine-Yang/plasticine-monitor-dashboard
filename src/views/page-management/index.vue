<template>
  <div class="h-full">
    <n-card title="页面管理" :bordered="false" class="rounded-16px shadow-sm">
      <data-filter
        v-model:project-id="selectedProjectId"
        :filter-items-for-display="['project']"
        :project-options="projectOptions"
        @update:project-id="handleSelectedProjectIdUpdate"
      />

      <!-- 表格 -->
      <n-data-table :row-key="row => row.id" :columns="columns" :data="pageInfoList" :loading="tableLoading" />
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import type { Ref } from 'vue';
import { onBeforeMount, ref } from 'vue';
import type { DataTableColumns } from 'naive-ui';
import { NNumberAnimation, NTag } from 'naive-ui';
import type { TableColumn } from 'naive-ui/es/data-table/src/interface';
import { PerformanceMetricsEnum } from '~/src/enums';
import { useProjectSelect } from '~/src/hooks';
import { apiGetPageInfoList } from '~/src/service/api';
import type { PageManagement } from '~/src/typings/page-management';

const { projectOptions, selectedProjectId, loadProjectOptions } = useProjectSelect();

const tableLoading = ref(false);
const pageInfoList = ref<PageManagement.Page[]>([]);

const generatePerformanceMetricColumn = (metric: PerformanceMetricsEnum): TableColumn<PageManagement.Page> => {
  return {
    key: metric,
    title: `${metric} (ms)`,
    align: 'left',
    render: row => {
      return (
        <NTag type="info" bordered={false}>
          {row.performanceMetrics[metric] ? (
            <NNumberAnimation to={row.performanceMetrics[metric]} precision={2} />
          ) : (
            '--'
          )}
        </NTag>
      );
    }
  };
};

const columns: Ref<DataTableColumns<PageManagement.Page>> = ref([
  {
    key: 'pagePath',
    title: '页面路径',
    align: 'left',
    fixed: 'left',
    render: row => {
      return (
        <NTag type="success" bordered={false}>
          {row.pagePath}
        </NTag>
      );
    }
  },
  {
    key: 'PV',
    title: 'PV (次)',
    align: 'left',
    render: row => {
      return (
        <NTag type="info" bordered={false}>
          <NNumberAnimation to={row.pv} />
        </NTag>
      );
    }
  },
  {
    key: 'UV',
    title: 'UV (人)',
    align: 'left',
    render: row => {
      return (
        <NTag type="info" bordered={false}>
          <NNumberAnimation to={row.uv} />
        </NTag>
      );
    }
  },
  generatePerformanceMetricColumn(PerformanceMetricsEnum.TTI),
  generatePerformanceMetricColumn(PerformanceMetricsEnum.FP),
  generatePerformanceMetricColumn(PerformanceMetricsEnum.FCP),
  generatePerformanceMetricColumn(PerformanceMetricsEnum.LCP),
  generatePerformanceMetricColumn(PerformanceMetricsEnum.FID)
]) as Ref<DataTableColumns<PageManagement.Page>>;

async function refreshTable() {
  tableLoading.value = true;

  const fetchedPageInfoList = await apiGetPageInfoList({
    projectId: selectedProjectId.value
  });

  pageInfoList.value = fetchedPageInfoList;

  tableLoading.value = false;
}

function initTable() {
  return refreshTable();
}

function handleSelectedProjectIdUpdate(projectId: string) {
  selectedProjectId.value = projectId;
  refreshTable();
}

onBeforeMount(async () => {
  await loadProjectOptions();
  await initTable();
});
</script>

<style scoped></style>
