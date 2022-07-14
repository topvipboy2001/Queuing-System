export enum ESourceProvider {
  GET_LOADING = "SOURCE_PROVIDER_GET_LOADING",
  GET_SUCCESS = "SOURCE_PROVIDER_GET_SUCCESS",
  GET_ERROR = "SOURCE_PROVIDER_GET_ERROR",
}

export type SourceProviderType = {
  id: string;
  name: string;
};

export interface ISourceProviderGetLoading {
  type: typeof ESourceProvider.GET_LOADING;
}

export interface ISourceProviderGetSuccess {
  type: typeof ESourceProvider.GET_SUCCESS;
  payload: SourceProviderType[];
}

export interface ISourceProviderGetError {
  type: typeof ESourceProvider.GET_ERROR;
  error: Error;
}

export type SourceProviderDispatchType =
  | ISourceProviderGetLoading
  | ISourceProviderGetSuccess
  | ISourceProviderGetError;
