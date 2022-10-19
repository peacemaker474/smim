import { useState, useRef, useEffect } from 'react';

function useDropdown () {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLElement>();
  const btnRef = useRef<HTMLElement>();

  const handleDropdownShow = () => {
    setIsDropdownVisible(prev => !prev);
  };

  useEffect(() => {
    const checkIfClickedOutside = (evt: Event) => {
      if (isDropdownVisible && btnRef.current && !btnRef.current.contains(evt.target as Node)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isDropdownVisible]);

  return [isDropdownVisible, dropdownRef, btnRef, handleDropdownShow];
}

export default useDropdown;