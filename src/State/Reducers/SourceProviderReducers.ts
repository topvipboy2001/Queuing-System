import {
  ESourceProvider,
  SourceProviderDispatchType,
  SourceProviderType,
} from "../ActionTypes/SourceProvidesActionTypes";

export interface IDefaultState {
  loading: boolean;
  error?: Error;
  current: SourceProviderType[];
}

const initialState: IDefaultState = {
  loading: false,
  current: [],
};

const SourceProviderReducer = (
  state: IDefaultState = initialState,
  action: SourceProviderDispatchType
) => {
  switch (action.type) {
    case ESourceProvider.GET_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case ESourceProvider.GET_SUCCESS:
      return {
        loading: true,
        current: action.payload,
      };

    case ESourceProvider.GET_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
      };

    default:
      return {
        loading: false,
        current: state.current,
      };
  }
};

export default SourceProviderReducer;
