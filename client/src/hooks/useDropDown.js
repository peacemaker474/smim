// custom hooks / useDropDown.js
import { useState, useRef, useEffect } from 'react';

function useDropDown() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropDownRef = useRef(null);
  const btnRef = useRef();

  const handleDropDownShow = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isDropdownVisible && btnRef.current && !btnRef.current.contains(e.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isDropdownVisible]);

  return [isDropdownVisible, dropDownRef, btnRef, handleDropDownShow];
}
export default useDropDown;
