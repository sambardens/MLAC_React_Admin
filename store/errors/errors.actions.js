import { errorSlice } from './errors.slice';

const loadingError = error => async dispatch => {
  await dispatch(errorSlice.actions.loadError(error));
};

const clearErrors = () => dispatch => dispatch(errorSlice.actions.clearError());

export { loadingError, clearErrors };
