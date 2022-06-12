//import prisma from '../lib/prisma';
import { PrismaClient } from '@prisma/client';

import { useSession, signIn, signOut, getSession } from 'next-auth/react';

import Layout from '../layout';

const Home = ({  profiles }) => {
  console.log('Home ~ profiles', profiles);
  const { data: session, status } = useSession();

  return (
    <Layout>
      { profiles?.map((profile) => <div> {profile.name} </div>)}
    </Layout>
  );
};

export default Home;

export const getServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const session = await getSession(context);
  const profiles = await prisma.profile.findMany({
    select: { email: true, name: true, avatar: true },
  });
  if (!session) {
    return {
      props: {
        session: null,
        profiles,
      },
    };
  }
  const profile = await prisma.profile.findUnique({
    where: { email: session?.user?.email },
  });

  if (!profile) {
    return {
      redirect: {
        destination: '/create',
      },
    };
  }
  return {
    props: {
      session,
      profiles,
    },
  };
};
