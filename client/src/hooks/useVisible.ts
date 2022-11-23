import { useState } from 'react';

function useVisible(state: boolean) {
  const [isTargetVisible, setIsTargetVisible] = useState(state);

  const handleTargetShow = (state: boolean) => {
    setIsTargetVisible(!state);
  };

  return [isTargetVisible, handleTargetShow] as const;
}

export default useVisible;
