import type { UserBehaviorMetricsEnum } from '../enums';
import type { JSErrorManagement } from './js-error';

declare namespace UserBehaviorManagement {
  interface PageViewMetrics {
    pagePath: string;
  }

  type JSErrorMetrics = JSErrorManagement.JSErrorPayload;

  type RequestType = 'XHR' | 'Fetch';

  interface NetworkRequest {
    method: string;
    url: string;
    timestamp: number;
    headers?: Record<string, string>;
    body?: string;
    reason?: string;
  }

  interface NetworkResponse {
    status: number;
    timestamp: number;
    headers?: Record<string, string>;
    body?: string;
  }

  /** HTTP 网络请求指标 */
  interface NetworkMetrics {
    /** 请求的类型 - XHR or Fetch */
    requestType: RequestType;
    request: NetworkRequest;
    response: NetworkResponse;
    /** 请求耗时时长 */
    duration: number;
  }

  /** 用户点击行为指标 */
  interface ClickMetrics {
    /** 被点击元素的 id */
    id?: string;

    /** 被点击元素的所有 className */
    classList: string[];

    /** 被点击元素的标签名 */
    tagName: string;

    /** 被点击元素的文本内容 */
    textContent?: string;
  }

  interface UserBehavior {
    id: string;
    name: UserBehaviorMetricsEnum;
    value: PageViewMetrics | JSErrorMetrics | NetworkMetrics | ClickMetrics;
    timestamp: number;
  }
}
