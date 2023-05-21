import type { Ref } from 'vue';
import { ref } from 'vue';
import type { SelectOption } from 'naive-ui';
import { apiGetAllPerformanceEventPagePaths } from '~/src/service';

export default function usePagePathSelect(projectId: Ref<string>) {
  const selectedPagePath = ref<string>('');
  const pagePathOptions = ref<SelectOption[]>([]);

  const loadPagePathOptions = async () => {
    const pagePaths = await apiGetAllPerformanceEventPagePaths({
      projectId: projectId.value
    });
    pagePathOptions.value = pagePaths.map(pagePath => ({
      label: pagePath,
      value: pagePath
    }));

    selectedPagePath.value = (pagePathOptions.value.at(0)?.value as string) ?? '';
  };

  return {
    selectedPagePath,
    pagePathOptions,
    loadPagePathOptions
  };
}
