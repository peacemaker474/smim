import { useState } from 'react';

function useText() {
  const [text, setText] = useState('');

  const handleTagWrite = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget?.value);
  };

  return [text, setText, handleTagWrite];
}

export default useText;
