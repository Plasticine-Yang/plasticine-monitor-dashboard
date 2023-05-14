<template>
  <div class="h-full">
    <n-card title="项目管理" :bordered="false" class="rounded-16px shadow-sm">
      <!-- 顶部操作按钮区域 -->
      <n-space class="pb-12px" justify="space-between">
        <!-- 左侧 -->
        <n-space>
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

        <!-- 右侧 -->
        <n-space>
          <n-button type="error" :disabled="checkedRowKeys.length === 0" @click="handleDeleteProjects"
            >批量删除项目</n-button
          >
        </n-space>
      </n-space>

      <!-- 表格 -->
      <n-data-table
        :row-key="row => row.id"
        :columns="columns"
        :data="projectList"
        :loading="tableLoading"
        @update:checked-row-keys="handleCheckedRowKeysUpdate"
      />

      <!-- 创建项目 or 编辑项目的模态框 -->
      <project-action-modal
        v-model:visible="projectActionModalVisible"
        :type="projectActionModalType"
        :data-for-edit="projectDataForEdit"
        @refresh="refreshTable"
      />
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import type { Ref } from 'vue';
import { unref, onBeforeMount, ref } from 'vue';
import type { DataTableColumns, DataTableRowKey } from 'naive-ui';
import { NTag, NPopconfirm, NButton, NPopover, NSpace } from 'naive-ui';
import { useClipboard } from '@/hooks';
import { apiDeleteProject, apiDeleteProjects, apiGetAllProjects } from '~/src/service/api';
import type { ModalType } from './components/project-action-modal.vue';
import ProjectActionModal from './components/project-action-modal.vue';

const { copyText } = useClipboard();

const tableLoading = ref(false);
const projectList = ref<ProjectManagement.Project[]>([]);
const columns: Ref<DataTableColumns<ProjectManagement.Project>> = ref([
  {
    type: 'selection'
  },
  {
    key: 'id',
    title: 'id',
    align: 'left',
    render: row => {
      return (
        <NTag type="success" bordered={false}>
          {row.id}
        </NTag>
      );
    }
  },
  {
    key: 'name',
    title: '项目名',
    align: 'left',
    render: row => {
      return (
        <NTag type="info" bordered={false}>
          {row.name}
        </NTag>
      );
    }
  },
  {
    key: 'actions',
    title: '操作',
    align: 'center',
    render: row => {
      const projectId = row.id;

      return (
        <NSpace justify={'center'}>
          {/* 复制 projectId */}
          <NPopover trigger="hover">
            {{
              default: () => projectId,
              trigger: () => (
                <NButton type="primary" size="small" onClick={() => copyText(projectId)}>
                  复制 projectId
                </NButton>
              )
            }}
          </NPopover>

          {/* 编辑 */}
          <NButton type="success" size={'small'} onClick={() => handleEditProject(row)}>
            编辑
          </NButton>

          {/* 删除 */}
          <NPopconfirm onPositiveClick={() => handleDeleteProject(row.id)}>
            {{
              default: () => '确认删除',
              trigger: () => (
                <NButton type="error" size="small">
                  删除
                </NButton>
              )
            }}
          </NPopconfirm>
        </NSpace>
      );
    }
  }
]) as Ref<DataTableColumns<ProjectManagement.Project>>;

const projectActionModalVisible = ref(false);
const projectActionModalType = ref<ModalType>('add');
const projectDataForEdit = ref<ProjectManagement.Project | null>(null);

async function refreshTable() {
  tableLoading.value = true;

  const fetchedProjectList = await apiGetAllProjects();

  projectList.value = fetchedProjectList;
  tableLoading.value = false;
}

function initTable() {
  refreshTable();
}

function handleOpenCreateProjectModal() {
  projectActionModalVisible.value = true;
  projectActionModalType.value = 'add';
}

/** 复制 plasticine-monitor sdk url */
async function handleCopySDKUrl() {
  const sdkUrl = import.meta.env.VITE_PLASTICINE_MONITOR_SDK_URL ?? 'unknown';
  copyText(sdkUrl);
}

/** 编辑项目 */
async function handleEditProject(project: ProjectManagement.Project) {
  projectActionModalType.value = 'edit';
  projectDataForEdit.value = project;
  projectActionModalVisible.value = true;
}

/** 删除项目 */
async function handleDeleteProject(projectId: string) {
  await apiDeleteProject(projectId);
  await refreshTable();
}

// ============== 批量操作逻辑 ==============
const checkedRowKeys = ref<ProjectManagement.Project['id'][]>([]);

/** 批量选中时的状态更新 */
async function handleCheckedRowKeysUpdate(rowKeys: DataTableRowKey[]) {
  checkedRowKeys.value = rowKeys as ProjectManagement.Project['id'][];
}

async function handleDeleteProjects() {
  await apiDeleteProjects(unref(checkedRowKeys));

  window.$message?.success('删除成功！');

  await refreshTable();
}

onBeforeMount(() => {
  initTable();
});
</script>

<style scoped></style>
