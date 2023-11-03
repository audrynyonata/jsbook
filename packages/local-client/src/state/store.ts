import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistMiddleware } from './middleware/persist-middleware';
import { ActionType } from './actions/action-types';
import { demo } from '../demo';
import { Cell } from './cell';

export const store = createStore(
  reducers,
  {},
  applyMiddleware(persistMiddleware, thunk)
);

if (process.env.REACT_APP_DEMO) {
  demo.reverse().forEach((cell) => {
    const { id, type, content } = cell as Cell;
    store.dispatch({
      type: ActionType.INSERT_CELL_AFTER,
      payload: {
        id,
        type,
        content,
      },
    });
  });
}
