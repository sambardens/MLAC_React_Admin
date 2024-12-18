import { authAxiosService } from '../api_service/auth_axios_service';
import { majorLablApi } from '../api_service/majorLabl_api';
import { loadingError } from '../errors/errors.actions';
import { withdrawalsSlice } from './withdrawals.slice';

const withdrawalsAPI = majorLablApi.injectEndpoints({
  endpoints: builder => ({
    getWithdrawals: builder.query({
      async queryFn(_, { dispatch }) {
        try {
          const res = await authAxiosService.get('/api/withdrawals/admin');
          dispatch(
            withdrawalsSlice.actions.setWithdrawals(res?.data?.withdraws),
          );
          return { data: res?.data };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
      providesTags: ['withdrawals'],
    }),

    updateWithdrawalsApprove: builder.mutation({
      async queryFn(options, { dispatch }) {
        try {
          const res = await authAxiosService.put(
            `/api/withdrawals/admin/${options?.withdrawalId}`,
            { isApproved: options?.isApproved },
          );

          return { data: null };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
      invalidatesTags: ['withdrawals'],
    }),
  }),

  overrideExisting: true,
});

export const { useGetWithdrawalsQuery, useUpdateWithdrawalsApproveMutation } =
  withdrawalsAPI;
