import { request } from '../request';
import type { UserBehaviorManagement } from '~/src/typings/user-behavior';

/** 获取所有项目 */
export async function apiGetUserBehaviorInfo(query: SharedQuery) {
  const { projectId, userId, sessionId } = query;

  const res = await request.get<UserBehaviorManagement.UserBehavior[]>('/browser-event/user-behavior-info', {
    params: {
      projectId,
      userId,
      sessionId
    }
  });

  return res.data ?? [];
}
