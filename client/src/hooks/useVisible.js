import { useState } from 'react';

function useVisible(state) {
  const [isTargetVisible, setTargetIsVisible] = useState(state);

  const handleClickShow = () => {
    setTargetIsVisible(!isTargetVisible);
  };

  return [isTargetVisible, handleClickShow];
}
export default useVisible;
