import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { useClipboard as useVueUseClipboard } from '@vueuse/core';

export default function useClipboard() {
  const message = useMessage();

  async function copyText(text: string) {
    const source = ref(text);
    const { text: _text, copy, copied, isSupported } = useVueUseClipboard({ source });

    if (isSupported) {
      try {
        await copy(text);
        if (copied.value) {
          message.success('复制成功');
        }
      } catch (error) {
        message.error(`复制失败: ${error}`);
      }
    } else {
      message.error('浏览器不支持复制');
    }
  }

  return {
    copyText
  };
}
