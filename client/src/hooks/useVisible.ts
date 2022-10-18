import { useState } from 'react';

function useVisible (state: boolean) {
  const [isTargetVisible, setIsTargetVisible] = useState(state);

  const handleTargetShow = () => {
    setIsTargetVisible(prev => !prev);
  };

  return [isTargetVisible, handleTargetShow];
}

export default useVisible;