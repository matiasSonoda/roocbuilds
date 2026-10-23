import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createBuild } from '../../service/buildService';
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
    setError,
    clearErrors,
    formState: { errors , isSubmitting},
  } = useForm({ defaultValues: BUILD_FORM_DEFAULT_VALUES });

  const handleBuildSubmit = async (formData) => {
    clearErrors('root.server');

    try{
      const buildData = {
        title : formData.title,
        author: formData.author,
        jobClass: formData.jobClass,
        buildType: formData.buildType,
        content: sanitizeBuildContent(formData.content),
      }
      await createBuild(buildData);
      navigate('/');
    }
    catch (error){
      setError('root.server', {
        type: 'server',
        message:
          error instanceof Error
            ? error.message
            : 'Ocurrio un error el publicar la build',
      })
    }
  };

  return (
    <form 
      className={styles.formContainer} 
      onSubmit={handleSubmit(handleBuildSubmit)}
    >
      <div>
        <h1>Build Information</h1>
      </div>
      <BuildFields register={register} errors={errors} />
      <BuildEditor
        onContentChange={(content) => {
          setValue('content', content, 
            { shouldValidate: true });
        }}
      />
      {errors.root?.server && (
        <p className={styles.errorText} role="alert">
          {errors.root.server.message}
        </p>
      )}
      <button 
        className={styles.submitButton} 
        type="submit"
        disabled={isSubmitting}>
        Publish Build
      </button>
    </form>
  );
}
