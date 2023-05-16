<template>
  <div class="h-full">
    <n-card title="页面管理" :bordered="false" class="rounded-16px shadow-sm">
      <!-- 顶部操作按钮区域 -->
      <n-space class="pb-12px" justify="space-between">
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
      </n-space>

      <!-- 表格 -->
      <n-data-table :row-key="row => row.id" :columns="columns" :data="pageInfoList" :loading="tableLoading" />
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import type { Ref } from 'vue';
import { onBeforeMount, ref } from 'vue';
import type { DataTableColumns } from 'naive-ui';
import { NSpace, NTag } from 'naive-ui';
import { useProjectSelect } from '~/src/hooks';
import { apiGetPageInfoList } from '~/src/service/api';

const { projectOptions, selectedProjectId, loadProjectOptions } = useProjectSelect();

const tableLoading = ref(false);
const pageInfoList = ref<PageManagement.Page[]>([]);
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
    key: 'pv',
    title: 'PV',
    align: 'left',
    render: row => {
      return (
        <NTag type="info" bordered={false}>
          {row.pv}
        </NTag>
      );
    }
  },
  {
    key: 'uv',
    title: 'UV',
    align: 'left',
    render: row => {
      return (
        <NTag type="info" bordered={false}>
          {row.uv}
        </NTag>
      );
    }
  }
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

function handleSelectedProjectIdUpdate() {
  refreshTable();
}

onBeforeMount(async () => {
  await loadProjectOptions();
  await initTable();
});
</script>

<style scoped></style>
