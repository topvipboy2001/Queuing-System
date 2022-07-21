export enum EDashBoards {
  GET_LOADING = "DASHBOARD_GET_LOADING",
  GET_SUCCESS = "DASHBOARD_GET_SUCCESS",
  GET_ERROR = "DASHBOARD_GET_ERROR",

  GET_CHART_BY_DATE_LOADING = "DASHBOARD_GET_CHART_BY_DATE_LOADING",
  GET_CHART_BY_DATE_SUCCESS = "DASHBOARD_GET_CHART_BY_DATE_SUCCESS",
  GET_CHART_BY_DATE_ERROR = "DASHBOARD_GET_CHART_BY_DATE_ERROR",
}

export type DashBoardType = {
  devices: {
    summary: number;
    active: number;
    notActive: number;
  };
  services: {
    summary: number;
    active: number;
    notActive: number;
  };

  providers: {
    summary: number;
    waiting: number;
    used: number;
    reject: number;
  };
};

export type ChartDataType = {
  static: {
    summary: number;
    waiting: number;
    used: number;
    reject: number;
  };
  providerChart: any[];
  annotationsPoint: {
    x: number | string;
    y: number;
    value?: number;
  };
};

export interface IDashboardGetChartByDateLoading {
  type: typeof EDashBoards.GET_CHART_BY_DATE_LOADING;
}

export interface IDashboardGetChartByDateError {
  type: typeof EDashBoards.GET_CHART_BY_DATE_ERROR;
  error: Error;
}

export interface IDashboardGetChartByDateSuccess {
  type: typeof EDashBoards.GET_CHART_BY_DATE_SUCCESS;
  payload: ChartDataType;
}

export interface IDashboardGetLoading {
  type: typeof EDashBoards.GET_LOADING;
}

export interface IDashboardGetError {
  type: typeof EDashBoards.GET_ERROR;
  error: Error;
}

export interface IDashboardGetSuccess {
  type: typeof EDashBoards.GET_SUCCESS;
  payload: DashBoardType;
}

export type DashBoardDispatchType =
  | IDashboardGetLoading
  | IDashboardGetError
  | IDashboardGetSuccess
  | IDashboardGetChartByDateLoading
  | IDashboardGetChartByDateError
  | IDashboardGetChartByDateSuccess;
