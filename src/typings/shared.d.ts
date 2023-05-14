import type { EventTypeEnum } from '../enums';

export interface EnvironmentInfo {
  projectId: string;
  env: string;
  release: string;
  pagePath: string;
  timestamp: number;
  url: string;
  userId: string;
}

export interface BaseEvent<EventType extends EventTypeEnum = EventTypeEnum, Payload = any> {
  id: string;
  eventType: EventType;
  payload: Payload;
  environmentInfo?: EnvironmentInfo;
}
