import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from 'next-auth/react';
import Image from 'next/image';
import Layout from '../layout';
export default function LoginPage({ providers }) {
  console.log('LoginPage ~ providers', providers);
  return (
    <Layout>
      {' '}
      <div className="flex items-center justify-center mt-12 p-4 bg-gray-50 max-w-max mx-auto">

      {Object.values(providers).map((provider) => (
        <div
          key={provider.name}
          className="max-w-xs mx-auto bg-gray-100 rounded px-10 py-2 hover:bg-gray-200 duration-100"
        >
          <button
            onClick={() => signIn(provider.id)}
            className="text-gray-700 font-bold w-full px-4 py-2 flex items-center justify-center rounded space-x-4"
          >
            <span> Sign in with {provider.name}</span>
            {provider.name === 'Google' && (
              <Image src="/google.png" width={30} height={30} className="" />
            )}
          </button>
        </div>
      ))}
      </div>
    </Layout>
  );
}

LoginPage.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession(context);
  const providers = await getProviders();

  if (session) {
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
    return {
      redirect: {
        destination: '/profile',
      },
    };
  }
  return {
    session: undefined,
    providers: await getProviders(context),
    csrfToken: await getCsrfToken(context),
  };
};
