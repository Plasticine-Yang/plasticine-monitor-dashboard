import { defineStore } from 'pinia';
import type { UserBehaviorManagement } from '~/src/typings/user-behavior';

interface MonitorDrawerState {
  visible: boolean;
  environmentInfo: EnvironmentInfoManagement.EnvironmentInfo | null;
  network: UserBehaviorManagement.NetworkMetrics | null;
}

export const useMonitorDrawerStore = defineStore('monitor-drawer-store', {
  state: (): MonitorDrawerState => ({
    visible: false,
    environmentInfo: null,
    network: null
  })
});
