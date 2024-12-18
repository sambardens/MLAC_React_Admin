import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const majorLablApi = createApi({
  reducerPath: 'majorLablApi',
  baseQuery: fetchBaseQuery(),
  //   {
  //   baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
  //   prepareHeaders: (headers, { getState }) => {
  //     const token = getState().auth.token;

  //     if (token) {
  //       headers.set('Authorization', `Bearer ${token}`);
  //     }
  //     return headers;
  //   },
  //   credentials: 'include',
  // }
  tagTypes: [
    'baps',
    'users',
    'itemUser',
    'releases',
    'withdrawals',
    'itemRelease',
  ],
  endpoints: builder => ({}),
});
