import { useCallback, useContext, useEffect } from 'react';
import { Blocker, History, Transition } from 'history';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

export function useBlocker(blocker: Blocker, when = true): void {
  const navigator = useContext(NavigationContext).navigator as History;

  useEffect(() => {
    if (!when) {
      return;
    }

    const unblock = navigator.block((tx: Transition) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };
      blocker(autoUnblockingTx);
    });
    return unblock;
  }, [navigator, blocker, when]);
}

function usePrompt(message: string, action: () => void, when = true) {
  const blocker = useCallback(
    (tx: Transition) => {
      if (window.confirm(message)) {
        action();
        tx.retry();
      }
    },
    [message, action],
  );

  useBlocker(blocker, when);
}

export default usePrompt;
