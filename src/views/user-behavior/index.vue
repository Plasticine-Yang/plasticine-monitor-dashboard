<template>
  <n-space vertical>
    <n-card title="用户行为监控" :bordered="false" class="rounded-16px shadow-sm">
      <data-filter
        v-model:project-id="selectedProjectId"
        v-model:user-id="userId"
        v-model:session-id="sessionId"
        show-filter-button
        :filter-items-for-display="['project', 'userId', 'sessionId']"
        :project-options="projectOptions"
        @click-filter-button="handleClickFilterButton"
      />
    </n-card>

    <n-card :bordered="false" class="rounded-16px shadow-sm">
      <n-tabs>
        <!-- 用户行为时间线 -->
        <n-tab-pane name="user-behavior-timeline" tab="用户行为时间线">
          <n-empty v-if="userBehaviorList.length === 0" />

          <user-behavior-timeline v-else :user-behavior-list="userBehaviorList" />
        </n-tab-pane>

        <!-- 用户行为录屏 -->
        <n-tab-pane name="user-behavior-record" tab="用户行为录屏">
          <user-behavior-record />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import type { UserBehaviorManagement } from '@/typings/user-behavior';
import { useProjectSelect, useSessionIdInput, useUserIdInput } from '~/src/hooks';
import { apiGetUserBehaviorInfo } from '~/src/service/api/user-behavior';

const { projectOptions, selectedProjectId, loadProjectOptions } = useProjectSelect();
const { userId } = useUserIdInput();
const { sessionId } = useSessionIdInput();

const userBehaviorList = ref<UserBehaviorManagement.UserBehavior[]>([]);

async function fetchUserBehaviorTimeline() {
  if (selectedProjectId.value && userId.value && sessionId.value) {
    const fetchedUserBehaviorList = await apiGetUserBehaviorInfo({
      projectId: selectedProjectId.value,
      userId: userId.value,
      sessionId: sessionId.value
    });

    userBehaviorList.value = fetchedUserBehaviorList;
  }
}

async function handleClickFilterButton() {
  fetchUserBehaviorTimeline();
}

onBeforeMount(async () => {
  await loadProjectOptions();
  await fetchUserBehaviorTimeline();
});
</script>

<style scoped></style>
