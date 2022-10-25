import { useEffect } from 'react';

function useObserve(obsRef: any, hasNextPage: any, fetchNextPage: any) {
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
  }, [hasNextPage, fetchNextPage]);
}
export default useObserve;
