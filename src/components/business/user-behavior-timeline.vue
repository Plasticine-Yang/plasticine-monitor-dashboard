<template>
  <n-timeline :icon-size="20">
    <n-timeline-item
      v-for="userBehavior in userBehaviorList"
      :key="userBehavior.id"
      :color="renderMeta[userBehavior.name].color"
      :title="renderMeta[userBehavior.name].title"
      :time="formatTimestamp(userBehavior.timestamp)"
    >
      <template #default>
        <component
          :is="renderMeta[userBehavior.name].contentComponent"
          :user-behavior="userBehavior"
          @click="() => handleClick(userBehavior)"
        />
      </template>
    </n-timeline-item>
  </n-timeline>

  <monitor-drawer />
</template>

<script setup lang="tsx">
import { formatTimestamp } from '@/utils';
import { UserBehaviorMetricsEnum } from '~/src/enums';
import { useMonitorDrawerStore } from '~/src/store';
import UserBehaviorClick from './user-behavior-click.vue';
import UserBehaviorJSError from './user-behavior-js-error.vue';
import UserBehaviorNetwork from './user-behavior-network.vue';
import UserBehaviorPageView from './user-behavior-page-view.vue';
import type { UserBehaviorManagement } from '~/src/typings/user-behavior';

interface Props {
  userBehaviorList: UserBehaviorManagement.UserBehavior[];
}

withDefaults(defineProps<Props>(), {});

const monitorDrawerStore = useMonitorDrawerStore();

const renderMeta: Record<UserBehaviorMetricsEnum, any> = {
  [UserBehaviorMetricsEnum.PageView]: {
    color: 'green',
    title: '访问页面',
    contentComponent: UserBehaviorPageView
  },

  [UserBehaviorMetricsEnum.JSError]: {
    color: 'red',
    title: '发生异常',
    contentComponent: UserBehaviorJSError
  },

  [UserBehaviorMetricsEnum.Network]: {
    color: 'cyan',
    title: '网络请求',
    contentComponent: UserBehaviorNetwork
  },

  [UserBehaviorMetricsEnum.RouteChange]: {
    color: 'green',
    title: '路由变更',
    contentComponent: UserBehaviorPageView
  },

  [UserBehaviorMetricsEnum.Click]: {
    color: 'yellow',
    title: '点击行为',
    contentComponent: UserBehaviorClick
  }
};

const handleClick = (userBehavior: UserBehaviorManagement.UserBehavior) => {
  monitorDrawerStore.visible = true;
  monitorDrawerStore.environmentInfo = userBehavior.environmentInfo;

  switch (userBehavior.name) {
    case UserBehaviorMetricsEnum.Network:
      monitorDrawerStore.network = userBehavior.value as UserBehaviorManagement.NetworkMetrics;
      break;

    default:
      break;
  }
};
</script>

<style scoped></style>
