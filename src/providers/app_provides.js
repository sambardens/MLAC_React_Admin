import { useRouter } from 'next/router';

import { ChakraProvider } from '@chakra-ui/react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from '../../store';
import AuthProvider from './auth_provides';
import ErrorsProvider from '@/providers/error_provides';
import theme from '@/styles/theme';

export default function AppProvides({ children }) {
  const router = useRouter();

  NProgress.configure({
    trickleSpeed: 600,
    showSpinner: false,
    easing: 'ease',
    speed: 600,
  });

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    router.events.on('routeChangeStart', handleRouteStart);
    router.events.on('routeChangeComplete', handleRouteDone);
    router.events.on('routeChangeError', handleRouteDone);

    return () => {
      router.events.off('routeChangeStart', handleRouteStart);
      router.events.off('routeChangeComplete', handleRouteDone);
      router.events.off('routeChangeError', handleRouteDone);
    };
  }, [router]);

  return (
    <>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <AuthProvider>
            <ErrorsProvider>
              <ChakraProvider theme={theme}>{children}</ChakraProvider>
            </ErrorsProvider>
          </AuthProvider>
        </Provider>
      </PersistGate>
    </>
  );
}
