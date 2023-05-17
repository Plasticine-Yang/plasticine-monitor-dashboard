import { request } from '../request';
import type { PageManagement } from '~/src/typings/page-management';

export async function apiGetPageInfoList(query: SharedQuery) {
  const { projectId } = query;

  const res = await request.get<PageManagement.Page[]>('/browser-event/pages', {
    params: { projectId }
  });

  return res.data ?? [];
}
