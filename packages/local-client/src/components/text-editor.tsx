import MDEditor from '@uiw/react-md-editor';
import { useEffect, useRef, useState } from 'react';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import './text-editor.css';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor = ({ cell }: TextEditorProps) => {
  const { updateCell } = useActions();

  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };

    window.addEventListener('click', listener, { capture: true });

    return () => {
      window.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <>
        <div className="text-editor" ref={ref}>
          <MDEditor
            value={cell.content}
            onChange={(value) => updateCell(cell.id, value || '')}
          />
        </div>
        <div className="save-bar">
          <button className="button is-primary is-small">
            <i className="fas fa-check" />
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || 'Click to edit'} />
      </div>
    </div>
  );
};

export default TextEditor;
