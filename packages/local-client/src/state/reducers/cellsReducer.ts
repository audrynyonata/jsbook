import { ActionType, Action } from '../actions/action-types';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  focusedIndex: string | null;
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  focusedIndex: null,
  order: [],
  data: {},
};

const reducer = (state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SAVE_CELLS_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case ActionType.FETCH_CELLS: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case ActionType.FETCH_CELLS_COMPLETE: {
      const order = action.payload.map((cell) => cell.id);
      const data = action.payload.reduce((acc, cell) => {
        acc[cell.id] = cell;
        return acc;
      }, {} as CellsState['data']);
      return {
        ...state,
        order,
        data,
      };
    }
    case ActionType.FETCH_CELLS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
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
        focusedIndex: id,
        order,
      };
    }
    case ActionType.DELETE_CELL: {
      const id = action.payload;
      const { [id]: omit, ...data } = state.data;
      const order = state.order.filter((cellId) => cellId !== id);

      return {
        ...state,
        focusedIndex: null,
        data,
        order,
      };
    }
    case ActionType.INSERT_CELL_AFTER: {
      const { id, type, content } = action.payload;

      const cell: Cell = {
        id: randomId(),
        type,
        content: content ? content : '',
      };

      const foundIndex = state.order.findIndex((cellId) => cellId === id);
      const targetIndex = foundIndex + 1;

      let order: string[];
      if (foundIndex < 0) {
        order = [cell.id, ...state.order];
      } else {
        order = [
          ...state.order.slice(0, targetIndex),
          cell.id,
          ...state.order.slice(targetIndex),
        ];
      }

      return {
        ...state,
        focusedIndex: cell.id,
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
        focusedIndex: null,
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            content,
          },
        },
      };
    }
    default:
      return state;
  }
};

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

export default reducer;
