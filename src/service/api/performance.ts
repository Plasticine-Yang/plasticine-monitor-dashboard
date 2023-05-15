import type { PerformanceMetricsEnum } from '@/enums';
import { request } from '../request';

export async function apiGetAllPerformanceEventLineChart(projectId: string, timeRange: string) {
  const res = await request.get<Record<PerformanceMetricsEnum, PerformanceEventManagement.EChartsLineData>>(
    '/browser-event/performance-event-line-chart',
    {
      params: { projectId, timeRange }
    }
  );

  return res.data ?? null;
}
