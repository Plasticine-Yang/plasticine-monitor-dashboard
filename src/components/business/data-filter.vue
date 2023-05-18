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

      <n-divider vertical />

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
    </n-space>

    <!-- 右侧 -->
    <n-space> </n-space>
  </n-space>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { SelectOption } from 'naive-ui';

type FilterItemType = 'project' | 'timeRange';

interface Props {
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
}

const props = withDefaults(defineProps<Props>(), {
  filterItemsForDisplay: () => ['project', 'timeRange'],

  projectId: '',
  projectOptions: () => [],

  timeRange: '',
  timeRangeOptions: () => []
});

interface Emits {
  (e: 'update:projectId', projectId: string): void;
  (e: 'update:timeRange', timeRange: string): void;
}

const emit = defineEmits<Emits>();

// 控制可渲染的筛选项
const shouldRenderProjectFilterItem = computed(() => props.filterItemsForDisplay.includes('project'));
const shouldRenderTimeRangeFilterItem = computed(() => props.filterItemsForDisplay.includes('timeRange'));

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
</script>

<style scoped></style>
