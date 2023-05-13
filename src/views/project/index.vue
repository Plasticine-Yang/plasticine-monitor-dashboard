<template>
  <div class="h-full">
    <n-card title="项目管理" :bordered="false" class="rounded-16px shadow-sm">
      <!-- 顶部操作按钮区域 -->
      <n-space class="pb-12px">
        <!-- 创建项目 -->
        <n-button type="primary" @click="handleOpenCreateProjectModal">
          <icon-ic-round-plus class="mr-4px text-20px" />
          创建项目
        </n-button>

        <!-- 复制 sdk url -->
        <n-button type="primary" @click="handleCopySDKUrl">
          <icon-ic-outline-content-copy class="mr-4px text-20px" />
          复制 SDK url
        </n-button>
      </n-space>

      <!-- 表格 -->
      <n-data-table :row-key="row => row.id" :columns="columns" :data="projectList" />

      <!-- 创建项目 or 编辑项目的模态框 -->
      <project-action-modal v-model:visible="projectActionModalVisible" type="add" />
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import type { Ref } from 'vue';
import { ref } from 'vue';
import type { DataTableColumns } from 'naive-ui';
import { NButton, NPopover, NSpace } from 'naive-ui';
import { useClipboard } from '@/hooks';
import ProjectActionModal from './components/project-action-modal.vue';

const { copyText } = useClipboard();

const projectList = ref<ProjectManagement.Project[]>([
  {
    id: '1',
    name: 'foo'
  },
  {
    id: '2',
    name: 'bar'
  }
]);

const columns: Ref<DataTableColumns<ProjectManagement.Project>> = ref([
  {
    type: 'selection'
  },
  {
    key: 'id',
    title: 'id',
    align: 'center'
  },
  {
    key: 'name',
    title: '项目名',
    align: 'center'
  },
  {
    key: 'actions',
    title: '操作',
    align: 'center',
    render: row => {
      const projectId = row.id;

      return (
        <NPopover trigger="hover">
          {{
            default: () => projectId,
            trigger: () => <NButton onClick={() => copyText(projectId)}>复制 projectId</NButton>
          }}
        </NPopover>
      );
    }
  }
]) as Ref<DataTableColumns<ProjectManagement.Project>>;

const projectActionModalVisible = ref(false);

function handleOpenCreateProjectModal() {
  projectActionModalVisible.value = true;
}

async function handleCopySDKUrl() {
  const sdkUrl = import.meta.env.VITE_PLASTICINE_MONITOR_SDK_URL ?? 'unknown';
  copyText(sdkUrl);
}
</script>

<style scoped></style>
