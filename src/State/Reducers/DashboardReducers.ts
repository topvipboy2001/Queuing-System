import {
  ChartDataType,
  DashBoardDispatchType,
  DashBoardType,
  EDashBoards,
} from "../ActionTypes/DashBoardType";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current: DashBoardType;
  providerChart: ChartDataType;
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
  providerChart: {
    static: {
      summary: 0,
      waiting: 0,
      used: 0,
      reject: 0,
    },
    providerChart: [],
    annotationsPoint: { x: 0, y: 0 },
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
        providerChart: state.providerChart,
      };

    case EDashBoards.GET_SUCCESS:
      return {
        loading: false,
        current: action.payload,
        providerChart: state.providerChart,
      };

    case EDashBoards.GET_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
        providerChart: state.providerChart,
      };

    case EDashBoards.GET_CHART_BY_DATE_LOADING:
      return {
        loading: true,
        current: state.current,
        providerChart: state.providerChart,
      };

    case EDashBoards.GET_CHART_BY_DATE_SUCCESS:
      return {
        loading: false,
        current: state.current,
        providerChart: action.payload,
      };

    case EDashBoards.GET_CHART_BY_DATE_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
        providerChart: state.providerChart,
      };

    default:
      return {
        loading: false,
        current: state.current,
        providerChart: state.providerChart,
      };
  }
};

export default DashboardReducer;
