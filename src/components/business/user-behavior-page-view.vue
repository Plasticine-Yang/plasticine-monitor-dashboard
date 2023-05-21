<template>
  <n-list hoverable clickable>
    <n-list-item>
      <n-thing>
        <template #header>
          <n-text type="success">页面路径：{{ pageViewMetrics.pagePath }}</n-text>
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
const pageViewMetrics = props.userBehavior.value as UserBehaviorManagement.PageViewMetrics;
</script>

<style scoped></style>
