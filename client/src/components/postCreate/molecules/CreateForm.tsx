import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Title from '../atoms/Title';
import TargetAge from '../atoms/TargetAge';
import TagInput from '../atoms/TagInput';
import Editor from '../atoms/Editor';

interface ParaProps {
  p: string;
  img: Array<string>;
}
interface FormValue {
  title: '';
  tagArray: Array<string>;
  para: ParaProps;
  age: '';
}

function CreateForm() {
  const {
    register,
    setValue,
    // setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<FormValue>({
    mode: 'onBlur',
  });

  useEffect(() => {
    setValue('title', '');
    setValue('para', { p: '', img: [] });
    setValue('age', '');
    setValue('tagArray', []);
  }, [setValue]);

  return (
    <form id="upload" method="POST">
      <Title register={register} errors={errors.title} />
      <TargetAge register={register} errors={errors.age} />
      <TagInput
        register={register}
        setValue={setValue}
        clearErrors={clearErrors}
        watch={watch}
        // setError={setError}
        // errors={errors.tagArray}
      />
      <Editor
        register={register}
        setValue={setValue}
        clearErrors={clearErrors}
        watch={watch}
        // setError={setError}
        // errors={errors.para}
      />
    </form>
  );
}
export default CreateForm;
