import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BuildEditor } from './BuildEditor';
import { BuildFields } from './BuildFields';
import { BUILD_FORM_DEFAULT_VALUES } from './buildFormConstants';
import { sanitizeBuildContent } from './buildFormUtils';
import styles from '../CreateBuildForm.module.css';

export function CreateBuildForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: BUILD_FORM_DEFAULT_VALUES });

  const handleBuildSubmit = (formData) => {
    sanitizeBuildContent(formData.content);
    navigate('/');
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(handleBuildSubmit)}>
      <div>
        <h1>Build Information</h1>
      </div>
      <BuildFields register={register} errors={errors} />
      <BuildEditor
        onContentChange={(content) => {
          setValue('content', content, { shouldValidate: true });
        }}
      />
      <button className={styles.submitButton} type="submit">
        Publish Build
      </button>
    </form>
  );
}
