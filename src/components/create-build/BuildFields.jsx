import { BUILD_TYPES, JOB_CLASSES } from './buildFormConstants';
import styles from '../CreateBuildForm.module.css';

export function BuildFields({ register, errors }) {
  return (
    <>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="build-title">Build title:</label>
        <input
          className={styles.input}
          id="build-title"
          type="text"
          {...register('title', { required: 'Required' })}
        />
        {errors.title && <span className={styles.errorText}>{errors.title.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="build-author">Author:</label>
        <input
          className={styles.input}
          id="build-author"
          type="text"
          {...register('author', { required: 'Required' })}
        />
        {errors.author && <span className={styles.errorText}>{errors.author.message}</span>}
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="build-job-class">Job class:</label>
          <select
            className={styles.select}
            id="build-job-class"
            {...register('jobClass', { required: 'Requerido' })}
          >
            <option value="">-- Select --</option>
            {JOB_CLASSES.map((jobClass) => (
              <option key={jobClass} value={jobClass}>{jobClass}</option>
            ))}
          </select>
          {errors.jobClass && <span className={styles.errorText}>{errors.jobClass.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="build-type">Build Type:</label>
          <select
            className={styles.select}
            id="build-type"
            {...register('buildType', { required: 'Requerido' })}
          >
            <option value="">-- Select --</option>
            {BUILD_TYPES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          {errors.buildType && <span className={styles.errorText}>{errors.buildType.message}</span>}
        </div>
      </div>
    </>
  );
}
