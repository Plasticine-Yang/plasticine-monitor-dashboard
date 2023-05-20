<template>
  <n-space class="pb-12px" justify="space-between">
    <!-- 左侧 -->
    <n-space align="center">
      <!-- 项目筛选 -->
      <n-space v-if="shouldRenderProjectFilterItem">
        <n-tag type="primary" size="large" :bordered="false">项目</n-tag>
        <n-select
          v-model:value="projectIdModelValue"
          :options="projectOptions"
          :consistent-menu-width="false"
          @update:value="handleSelectedProjectIdUpdate"
        />
      </n-space>

      <!-- 时间筛选 -->
      <n-space v-if="shouldRenderTimeRangeFilterItem">
        <n-tag type="primary" size="large" :bordered="false">时间</n-tag>
        <n-select
          v-model:value="timeRangeModelValue"
          :options="timeRangeOptions"
          :consistent-menu-width="false"
          @update:value="handleSelectedTimeRangeUpdate"
        />
      </n-space>

      <!-- userId 筛选 -->
      <n-space v-if="shouldRenderUserIdFilterItem">
        <n-tag type="primary" size="large" :bordered="false">userId</n-tag>
        <n-input v-model:value="userIdModelValue" @update:value="handleUserIdUpdate" />
      </n-space>

      <!-- sessionId 筛选 -->
      <n-space v-if="shouldRenderSessionIdFilterItem">
        <n-tag type="primary" size="large" :bordered="false">sessionId</n-tag>
        <n-input v-model:value="sessionIdModelValue" @update:value="handleSessionIdUpdate" />
      </n-space>
    </n-space>

    <!-- 右侧 -->
    <n-space>
      <n-button v-if="showFilterButton" type="primary" @click="$emit('click-filter-button')">筛选</n-button>
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { SelectOption } from 'naive-ui';
import { STORAGE_FILTER_ITEM_SESSION_ID, STORAGE_FILTER_ITEM_USER_ID } from '~/src/constants';

type FilterItemType = 'project' | 'timeRange' | 'userId' | 'sessionId';

interface Props {
  showFilterButton?: boolean;

  /** 要展示的筛选项 */
  filterItemsForDisplay?: FilterItemType[];

  /** 启用 project 筛选项时需传入要双向绑定的 projectId */
  projectId?: string;
  /** 启用 project 筛选项时需传入可选的 project */
  projectOptions?: SelectOption[];

  /** 启用 timeRange 筛选项时需传入要双向绑定的 timeRange */
  timeRange?: string;
  /** 启用 timeRange 筛选项时需传入可选的 project */
  timeRangeOptions?: SelectOption[];

  userId?: string;
  sessionId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showFilterButton: false,

  filterItemsForDisplay: () => ['project', 'timeRange'],

  projectId: '',
  projectOptions: () => [],

  timeRange: '',
  timeRangeOptions: () => [],

  userId: '',
  sessionId: ''
});

interface Emits {
  (e: 'update:projectId', projectId: string): void;
  (e: 'update:timeRange', timeRange: string): void;
  (e: 'update:userId', userId: string): void;
  (e: 'update:sessionId', sessionId: string): void;
  (e: 'click-filter-button'): void;
}

const emit = defineEmits<Emits>();

// 控制可渲染的筛选项
const shouldRenderProjectFilterItem = computed(() => props.filterItemsForDisplay.includes('project'));
const shouldRenderTimeRangeFilterItem = computed(() => props.filterItemsForDisplay.includes('timeRange'));
const shouldRenderUserIdFilterItem = computed(() => props.filterItemsForDisplay.includes('userId'));
const shouldRenderSessionIdFilterItem = computed(() => props.filterItemsForDisplay.includes('sessionId'));

// 暴露给外部的 v-model 数据 -- projectId
const projectIdModelValue = computed({
  get() {
    return props.projectId;
  },
  set(newProjectId) {
    emit('update:projectId', newProjectId);
  }
});

const handleSelectedProjectIdUpdate = (newProjectId: string) => {
  projectIdModelValue.value = newProjectId;
};

// 暴露给外部的 v-model 数据 -- timeRange
const timeRangeModelValue = computed({
  get() {
    return props.timeRange;
  },
  set(newTimeRange: string) {
    emit('update:timeRange', newTimeRange);
  }
});

const handleSelectedTimeRangeUpdate = (newTimeRange: string) => {
  timeRangeModelValue.value = newTimeRange;
};

// 暴露给外部的 v-model 数据 -- userId
const userIdModelValue = computed({
  get() {
    return props.userId;
  },
  set(newUserId) {
    localStorage.setItem(STORAGE_FILTER_ITEM_USER_ID, newUserId);
    emit('update:userId', newUserId);
  }
});

const handleUserIdUpdate = (newUserId: string) => {
  console.log('update userid');
  userIdModelValue.value = newUserId;
};

// 暴露给外部的 v-model 数据 -- sessionId
const sessionIdModelValue = computed({
  get() {
    return props.sessionId;
  },
  set(newSessionId) {
    localStorage.setItem(STORAGE_FILTER_ITEM_SESSION_ID, newSessionId);
    emit('update:sessionId', newSessionId);
  }
});

const handleSessionIdUpdate = (newSessionId: string) => {
  sessionIdModelValue.value = newSessionId;
};
</script>

<style scoped></style>
