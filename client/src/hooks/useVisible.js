import { useState } from 'react';

function useVisible(state) {
  const [isTargetVisible, setIsTargetVisible] = useState(state);

  const handleTargetShow = () => {
    setIsTargetVisible(!isTargetVisible);
  };

  return [isTargetVisible, handleTargetShow];
}
export default useVisible;
