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
        <component :is="renderMeta[userBehavior.name].contentComponent" :user-behavior="userBehavior" />
      </template>
    </n-timeline-item>
  </n-timeline>
</template>

<script setup lang="tsx">
import dayjs from 'dayjs';
import { UserBehaviorMetricsEnum } from '~/src/enums';
import UserBehaviorPageView from './user-behavior-page-view.vue';
import UserBehaviorNetwork from './user-behavior-network.vue';
import UserBehaviorJSError from './user-behavior-js-error.vue';
import UserBehaviorClick from './user-behavior-click.vue';
import type { UserBehaviorManagement } from '~/src/typings/user-behavior';

interface Props {
  userBehaviorList: UserBehaviorManagement.UserBehavior[];
}

withDefaults(defineProps<Props>(), {});

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

const formatTimestamp = (timestamp: number) => {
  return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
};
</script>

<style scoped></style>
