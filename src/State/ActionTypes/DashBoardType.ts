export enum EDashBoards {
  GET_LOADING = "DASHBOARD_GET_LOADING",
  GET_SUCCESS = "DASHBOARD_GET_SUCCESS",
  GET_ERROR = "DASHBOARD_GET_ERROR",
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
  | IDashboardGetSuccess;
