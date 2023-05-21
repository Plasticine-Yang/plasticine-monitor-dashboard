<template>
  <n-list hoverable clickable>
    <n-list-item>
      <n-thing>
        <template #header>
          <n-text type="success">请求 url：{{ networkMetrics.request.url }}</n-text>
        </template>

        <template #description>
          <n-space vertical>
            <n-text type="info">请求方式：{{ networkMetrics.request.method.toUpperCase() }}</n-text>
            <n-text type="info">请求耗时：{{ networkMetrics.duration }} ms</n-text>
            <n-text type="info">请求所使用的 API：{{ networkMetrics.requestType }}</n-text>
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
const networkMetrics = props.userBehavior.value as UserBehaviorManagement.NetworkMetrics;
</script>

<style scoped></style>
