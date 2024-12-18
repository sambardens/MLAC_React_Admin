import { usePathname, useRouter } from 'next/navigation';

import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import FullPageLoader from '@/components/loaders/FullPageLoader';

const allowedRoutes = ['/'];
// const protectedRoutes = ['/bap', '/releases', '/transactions', '/users'];

function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const [isReady, setIsReady] = useState(false);
  // Check authorization
  useEffect(() => {
    if (!isLoggedIn) {
      if (!allowedRoutes.includes(pathname)) {
        router.push('/');
        return;
      }
    } else if (allowedRoutes.includes(pathname)) {
      router.push('/bap');
      return;
    }
    setIsReady(true);
  }, [pathname, isLoggedIn, router]);

  if (!isReady) return <FullPageLoader />;
  if (isLoggedIn) {
    return !allowedRoutes.includes(pathname) && isReady && children;
  } else {
    return allowedRoutes.includes(pathname) && isReady && children;
  }
}

export default memo(AuthProvider);
