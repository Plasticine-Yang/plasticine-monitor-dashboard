declare namespace EnvironmentInfoManagement {
  interface EnvironmentInfo {
    projectId: string;
    env: string;
    release: string;
    pagePath: string;
    timestamp: number;
    url: string;
    userId: string;
    sessionId: string;
    userAgent: string;
  }
}
