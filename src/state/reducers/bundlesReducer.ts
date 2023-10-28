import { ActionType, Action } from '../actions/action-types';

interface BundlesState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        error: string;
      }
    | undefined;
}

const initialState: BundlesState = {};

const reducer = (
  state: BundlesState = initialState,
  action: Action
): BundlesState => {
  switch (action.type) {
    case ActionType.BUNDLE_START: {
      const { cellId } = action.payload;
      return {
        ...state,
        [cellId]: {
          loading: true,
          code: '',
          error: '',
        },
      };
    }
    case ActionType.BUNDLE_COMPLETE: {
      const { cellId, bundle } = action.payload;
      return {
        ...state,
        [cellId]: {
          loading: false,
          code: bundle.code,
          error: bundle.error,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
