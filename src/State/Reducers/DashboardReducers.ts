import {
  DashBoardDispatchType,
  DashBoardType,
  EDashBoards,
} from "../ActionTypes/DashBoardType";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current: DashBoardType;
}

const initialState: defaultState = {
  loading: false,
  current: {
    devices: {
      summary: 0,
      active: 0,
      notActive: 0,
    },
    services: {
      summary: 0,
      active: 0,
      notActive: 0,
    },
    providers: {
      summary: 0,
      waiting: 0,
      used: 0,
      reject: 0,
    },
  },
};

const DashboardReducer = (
  state: defaultState = initialState,
  action: DashBoardDispatchType
) => {
  switch (action.type) {
    case EDashBoards.GET_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case EDashBoards.GET_SUCCESS:
      return {
        loading: false,
        current: action.payload,
      };

    case EDashBoards.GET_ERROR:
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

export default DashboardReducer;
