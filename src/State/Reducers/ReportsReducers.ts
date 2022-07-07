import {
  EReports,
  IReportDispatchType,
  ReportsType,
} from "../ActionTypes/ReportsActionTypes";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current: ReportsType[];
}

const initialState: defaultState = {
  loading: false,
  current: [],
};

const ReportsReducers = (
  state: defaultState = initialState,
  action: IReportDispatchType
) => {
  switch (action.type) {
    case EReports.GET_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case EReports.GET_SUCCESS:
      return {
        loading: false,
        current: action.payload,
      };

    case EReports.GET_ERROR:
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

export default ReportsReducers;
