import type { PerformanceMetricsEnum } from '../enums';

declare namespace PageManagement {
  interface Page {
    pagePath: string;
    pv: number;
    uv: number;
    performanceMetrics: Partial<Record<PerformanceMetricsEnum, number>>;
  }
}
