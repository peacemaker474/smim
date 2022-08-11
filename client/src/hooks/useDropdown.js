// custom hooks / useDropdown.js
import { useState, useRef, useEffect } from 'react';

function useDropdown() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const btnRef = useRef();

  const handleDropdownShow = () => {
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

  return [isDropdownVisible, dropdownRef, btnRef, handleDropdownShow];
}
export default useDropdown;
