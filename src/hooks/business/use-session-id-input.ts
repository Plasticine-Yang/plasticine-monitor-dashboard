import { ref } from 'vue';
import { STORAGE_FILTER_ITEM_SESSION_ID } from '~/src/constants';

export default function useSessionIdInput() {
  const storageSessionId = localStorage.getItem(STORAGE_FILTER_ITEM_SESSION_ID) ?? '';
  const sessionId = ref(storageSessionId);

  return { sessionId };
}
