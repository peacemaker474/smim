import { useEffect, useState, useRef } from 'react';

const useDropdown = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<any>(null);
  const btnRef = useRef<any>(null);
  const handleDropdownShow = (prev: boolean) => setIsDropdownVisible(!prev);

  useEffect(() => {
    const checkIfClickedOutside = (event: MouseEvent) => {
      if (isDropdownVisible && btnRef.current && !btnRef.current.contains((event?.target as any) || null)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isDropdownVisible]);

  return [isDropdownVisible, dropdownRef, btnRef, handleDropdownShow];
};

export default useDropdown;
