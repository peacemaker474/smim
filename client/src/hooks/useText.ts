import { useState } from 'react';

function useText() {
  const [text, setText] = useState<string>('');

  const handleTagWrite = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target?.value);
  };

  return [text, setText, handleTagWrite];
}

export default useText;
