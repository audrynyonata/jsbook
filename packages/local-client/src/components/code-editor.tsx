import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';
import './code-editor.css';
// import './syntax.css'; // use light theme

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
  onExecuteBundle: React.MouseEventHandler<HTMLButtonElement>;
}

const CodeEditor = ({
  initialValue,
  onChange,
  onExecuteBundle,
}: CodeEditorProps) => {
  const editorRef = useRef<any>();

  const handleEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;

    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    // @ts-ignore
    const highlighter = new Highlighter(window.monaco, codeShift, monacoEditor);
    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  const handleFormat = () => {
    // get current value from editor
    const unformatted = editorRef.current.getModel().getValue();

    // format the value
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <div className="button-wrapper">
        <button
          className="bu-button button-format bu-is-primary bu-is-small"
          onClick={handleFormat}
        >
          Format
        </button>
        <button
          className="bu-button button-play bu-is-primary bu-is-small"
          onClick={onExecuteBundle}
        >
          <span className="bu-icon">
            <i className="fas fa-play" />
          </span>
        </button>
      </div>
      <MonacoEditor
        editorDidMount={handleEditorDidMount}
        value={initialValue}
        // theme="dark" // use light theme
        language="javascript"
        height="100%"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          tabSize: 2,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
