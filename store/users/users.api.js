import { authAxiosService } from '../api_service/auth_axios_service';
import { majorLablApi } from '../api_service/majorLabl_api';
import { loadingError } from '../errors/errors.actions';
import { usersSlice } from './users.slice';

const bapAPI = majorLablApi.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      async queryFn(paramsQuery, { dispatch }) {
        try {
          const res = await authAxiosService.get(
            `/api/users/all/${paramsQuery ? paramsQuery : ''}`,
          );
          dispatch(usersSlice.actions.setUsers(res?.data?.user));
          return { data: res?.data };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
      providesTags: ['users'],
    }),

    getUniqueFieldsForUser: builder.query({
      async queryFn(_, { dispatch }) {
        try {
          const res = await authAxiosService.get(
            '/api/users/filter/uniqueFields',
          );
          dispatch(usersSlice.actions.setUniqueFields(res?.data?.uniqueFields));
          return { data: res?.data };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
    }),

    getUsersBuId: builder.query({
      async queryFn(userId, { dispatch }) {
        try {
          const res = await authAxiosService.get(`/api/users/${userId}`);
          dispatch(usersSlice.actions.setItemUser(res?.data));
          return { data: res?.data };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
      providesTags: ['itemUser'],
    }),
    bannedUser: builder.mutation({
      async queryFn(userId, { dispatch }) {
        try {
          await authAxiosService.post(`/api/users/ban/${userId}`);
          return { data: null };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
      invalidatesTags: ['itemUser', 'users'],
    }),
    unBannedUser: builder.mutation({
      async queryFn(userId, { dispatch }) {
        try {
          await authAxiosService.post(`/api/users/unban/${userId}`);
          return { data: null };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
      invalidatesTags: ['itemUser', 'users'],
    }),

    deleteUser: builder.mutation({
      async queryFn(userId, { dispatch }) {
        try {
          await authAxiosService.delete(`/api/users/${userId}`);
          return { data: null };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
      invalidatesTags: ['itemUser', 'users'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useBannedUserMutation,
  useUnBannedUserMutation,
  useDeleteUserMutation,
  useGetUniqueFieldsForUserQuery,
  useGetUsersBuIdQuery,
} = bapAPI;
