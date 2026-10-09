import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import { EditorMenuBar } from './EditorMenuBar';
import styles from '../CreateBuildForm.module.css';

const EDITOR_EXTENSIONS = [
  StarterKit.configure({
    blockquote: false,
    code: false,
    codeBlock: false,
    dropcursor: false,
    gapcursor: false,
    hardBreak: false,
    heading: { levels: [1, 2, 3, 4] },
    horizontalRule: false,
    listKeymap: false,
    link: false,
    strike: false,
    trailingNode: false,
    undoRedo: false,
    underline: false,
  }),
  Image,
  Youtube,
];

export function BuildEditor({ onContentChange }) {
  const editor = useEditor({
    extensions: EDITOR_EXTENSIONS,
    content: '',
    onUpdate: ({ editor: updatedEditor }) => {
      onContentChange(updatedEditor.getHTML());
    },
  });

  return (
    <section className={styles.editorContainer}>
      <div><h1>Build Guide</h1></div>
      <EditorMenuBar editor={editor} />
      <div className={styles.editorWrapper}>
        <EditorContent className={styles.editorArea} editor={editor} />
      </div>
    </section>
  );
}
