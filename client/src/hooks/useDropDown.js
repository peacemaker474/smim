// custom hooks / useDropDown.js
import { useState, useRef, useEffect } from 'react';

function useDropDown() {
  const [isVisible, setIsVisible] = useState(false);
  const dropDownRef = useRef(null);
  const btnRef = useRef();

  const handleDropDownShow = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isVisible && btnRef.current && !btnRef.current.contains(e.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isVisible]);

  return [isVisible, dropDownRef, btnRef, handleDropDownShow];
}
export default useDropDown;
