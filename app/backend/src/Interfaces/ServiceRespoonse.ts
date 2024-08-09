export type ServiceMessage = { message: string };

type ServiceResponseErrorType =
'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'UNPROCESSABLE';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL' | 'CREATED',
  data?: T | ServiceMessage
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
