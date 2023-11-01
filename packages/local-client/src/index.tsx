// import 'bulmaswatch/superhero/bulmaswatch.min.css'; // use light theme
import 'bulmaswatch/default/bulmaswatch.min.css';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import CellList from './components/cell-list';
import { store } from './state';

const el = document.getElementById('root');
const root = createRoot(el!);

const App = () => {
  return (
    <Provider store={store}>
      <CellList />
    </Provider>
  );
};

root.render(<App />);
