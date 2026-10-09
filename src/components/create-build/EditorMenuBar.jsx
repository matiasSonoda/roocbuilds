import { useRef, useState } from 'react';
import { uploadBuildImage } from './imageService';
import styles from '../CreateBuildForm.module.css';

export function EditorMenuBar({ editor }) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [actionError, setActionError] = useState('');

  if (!editor) return null;

  const handleImageUpload = async (event) => {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setActionError('');

    try {
      const imageUrl = await uploadBuildImage(file);
      editor.chain().focus().setImage({ src: imageUrl }).run();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Hubo un problema subiendo la imagen.');
    } finally {
      setIsUploading(false);
      input.value = '';
    }
  };

  const handleYoutubeInsert = () => {
    const videoUrl = window.prompt('Ingresa la URL del video de YouTube:');
    if (!videoUrl?.trim()) return;

    setActionError('');
    const inserted = editor.chain().focus().setYoutubeVideo({ src: videoUrl.trim() }).run();
    if (!inserted) {
      setActionError('La URL ingresada no corresponde a un video de YouTube válido.');
    }
  };

  return (
    <div className={styles.menuBarContainer}>
      <div className={styles.menuGroup}>
        <select
          className={styles.menuSelect}
          defaultValue="paragraph"
          onChange={(event) => {
            const { value } = event.target;
            if (value === 'paragraph') {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().toggleHeading({ level: Number(value) }).run();
            }
          }}
          aria-label="Select degree level"
        >
          <option value="paragraph">Normal text</option>
          {[1, 2, 3, 4].map((level) => (
            <option key={level} value={level}>H{level}</option>
          ))}
        </select>
      </div>

      <div className={styles.menuGroup}>
        <button className={styles.menuButton} type="button" onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></button>
        <button className={styles.menuButton} type="button" onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></button>
      </div>

      <div className={styles.menuGroup}>
        <button className={styles.menuButton} type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
        <button className={styles.menuButton} type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
      </div>

      <div className={styles.menuGroup}>
        <input
          className={styles.hiddenInput}
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          aria-label="Choose an image to upload"
        />
        <button
          className={styles.menuButton}
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? '⏳ Subiendo...' : '🖼 Upload Image'}
        </button>
        <button className={styles.menuButton} type="button" onClick={handleYoutubeInsert}>
          ▶ Insert YouTube video
        </button>
      </div>
      {actionError && <span className={styles.errorText} role="alert">{actionError}</span>}
    </div>
  );
}
