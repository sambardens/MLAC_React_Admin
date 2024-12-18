import { authAxiosService } from '../api_service/auth_axios_service';
import { majorLablApi } from '../api_service/majorLabl_api';
import { loadingError } from '../errors/errors.actions';
import { transactionsSlice } from './transactions.slice';

const transactionsAPI = majorLablApi.injectEndpoints({
  endpoints: builder => ({
    getTransactions: builder.query({
      async queryFn(paramsQuery, { dispatch }) {
        try {
          const res = await authAxiosService.get(
            `/api/incomes/admin/transactions/${paramsQuery ? paramsQuery : ''}`,
          );
          const filteredReleases = res?.data?.income?.filteredReleases?.map(
            el => {
              const gross = Math.round(parseFloat(el.gross) * 100) / 100;
              const fees = Math.round(parseFloat(el.fees) * 100) / 100;
              const net = Math.round(parseFloat(el.net) * 100) / 100;
              return { ...el, gross, fees, net };
            },
          );
          dispatch(
            transactionsSlice.actions.setTransactions({
              ...res?.data?.income,
              filteredReleases,
            }),
          );
          return { data: res?.data };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
    }),

    getUniqueFieldsForTransactions: builder.query({
      async queryFn(_, { dispatch }) {
        try {
          const res = await authAxiosService.get(
            '/api/incomes/filter/uniqueFields',
          );
          dispatch(
            transactionsSlice.actions.setUniqueFields(res?.data?.income),
          );
          return { data: res?.data };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
    }),

    getTransactionDetails: builder.query({
      async queryFn(transactionId, { dispatch }) {
        try {
          const res = await authAxiosService.get(
            `/api/incomes/admin/transactions/${transactionId}`,
          );
          dispatch(
            transactionsSlice.actions.setTransactionDetail(res?.data?.income),
          );
          return { data: res?.data };
        } catch (e) {
          dispatch(loadingError(e.response.data));
          return { error: e.message };
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetTransactionsQuery,
  useLazyGetTransactionsQuery,
  useGetUniqueFieldsForTransactionsQuery,
  useLazyGetTransactionDetailsQuery,
} = transactionsAPI;
