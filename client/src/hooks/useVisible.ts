import { useState } from 'react';

function useVisible(state: boolean) {
  const [isTargetVisible, setIsTargetVisible] = useState(state);

  const handleTargetShow = () => {
    setIsTargetVisible(!isTargetVisible);
  };

  return [isTargetVisible, handleTargetShow] as const;
}

export default useVisible;
