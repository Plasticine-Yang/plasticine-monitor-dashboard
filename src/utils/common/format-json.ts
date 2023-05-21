export const formatJSON = (input?: string | Record<string, any>) => {
  try {
    const res = JSON.stringify(typeof input === 'string' ? JSON.parse(input) : input, null, 2);
    return res;
  } catch (error) {
    return '';
  }
};
