import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistMiddleware } from './middleware/persist-middleware';
import { ActionType } from './actions/action-types';
import { Cell } from './cell';

export const store = createStore(
  reducers,
  {},
  applyMiddleware(persistMiddleware, thunk)
);

if (process.env.REACT_APP_DEMO) {
  fetch('demo.json', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const { demo } = data;
      demo.reverse().forEach((cell: Cell) => {
        const { id, type, content } = cell;
        store.dispatch({
          type: ActionType.INSERT_CELL_AFTER,
          payload: {
            id,
            type,
            content,
          },
        });
      });
    });
}
