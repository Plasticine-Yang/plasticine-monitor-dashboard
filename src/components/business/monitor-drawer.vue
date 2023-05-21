<template>
  <n-drawer v-model:show="monitorDrawer.visible" resizable :default-width="1024" @update:show="handleUpdateShow">
    <n-drawer-content closable title="详细信息">
      <n-space vertical>
        <!-- 网络请求响应监控详情信息 -->
        <n-card v-if="monitorDrawer.environmentInfo !== null" title="环境信息">
          <monitor-drawer-environment-info :environment-info="environmentInfo" />
        </n-card>

        <!-- 网络请求响应监控详情信息 -->
        <n-card v-if="monitorDrawer.network !== null" title="网络请求响应监控详情信息">
          <monitor-drawer-network :network-metrics="networkMetrics" />
        </n-card>
      </n-space>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMonitorDrawerStore } from '~/src/store';
import type { UserBehaviorManagement } from '~/src/typings/user-behavior';

const monitorDrawer = useMonitorDrawerStore();
const networkMetrics = computed(() => monitorDrawer.network as UserBehaviorManagement.NetworkMetrics);
const environmentInfo = computed(() => monitorDrawer.environmentInfo as EnvironmentInfoManagement.EnvironmentInfo);

const handleUpdateShow = (visible: boolean) => {
  monitorDrawer.visible = visible;

  if (!visible) {
    monitorDrawer.environmentInfo = null;
    monitorDrawer.network = null;
  }
};
</script>

<style scoped></style>
