import { ref } from 'vue';
import { STORAGE_FILTER_ITEM_USER_ID } from '@/constants';

export default function useUserIdInput() {
  const storageUserId = localStorage.getItem(STORAGE_FILTER_ITEM_USER_ID) ?? '';
  const userId = ref(storageUserId);

  return { userId };
}
