<template>
  <n-list hoverable clickable>
    <n-list-item>
      <n-thing>
        <template #header>
          <n-text type="error">错误信息：{{ jsErrorMetrics.error.message }}</n-text>
        </template>

        <template #description>
          <n-space vertical>
            <n-text v-if="jsErrorMetrics.error.name !== undefined" type="info"
              >错误名称：{{ jsErrorMetrics.error.name }}</n-text
            >
            <n-text v-if="jsErrorMetrics.error.filename !== undefined" type="info"
              >错误文件名：{{ jsErrorMetrics.error.filename }}</n-text
            >
            <n-text
              v-if="jsErrorMetrics.error.lineno !== undefined || jsErrorMetrics.error.colno !== undefined"
              type="info"
              >错误行列号：{{ jsErrorMetrics.error.lineno }}:{{ jsErrorMetrics.error.colno }}</n-text
            >
          </n-space>
        </template>
      </n-thing>
    </n-list-item>
  </n-list>
</template>

<script setup lang="ts">
import type { UserBehaviorManagement } from '@/typings/user-behavior';

interface Props {
  userBehavior: UserBehaviorManagement.UserBehavior;
}

const props = defineProps<Props>();
const jsErrorMetrics = props.userBehavior.value as UserBehaviorManagement.JSErrorMetrics;
</script>

<style scoped></style>
