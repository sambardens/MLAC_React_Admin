import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { audioSlice } from '../../store/audio/audio-slice';
import { authSlice } from '../../store/auth/auth.slice';
import { bapsSlice } from '../../store/bap/bap.slice';
import { currentSlice } from '../../store/current/current-slice';
import { downloadsSlice } from '../../store/downloads/downloads-slice';
import { errorSlice } from '../../store/errors/errors.slice';
import { filtersSlice } from '../../store/filters/filters.slice';
import { releasesSlice } from '../../store/releases/releases.slice';
import { transactionsSlice } from '../../store/transactions/transactions.slice';
import { usersSlice } from '../../store/users/users.slice';
import { withdrawalsSlice } from '../../store/withdrawals/withdrawals.slice';

const rootAction = {
  ...audioSlice.actions,
  ...currentSlice.actions,
  ...downloadsSlice.actions,
  ...authSlice.actions,
  ...errorSlice.actions,
  ...bapsSlice.actions,
  ...withdrawalsSlice.actions,
  ...filtersSlice.actions,
  ...releasesSlice.actions,
  ...usersSlice.actions,
  ...transactionsSlice.actions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch]);
};
