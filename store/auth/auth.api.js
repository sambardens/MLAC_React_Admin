import { axiosService } from '../api_service/axios_service';
import { majorLablApi } from '../api_service/majorLabl_api';
import { loadingError } from '../errors/errors.actions';
import { authActions } from './auth.slice';

const authAPI = majorLablApi.injectEndpoints({
  endpoints: builder => ({
    authLogin: builder.mutation({
      async queryFn(options, { dispatch }) {
        try {
          const { data } = await axiosService.post(
            '/api/auth/admin/signin/',
            options,
          );
          dispatch(authActions.authLogin(data));
          return { data };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
    }),
    refreshToken: builder.query({
      async queryFn(_, { dispatch }) {
        try {
          const { data } = await axiosService.get('auth/refresh');
          dispatch(authActions.setToken(data));
          return { data };
        } catch (e) {
          if (e.message === 'Request failed with status code 404') {
            dispatch(authActions.logout());
          } else dispatch(loadingError(e));
          return { error: e.message };
        }
      },
    }),
  }),
  overrideExisting: true,
});

export default authAPI;

export const { useAuthLoginMutation } = authAPI;
