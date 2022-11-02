import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Title from '../atoms/Title';
import TargetAge from '../atoms/TargetAge';
import TagInput from '../atoms/TagInput';

function CreateForm() {
  const { register, setValue } = useForm({
    mode: 'onBlur',
    defaultValues: {
      tagArray: [],
      title: '',
      para: { para: '', img: [] },
      age: '',
    },
  });

  useEffect(() => {
    setValue('title', '');
    setValue('para', { para: '', img: [] });
    setValue('age', '');
    setValue('tagArray', []);
  }, [setValue]);

  return (
    <form id="upload" method="POST">
      <Title register={register} />
      <TargetAge register={register} />
      <TagInput />
    </form>
  );
}
export default CreateForm;
