import '@styles/tailwind.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ProviderAuth } from '@hooks/use-auth';
import Header from '@containers/Header';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ProviderAuth>
      <Head>
        <title>Stream Play</title>
        <meta name="description" content="Disfruta de tus series y películas favoritas desde tus plataformas preferidas con Stream Play" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col pt-[63px]">
        {router.pathname == '/recoverpassword' || router.pathname == '/signup' || router.pathname == '/login' ? null : <Header backButton={router.pathname != '/' ? true : false} />}
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </ProviderAuth>
  );
}

export default MyApp;
