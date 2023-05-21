<template>
  <n-config-provider
    :theme="theme.naiveTheme"
    :theme-overrides="theme.naiveThemeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :hljs="hljs"
    class="h-full"
  >
    <naive-provider>
      <router-view />
    </naive-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { dateZhCN, zhCN } from 'naive-ui';
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import { subscribeStore, useThemeStore } from '@/store';
import { useGlobalEvents } from '@/composables';

hljs.registerLanguage('json', json);

const theme = useThemeStore();

subscribeStore();
useGlobalEvents();
</script>

<style scoped></style>
