import type { EventTypeEnum } from '../enums';
import type { BaseEvent } from './shared';

declare namespace JSErrorManagement {
  interface JSError {
    /** 错误名称 */
    name?: string;

    /** 错误信息 */
    message: string;

    /** 堆栈信息 */
    stack?: string;

    /** 错误文件名 */
    filename?: string;

    /** 报错的代码行号 */
    lineno?: number;

    /** 报错的代码列号 */
    colno?: number;
  }

  type JSErrorExtra = Record<string, string>;

  interface JSErrorPayload {
    error: JSError;
    extra?: Record<string, string>;
  }

  type JSErrorEvent = BaseEvent<EventTypeEnum.JSError, JSErrorPayload> & {
    eventId: string;
  };
}
