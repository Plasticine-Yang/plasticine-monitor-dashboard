import type { JSErrorManagement } from '@/typings/js-error';
import { request } from '../request';

/** 获取所有项目 */
export async function apiGetAllJSErrorEvents(projectId: string, timeRange: string) {
  const res = await request.get<JSErrorManagement.JSErrorEvent[]>('/browser-event/js-error-event', {
    params: { projectId, timeRange }
  });

  return res.data ?? [];
}
