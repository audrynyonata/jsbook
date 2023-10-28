import 'bulmaswatch/default/bulmaswatch.min.css';
import './components/syntax.css';

import { createRoot } from 'react-dom/client';
import CodeCell from './src/components/code-cell';

const el = document.getElementById('root');
const root = createRoot(el!);

const App = () => {
  return (
    <>
      <CodeCell />
      <CodeCell />
    </>
  );
};

root.render(<App />);
