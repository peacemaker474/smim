const useDebounce = (func: any, wait: number) => {
  let timeout: NodeJS.Timeout | null;
  return (...args: any) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(this, args);
    }, wait);
  };
};

export default useDebounce;
