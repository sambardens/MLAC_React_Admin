import { authAxiosService } from '../api_service/auth_axios_service';
import { majorLablApi } from '../api_service/majorLabl_api';
import { loadingError } from '../errors/errors.actions';
import { releasesSlice } from './releases.slice';

const releasesAPI = majorLablApi.injectEndpoints({
  endpoints: builder => ({
    getReleases: builder.query({
      async queryFn(paramsQuery, { dispatch }) {
        try {
          const res = await authAxiosService.get(
            `/api/release/admin/all${paramsQuery ? paramsQuery : ''}`,
          );
          dispatch(releasesSlice.actions.setReleases(res?.data?.releases));
          return { data: res?.data };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
      providesTags: ['releases'],
    }),

    getUniqueFieldsForReleases: builder.query({
      async queryFn(_, { dispatch }) {
        try {
          const res = await authAxiosService.get(
            '/api/release/filter/uniqueFields',
          );
          dispatch(
            releasesSlice.actions.setUniqueReleasesFields(
              res?.data?.uniqueFields,
            ),
          );
          return { data: res?.data };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
    }),

    getItemRelease: builder.query({
      async queryFn(releaseId, { dispatch }) {
        try {
          const res = await authAxiosService.get(
            `/api/release/admin/${releaseId}`,
          );
          dispatch(releasesSlice.actions.setItemRelease(res?.data?.releases));
          return { data: res?.data };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
      providesTags: ['itemRelease'],
    }),

    deleteTrack: builder.mutation({
      async queryFn(trackId, { dispatch }) {
        try {
          await authAxiosService.delete(`/api/tracks/admin/${trackId}`);
          return { data: null };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
      invalidatesTags: ['itemRelease'],
    }),

    deleteRelease: builder.mutation({
      async queryFn(releaseId, { dispatch }) {
        try {
          await authAxiosService.delete(`/api/release/admin/${releaseId}`);
          return { data: null };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
      invalidatesTags: ['releases'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetReleasesQuery,
  useGetItemReleaseQuery,
  useLazyGetItemReleaseQuery,
  useDeleteTrackMutation,
  useDeleteReleaseMutation,
  useGetUniqueFieldsForReleasesQuery,
  useLazyGetReleasesQuery,
} = releasesAPI;
