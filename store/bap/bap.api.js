import { authAxiosService } from '../api_service/auth_axios_service';
import { majorLablApi } from '../api_service/majorLabl_api';
import { loadingError } from '../errors/errors.actions';
import { bapsSlice } from './bap.slice';

const bapAPI = majorLablApi.injectEndpoints({
  endpoints: builder => ({
    getBaps: builder.query({
      async queryFn(_, { dispatch }) {
        try {
          const res = await authAxiosService.get('/api/baps/all');
          dispatch(bapsSlice.actions.setBaps(res?.data));
          return { data: res?.data };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
      providesTags: ['baps'],
    }),

    getBapDetail: builder.query({
      async queryFn(bapId, { dispatch }) {
        try {
          const res = await authAxiosService.get(`/api/baps/detail/${bapId}`);
          return { data: res?.data };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
    }),

    getGenresOfBap: builder.query({
      async queryFn(bapId, { dispatch }) {
        try {
          const res = await authAxiosService.get(`/api/genres/${bapId}`);
          return { data: res?.data };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
    }),

    getReleasesOfBap: builder.query({
      async queryFn(bapId, { dispatch }) {
        try {
          const res = await authAxiosService.get(`/api/baps/releases/${bapId}`);
          dispatch(bapsSlice.actions.setReleasesOfBap(res?.data?.baps));
          return { data: res?.data };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
    }),

    getMembersOfBap: builder.query({
      async queryFn(bapId, { dispatch }) {
        try {
          const res = await authAxiosService.get(
            `/api/baps/allMembers/${bapId}`,
          );
          dispatch(bapsSlice.actions.setUsersOfBap(res?.data?.members));
          return { data: res?.data };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
    }),

    updateBapStatus: builder.mutation({
      async queryFn(options, { dispatch }) {
        try {
          await authAxiosService.put(`/api/baps/update/${options.bapId}`, {
            bapStatus: options.bapStatus,
          });
          return { data: null };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
      invalidatesTags: ['baps'],
    }),

    deleteBap: builder.mutation({
      async queryFn(bapId, { dispatch }) {
        try {
          await authAxiosService.delete(`/api/baps/admin/${bapId}`);
          return { data: null };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
      invalidatesTags: ['baps'],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetBapsQuery,
  useGetReleasesOfBapQuery,
  useGetMembersOfBapQuery,
  useUpdateBapStatusMutation,
  useDeleteBapMutation,
  useLazyGetBapDetailQuery,
  useGetGenresOfBapQuery,
} = bapAPI;
