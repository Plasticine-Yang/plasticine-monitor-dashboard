<template>
  <n-card :bordered="false" class="rounded-16px shadow-sm">
    <template #header>
      <n-tag type="primary" :bordered="false">{{ title }}</n-tag>
    </template>

    <div v-if="xAxis.length && yAxis.length" ref="domRef" class="h-600px"></div>
    <n-empty v-else description="暂无数据" size="huge" class="h-600px flex-center" />
  </n-card>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import { useEchartLine } from '~/src/hooks';

interface Props {
  title: string;
  xAxis?: string[];
  yAxis?: number[];
}

const props = withDefaults(defineProps<Props>(), {
  xAxis: () => [],
  yAxis: () => []
});

const { domRef } = useEchartLine(toRef(props, 'xAxis'), toRef(props, 'yAxis'));
</script>

<style scoped></style>
