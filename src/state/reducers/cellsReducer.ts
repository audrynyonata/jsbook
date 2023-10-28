import { ActionType, Action } from '../actions/action-types';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = (state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.MOVE_CELL: {
      const { id, direction } = action.payload;
      const foundIndex = state.order.findIndex((cellId) => cellId === id);
      const targetIndex = direction === 'up' ? foundIndex - 1 : foundIndex + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }
      const order = state.order.slice();
      order[foundIndex] = order[targetIndex];
      order[targetIndex] = id;

      return {
        ...state,
        order,
      };
    }
    case ActionType.DELETE_CELL: {
      const id = action.payload;
      const { [id]: omit, ...data } = state.data;
      const order = state.order.filter((cellId) => cellId !== id);
      return {
        ...state,
        data,
        order,
      };
    }
    case ActionType.INSERT_CELL_AFTER: {
      const { id, type } = action.payload;

      const cell: Cell = {
        id: randomId(),
        type,
        content: '',
      };

      const foundIndex = state.order.findIndex((cellId) => cellId === id);

      let order: string[];
      if (foundIndex < 0) {
        order = [cell.id, ...state.order];
      } else {
        order = [
          ...state.order.slice(0, foundIndex),
          cell.id,
          ...state.order.slice(foundIndex + 1),
        ];
      }

      return {
        ...state,
        data: {
          ...state.data,
          [cell.id]: cell,
        },
        order,
      };
    }
    case ActionType.UPDATE_CELL: {
      const { id, content } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [id]: {
            ...state.data.id,
            content,
          },
        },
      };
    }
    default:
      return state;
  }
};

/*
const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;

      state.data[id].content = content;

      return state;
    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);

      return state;
    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;

      return state;
    case ActionType.INSERT_CELL_AFTER:
      const cell: Cell = {
        content: '',
        type: action.payload.type,
        id: randomId(),
      };

      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex(
        (id) => id === action.payload.id
      );

      if (foundIndex < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id);
      }

      return state;
    default:
      return state;
  }
}, initialState);


*/

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

export default reducer;
