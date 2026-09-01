import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import { MOCK_BUILDS } from '../data/mockData';
import styles from './CreateBuildForm.module.css';

const MenuBar = ({ editor }) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!editor) return null;

  // Función para procesar la imagen desde la PC del usuario
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return; 

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file',file);

      const response = await fetch('http://localhost:8080/api/v1/builds/upload', {
        method: 'POST',
        body: formData,  
      });
      if (!response.ok){
        throw new Error('Error to upload the image to the server');
      }

      const data = await response.json();
      const imageUrl = data.url;

      editor.chain().focus().setImage({src: imageUrl}).run();
    }catch(error){
      throw new Error('Hubo un problema subiendo la imagen', error);
    }finally{
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

return (
    <div className={styles.menuBarContainer}>
      
      {/* GRUPO 1: Historial */}
      <div className={styles.menuGroup}>
        <button className={styles.menuButton} type="button" onClick={() => editor.chain().focus().undo().run()}>↩ Undo</button>
        <button className={styles.menuButton} type="button" onClick={() => editor.chain().focus().redo().run()}>↪ Redo</button>
      </div>

      {/* GRUPO 2: Títulos (H1 a H4) */}
      <div className={styles.menuGroup}>
        <select
          className={styles.menuSelect}
          defaultValue="paragraph"
          onChange={(event) => {
            const value = event.target.value;
            if (value === 'paragraph') {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().toggleHeading({ level: Number(value) }).run();
            }
          }}
          aria-label="Select degree level"
        >
          <option value="paragraph">Normal text</option>
          {[1, 2, 3, 4].map(level => (
            <option key={level} value={level}>H{level}</option>
          ))}
        </select>
      </div>

      {/* GRUPO 3: Formato de Texto */}
      <div className={styles.menuGroup}>
        <button className={styles.menuButton} type="button" onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></button>
        <button className={styles.menuButton} type="button" onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></button>
        <button className={styles.menuButton} type="button" onClick={() => editor.chain().focus().toggleUnderline().run()}><u>U</u></button>
        <button className={styles.menuButton} type="button" onClick={() => editor.chain().focus().toggleStrike().run()}><s>S</s></button>
        <button className={styles.menuButton} type="button" onClick={() => editor.chain().focus().toggleHighlight().run()}><mark>Highlight</mark></button>
      </div>

      {/* GRUPO 4: Listas */}
      <div className={styles.menuGroup}>
        <button className={styles.menuButton} type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
        <button className={styles.menuButton} type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
      </div>

      {/* GRUPO 5: Alineación */}
      <div className={styles.menuGroup}>
        <select
          className={styles.menuSelect}
          defaultValue="left"
          onChange={(event) => {
            const align = event.target.value;
            editor.chain().focus().setTextAlign(align).run();
          }}
          aria-label="Select text alignment"
        >
        {[
          ['left', 'Left'],
          ['center', 'Center'],
          ['right', 'Right'],
          ['justify', 'Justify']
        ].map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
        </select>
      </div>

      {/* GRUPO 6: Extras (Tabla e Imagen) */}
      <div className={styles.menuGroup}>
        {/* Truco: Ocultamos el input file feo y usamos un botón bonito que lo acciona */}
        <input 
          className={styles.hiddenInput}
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
        />
        <button 
          className={styles.menuButton} 
          type="button" 
          onClick={() => fileInputRef.current.click()}
          disabled={isUploading} 
        >
          {isUploading ? '⏳ Subiendo...' : '🖼 Upload Image'}
        </button>
      </div>
    </div>
  );
};

export function CreateBuildForm() {
  const navigate = useNavigate();
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: { title: '', author: '', jobClass: '', buildType: '', content: '' }
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Placeholder.configure({
        placeholder: 'Write your guide here...'
      }),
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setValue('content', editor.getHTML(), { shouldValidate: true });
    },
  });

  useEffect(() => {
    return () => { if (editor) editor.destroy(); };
  }, [editor]);

  const onSubmit = (data) => {
    // IMPORTANTE: Permitimos atributos 'style' (para alineación) y 'src' (para imágenes)
    const cleanHTML = DOMPurify.sanitize(data.content, {
      ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'strong', 'em', 'u', 's', 'mark', 'ul', 'ol', 'li', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
      ALLOWED_ATTR: ['style', 'src', 'alt', 'class']
    });
    
    const nuevaBuild = {
      title: data.title,
      author: data.author,
      jobClass: data.jobClass,
      buildType: data.buildType,
      votes: 0,
      description: 'Guía recién publicada por la comunidad.',
      content: cleanHTML
    };

    MOCK_BUILDS.unshift(nuevaBuild); 
    navigate('/');
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h1>Build Information</h1>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Build title:</label>
        <input className={styles.input} type="text" {...register('title', { required: 'Required' })}/>
        {errors.title && <span className={styles.errorText}>{errors.title.message}</span>}
      </div>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>Author:</label>
        <input className={styles.input} type="text" {...register('author', { required: 'Required'})} />
        {errors.author && <span className={styles.errorText}>{errors.author.message}</span>}
      </div>
      
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Job class:</label>
          <select className={styles.select} {...register('jobClass', { required: 'Requerido' })}>
            <option value="">-- Select --</option>
            <option value="Lord Knight">Lord Knight</option>
            <option value="Paladin">Paladin</option>
            <option value="Minstrel">Minstrel</option>
            <option value="Gypsy">Gypsy</option>
            <option value="Assasin Cross">Assasin Cross</option>
            <option value="Stalker">Stalker</option>
            <option value="High Priest">High Priest</option>
            <option value="Champion">Champion</option>
            <option value="High Wizzard">High Wizzard</option>
            <option value="Professor">Professor</option>
            <option value="Mastersmith">Mastersmith</option>
            <option value="Biochemist">Biochemist</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Build Type:</label>
          <select className={styles.select} {...register('buildType', { required: 'Requerido' })}>
            <option value="">-- Select --</option>
            <option value="pve">PvE (MVP)</option>
            <option value="pvp">PvP (Player vs Player)</option>
            <option value="woe">Woe (War of Emperium)</option>
          </select>
        </div>
      </div>

      <div className={styles.editorContainer}>
        <div><h1>Build Guide</h1></div>
        <MenuBar editor={editor} />
        <div className={styles.editorWrapper}>
          <EditorContent className={styles.editorArea} editor={editor} />
        </div>
      </div>

      <button className={styles.submitButton} type="submit">
        Publish Build
      </button>
    </form>
  );
}