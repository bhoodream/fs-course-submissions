export const getApiErrorMsg = (response) =>
  response.error.response.data.error || response.error.message;
