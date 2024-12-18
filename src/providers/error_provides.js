import { useEffect } from 'react';

import { Error } from '../../store/errors/errors.selectors';
import { Toast } from '@/components/UI/tost/Toast';
import { useActions } from '@/hooks/useActions';

const ErrorsProvider = ({ children }) => {
  const errors = Error();
  const { clearError } = useActions();

  useEffect(() => {
    let status;
    if (errors) {
      let { message } = errors;

      if (!errors?.status) {
        status = 'error';
      }

      Toast({
        status,
        message,
      });

      clearError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  return <>{children}</>;
};

export default ErrorsProvider;
