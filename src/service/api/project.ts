import { request } from '../request';

/** 获取所有项目 */
export async function apiGetAllProjects() {
  const res = await request.get<ProjectManagement.Project[]>('/project');

  return res.data ?? [];
}

/** 创建项目 */
export async function apiCreateProject(project: ProjectManagement.CreateOrEditProjectDTO) {
  await request.post<ProjectManagement.Project>('/project', project);
}

/** 编辑项目 */
export async function apiEditProject(
  projectId: ProjectManagement.Project['id'],
  project: ProjectManagement.CreateOrEditProjectDTO
) {
  await request.patch<ProjectManagement.Project>(`/project/${projectId}`, project);
}

/** 删除项目 */
export async function apiDeleteProject(projectId: ProjectManagement.Project['id']) {
  await request.delete(`/project/${projectId}`);
}

/** 批量删除项目 */
export async function apiDeleteProjects(projectIds: ProjectManagement.Project['id'][]) {
  await Promise.all(projectIds.map(id => apiDeleteProject(id)));
}
