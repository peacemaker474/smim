import { useState } from 'react';

function useText() {
  const [text, setText] = useState<string>('');

  const handleTextWrite = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target?.value);
  };

  return [text, setText, handleTextWrite] as const;
}

export default useText;
