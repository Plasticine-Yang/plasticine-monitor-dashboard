import { ref } from 'vue';
import type { SelectOption } from 'naive-ui';
import { apiGetAllProjects } from '~/src/service';

export default function useProjectSelect() {
  const selectedProjectId = ref<ProjectManagement.Project['id']>('');
  const projectOptions = ref<SelectOption[]>([]);

  const loadProjectOptions = async () => {
    const projects = await apiGetAllProjects();
    projectOptions.value = projects.map(project => ({
      label: project.name,
      value: project.id
    }));

    selectedProjectId.value = (projectOptions.value.at(0)?.value as string) ?? '';
  };

  return {
    selectedProjectId,
    projectOptions,
    loadProjectOptions
  };
}
