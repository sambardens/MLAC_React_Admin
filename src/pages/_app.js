import AppProvides from '@/providers/app_provides';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <AppProvides>
        <main>
          <Component {...pageProps} />
        </main>
      </AppProvides>
    </>
  );
}
