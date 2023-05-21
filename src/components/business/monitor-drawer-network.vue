<template>
  <n-divider>请求信息</n-divider>
  <n-space vertical>
    <n-text type="info">请求方式：{{ networkMetrics.request.method.toUpperCase() }}</n-text>
    <n-text type="info">请求 url：{{ networkMetrics.request.url }}</n-text>
    <n-text type="info">请求所使用的 API：{{ networkMetrics.requestType }}</n-text>
    <n-text type="info">请求时间：{{ formatTimestamp(networkMetrics.request.timestamp) }}</n-text>
    <n-text type="info">请求耗时：{{ networkMetrics.duration }} ms</n-text>
    <n-text v-if="networkMetrics.request.reason" type="error">失败原因：{{ networkMetrics.request.reason }}</n-text>
    <n-collapse>
      <n-collapse-item v-if="networkMetrics.request.headers" title="请求头">
        <n-code :code="formatJSON(networkMetrics.request.headers)" language="json" />
      </n-collapse-item>

      <n-collapse-item v-if="networkMetrics.request.body" title="请求体">
        <n-code :code="formatJSON(networkMetrics.request.body)" language="json" />
      </n-collapse-item>
    </n-collapse>
  </n-space>

  <n-divider>响应信息</n-divider>
  <n-space vertical>
    <n-text type="info"
      >响应码：{{ networkMetrics.response.status !== -1 ? networkMetrics.response.status : '请求未发出' }}</n-text
    >
    <n-text type="info">响应时间：{{ formatTimestamp(networkMetrics.response.timestamp) }}</n-text>
    <n-collapse>
      <n-collapse-item v-if="networkMetrics.response.headers" title="响应头">
        <n-code :code="formatJSON(networkMetrics.response.headers)" language="json" />
      </n-collapse-item>

      <n-collapse-item v-if="networkMetrics.response.body" title="响应体">
        <n-code :code="formatJSON(networkMetrics.response.body)" language="json" />
      </n-collapse-item>
    </n-collapse>
  </n-space>
</template>

<script setup lang="ts">
import { formatTimestamp, formatJSON } from '@/utils';
import type { UserBehaviorManagement } from '~/src/typings/user-behavior';

interface Props {
  networkMetrics: UserBehaviorManagement.NetworkMetrics;
}

defineProps<Props>();
</script>

<style scoped></style>
