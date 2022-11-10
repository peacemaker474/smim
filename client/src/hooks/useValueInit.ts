import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';

function useValueInit(setValue: UseFormSetValue<any>) {
  useEffect(() => {
    setValue('title', '');
    setValue('para', { para: '', img: [] });
    setValue('age', '');
    setValue('tagArray', []);
  }, [setValue]);
}

export default useValueInit;
