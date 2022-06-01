// custom hooks / useDropdown.js
import { useState, useRef, useEffect } from 'react';

function useDropdown() {
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef(null);
  const btnRef = useRef();

  const handleDropdownShow = () => {
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

  return [isVisible, dropdownRef, btnRef, handleDropdownShow];
}
export default useDropdown;
