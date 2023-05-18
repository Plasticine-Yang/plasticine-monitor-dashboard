<template>
  <div class="h-full">
    <n-card title="JavaScript 运行时异常监控" :bordered="false" class="rounded-16px shadow-sm">
      <data-filter
        v-model:project-id="selectedProjectId"
        v-model:time-range="selectedTimeRange"
        :project-options="projectOptions"
        :time-range-options="timeRangeOptions"
        @update:project-id="handleSelectedProjectIdUpdate"
        @update:time-range="handleSelectedTimeRangeUpdate"
      />

      <!-- 表格 -->
      <n-data-table :row-key="row => row.id" :columns="columns" :data="jsErrorList" :loading="tableLoading" />
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import type { Ref } from 'vue';
import { onBeforeMount, ref } from 'vue';
import type { DataTableColumns } from 'naive-ui';
import { NButton, NEllipsis, NSpace, NTag } from 'naive-ui';
import dayjs from 'dayjs';
import { useProjectSelect, useTimeRangeSelect } from '~/src/hooks';
import { apiGetAllJSErrorEvents } from '~/src/service/api';
import type { JSErrorManagement } from '~/src/typings/js-error';

const { projectOptions, selectedProjectId, loadProjectOptions } = useProjectSelect();
const { timeRangeOptions, selectedTimeRange } = useTimeRangeSelect();

const tableLoading = ref(false);
const jsErrorList = ref<JSErrorManagement.JSErrorEvent[]>([]);
const columns: Ref<DataTableColumns<JSErrorManagement.JSErrorEvent>> = ref([
  {
    type: 'selection',
    fixed: 'left'
  },
  {
    key: 'eventId',
    title: 'eventId',
    align: 'left',
    fixed: 'left',
    render: row => {
      return (
        <NTag type="success" bordered={false}>
          {row.eventId}
        </NTag>
      );
    }
  },
  {
    key: 'name',
    title: '异常名',
    align: 'left',
    render: row => {
      return (
        <NTag type="error" bordered={false}>
          {row.payload.error.name}
        </NTag>
      );
    }
  },
  {
    key: 'message',
    title: '异常信息',
    align: 'left',
    render: row => {
      return (
        <NTag type="error" bordered={false}>
          {row.payload.error.message}
        </NTag>
      );
    }
  },
  {
    key: 'filename',
    title: '异常文件',
    align: 'left',
    render: row => {
      return (
        <NTag type="info" bordered={false}>
          {row.payload.error.filename ?? 'null'}
        </NTag>
      );
    }
  },
  {
    key: 'linenoAndColno',
    title: '异常行列号',
    align: 'left',
    render: row => {
      return (
        <NTag type="info" bordered={false}>
          {row.payload.error.lineno && row.payload.error.colno
            ? `${row.payload.error.lineno} : ${row.payload.error.colno}`
            : 'null'}
        </NTag>
      );
    }
  },
  {
    key: 'stack',
    title: '堆栈信息',
    align: 'left',
    render: row => {
      const stack = row.payload.error.stack ?? 'null';

      return (
        <NTag type="info" bordered={false}>
          <NEllipsis style={{ maxWidth: '240px' }}>
            {{
              default: () => stack,
              tooltip: () => {
                return <pre>{stack}</pre>;
              }
            }}
          </NEllipsis>
        </NTag>
      );
    }
  },
  {
    key: 'time',
    title: '异常发生时间',
    align: 'left',
    render: row => {
      return (
        <NTag type="info" bordered={false}>
          {row.environmentInfo?.timestamp ? dayjs(row.environmentInfo.timestamp).format('YYYY-MM-DD HH:mm:ss') : 'null'}
        </NTag>
      );
    }
  },
  {
    key: 'actions',
    title: '操作',
    align: 'center',
    fixed: 'right',
    render: row => {
      return (
        <NSpace justify={'center'}>
          <NButton type="primary" size="small" onClick={() => handleCheckSourceMap(row)}>
            查看源码上下文
          </NButton>
        </NSpace>
      );
    }
  }
]) as Ref<DataTableColumns<JSErrorManagement.JSErrorEvent>>;

async function refreshTable() {
  tableLoading.value = true;

  const fetchedJSErrorEvents = await apiGetAllJSErrorEvents(selectedProjectId.value, selectedTimeRange.value);

  jsErrorList.value = fetchedJSErrorEvents;
  tableLoading.value = false;
}

function initTable() {
  return refreshTable();
}

function handleSelectedProjectIdUpdate(projectId: string) {
  selectedProjectId.value = projectId;
  refreshTable();
}

function handleSelectedTimeRangeUpdate(timeRange: string) {
  selectedTimeRange.value = timeRange;
  refreshTable();
}

function handleCheckSourceMap(jsErrorEvent: JSErrorManagement.JSErrorEvent) {
  console.log('TODO - 查看源码上下文', jsErrorEvent);
}

onBeforeMount(async () => {
  await loadProjectOptions();
  await initTable();
});
</script>

<style scoped></style>
