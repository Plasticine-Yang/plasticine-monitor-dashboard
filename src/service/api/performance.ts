import type { PerformanceMetricsEnum } from '@/enums';
import { request } from '../request';

export async function apiGetAllPerformanceEventPagePaths(query: SharedQuery) {
  const { projectId } = query;

  const res = await request.get<string[]>('/browser-event/performance-event-page-paths', {
    params: { projectId }
  });

  return res.data ?? [];
}

export async function apiGetAllPerformanceEventLineChart(query: SharedQuery) {
  const { projectId, timeRange, pagePath } = query;

  const res = await request.get<Record<PerformanceMetricsEnum, PerformanceEventManagement.EChartsLineData>>(
    '/browser-event/performance-event-line-chart',
    {
      params: { projectId, timeRange, pagePath }
    }
  );

  return res.data ?? null;
}
