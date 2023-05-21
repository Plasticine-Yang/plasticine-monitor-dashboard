<template>
  <n-list hoverable clickable>
    <n-list-item>
      <n-thing>
        <template #header>
          <n-text type="success">tagName：{{ clickMetrics.tagName }}</n-text>
        </template>

        <template #description>
          <n-space vertical>
            <n-text v-if="clickMetrics.id" type="info">id：{{ clickMetrics.id }}</n-text>
            <n-text v-if="clickMetrics.classList.length > 0" type="info"
              >classList：{{ clickMetrics.classList }}</n-text
            >
            <n-text v-if="clickMetrics.textContent" type="info">textContent：{{ clickMetrics.textContent }}</n-text>
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
const clickMetrics = props.userBehavior.value as UserBehaviorManagement.ClickMetrics;
</script>

<style scoped></style>
