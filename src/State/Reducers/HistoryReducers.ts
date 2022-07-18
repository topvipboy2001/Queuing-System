import {
  EHistory,
  HistoryDispatchType,
  HistoryType,
} from "../ActionTypes/HistoryActionTypes";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current: HistoryType[];
  rootData: HistoryType[];
}

const initialState: defaultState = {
  loading: false,
  current: [],
  rootData: [],
};

const HistoryReducer = (
  state: defaultState = initialState,
  action: HistoryDispatchType
) => {
  switch (action.type) {
    case EHistory.GET_LOADING:
      return {
        loading: true,
        current: state.current,
        rootData: state.rootData,
      };

    case EHistory.GET_ERROR:
      return {
        loading: false,
        current: state.current,
        rootData: state.rootData,
        error: action.error,
      };

    case EHistory.GET_SUCCESS:
      return {
        loading: false,
        current: action.payload,
        rootData: action.payload,
      };

    case EHistory.GET_WITH_FILTER_LOADING:
      return {
        loading: true,
        current: state.current,
        rootData: state.rootData,
      };

    case EHistory.GET_WITH_FILTER_ERROR:
      return {
        loading: false,
        current: state.current,
        rootData: state.rootData,
        error: action.error,
      };

    case EHistory.GET_WITH_FILTER_SUCCESS:
      return {
        loading: false,
        current: action.payload,
        rootData: state.rootData,
      };

    default:
      return {
        loading: false,
        current: state.current,
        rootData: state.rootData,
      };
  }
};

export default HistoryReducer;
