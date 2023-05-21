<template>
  <n-space vertical>
    <n-text type="info">设备类型：{{ parsedUserAgent.deviceType }}</n-text>
    <n-text type="info">操作系统：{{ parsedUserAgent.osName }}</n-text>
    <n-text type="info">操作系统版本：{{ parsedUserAgent.osVersion }}</n-text>
    <n-text type="info">浏览器：{{ parsedUserAgent.browserName }}</n-text>
    <n-text type="info">浏览器版本：{{ parsedUserAgent.browserVersion }}</n-text>
    <n-text type="info">浏览器引擎：{{ parsedUserAgent.engineName }}</n-text>
    <n-text type="info">浏览器引擎版本：{{ parsedUserAgent.engineVersion }}</n-text>
  </n-space>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { parseUserAgent } from '~/src/utils/common/parse-user-agent';

interface Props {
  environmentInfo: EnvironmentInfoManagement.EnvironmentInfo;
}

const props = defineProps<Props>();

const parsedUserAgent = computed(() => {
  return parseUserAgent(props.environmentInfo.userAgent);
});

watchEffect(() => {
  console.log(parsedUserAgent.value);
});
</script>

<style scoped></style>
