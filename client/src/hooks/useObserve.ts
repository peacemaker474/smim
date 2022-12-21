import { useEffect } from 'react';

function useObserve(
  obsRef: React.RefObject<HTMLInputElement>,
  hasNextPage: boolean | undefined,
  fetchNextPage: () => void,
) {
  useEffect(() => {
    if (!hasNextPage) {
      return;
    }
    const observer = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      }),
    );
    const el = obsRef && obsRef.current;

    if (!el) {
      return;
    }
    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [hasNextPage, fetchNextPage, obsRef]);
}
export default useObserve;
