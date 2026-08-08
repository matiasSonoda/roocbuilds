import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import { MOCK_BUILDS } from '../data/mockData';

const MenuBar = ({ editor }) => {
  const fileInputRef = useRef(null);

  if (!editor) return null;

  // Función para procesar la imagen desde la PC del usuario
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Inyectamos la imagen en el editor usando Base64 (Data URI)
        editor.chain().focus().setImage({ src: event.target.result }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  // Estilo genérico para los botones del editor para que no ocupen tanto código
  const btnStyle = (isActive) => ({
    marginRight: '4px',
    marginBottom: '4px',
    padding: '4px 8px',
    cursor: 'pointer',
    backgroundColor: isActive ? '#160b0d' : '#140c25',
    border: '1px solid #c4103d',
    borderRadius: '4px',
    fontWeight: isActive ? 'bold' : 'normal',
  });

  return (
    <div style={{ padding: '10px', borderBottom: '1px solid #18080e', backgroundColor: '#250c0c', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      
      {/* GRUPO 1: Historial */}
      <div>
        <button type="button" onClick={() => editor.chain().focus().undo().run()} style={btnStyle(false)}>↩ Deshacer</button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} style={btnStyle(false)}>↪ Rehacer</button>
      </div>

      {/* GRUPO 2: Títulos (H1 a H4) */}
      <div style={{ borderLeft: '2px solid #ccc', paddingLeft: '10px' }}>
        {[1, 2, 3, 4].map(level => (
          <button 
            key={level} type="button" 
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            style={btnStyle(editor.isActive('heading', { level }))}
          >
            H{level}
          </button>
        ))}
      </div>

      {/* GRUPO 3: Formato de Texto */}
      <div style={{ borderLeft: '2px solid #ccc', paddingLeft: '10px' }}>
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} style={btnStyle(editor.isActive('bold'))}><b>B</b></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} style={btnStyle(editor.isActive('italic'))}><i>I</i></button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} style={btnStyle(editor.isActive('underline'))}><u>U</u></button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} style={btnStyle(editor.isActive('strike'))}><s>S</s></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHighlight().run()} style={btnStyle(editor.isActive('highlight'))}><mark>Highlight</mark></button>
      </div>

      {/* GRUPO 4: Listas */}
      <div style={{ borderLeft: '2px solid #ccc', paddingLeft: '10px' }}>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} style={btnStyle(editor.isActive('bulletList'))}>• Lista</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} style={btnStyle(editor.isActive('orderedList'))}>1. Lista</button>
      </div>

      {/* GRUPO 5: Alineación */}
      <div style={{ borderLeft: '2px solid #ccc', paddingLeft: '10px' }}>
        {['left', 'center', 'right', 'justify'].map(align => (
          <button 
            key={align} type="button" 
            onClick={() => editor.chain().focus().setTextAlign(align).run()}
            style={btnStyle(editor.isActive({ textAlign: align }))}
          >
            {align.charAt(0).toUpperCase() + align.slice(1)}
          </button>
        ))}
      </div>

      {/* GRUPO 6: Extras (Tabla e Imagen) */}
      <div style={{ borderLeft: '2px solid #ccc', paddingLeft: '10px', display: 'flex', alignItems: 'center' }}>
        <button type="button" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} style={btnStyle(false)}>
          Insertar Tabla
        </button>
        
        {/* Truco: Ocultamos el input file feo y usamos un botón bonito que lo acciona */}
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          style={{ display: 'none' }} 
        />
        <button type="button" onClick={() => fileInputRef.current.click()} style={btnStyle(false)}>
          🖼 Subir Imagen
        </button>
      </div>
    </div>
  );
};

export function CreateBuildForm() {
  const navigate = useNavigate();
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: { title: '', jobClass: '', buildType: '', content: '' }
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell
    ],
    content: '<p>Escribe tu guía aquí...</p>',
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
      id: Date.now().toString(),
      title: data.title,
      author: 'Usuario_Prueba',
      jobClass: data.jobClass,
      buildType: data.buildType,
      votes: 0,
      createdAt: new Date().toISOString().split('T')[0],
      description: 'Guía recién publicada por la comunidad.',
      content: cleanHTML
    };

    MOCK_BUILDS.unshift(nuevaBuild); 
    navigate('/');
  };

  return (
    // ... El resto del JSX del formulario se mantiene igual (Title, JobClass, BuildType, Editor)
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      
      <div>
        <label style={{ display: 'block', fontWeight: 'bold' }}>Título de la Build:</label>
        <input type="text" {...register('title', { required: 'Requerido' })} style={{ width: '100%', padding: '8px' }} />
        {errors.title && <span style={{ color: 'red' }}>{errors.title.message}</span>}
      </div>

      <div style={{ display: 'flex', gap: '15px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Clase:</label>
          <select {...register('jobClass', { required: 'Requerido' })} style={{ width: '100%', padding: '8px' }}>
            <option value="">-- Selecciona --</option>
            <option value="knight">Knight</option>
            <option value="wizard">Wizard</option>
            <option value="hunter">Hunter</option>
            <option value="assassin">Assassin</option>
            <option value="priest">Priest</option>
            <option value="blacksmith">Blacksmith</option>
          </select>
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Tipo:</label>
          <select {...register('buildType', { required: 'Requerido' })} style={{ width: '100%', padding: '8px' }}>
            <option value="">-- Selecciona --</option>
            <option value="pve">PvE (Monstruos/MVP)</option>
            <option value="pvp">PvP (Jugadores/WoE)</option>
          </select>
        </div>
      </div>

      <div style={{ border: '1px solid #ccc', borderRadius: '4px' }}>
        <MenuBar editor={editor} />
        <div style={{ padding: '15px', minHeight: '300px' }}>
          <EditorContent editor={editor} />
        </div>
      </div>

      <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#0066cc', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
        Publicar Build
      </button>
    </form>
  );
}