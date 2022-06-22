//import prisma from '../lib/prisma';
import { PrismaClient } from '@prisma/client';

import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import ProfileList from '../components/ProfileList';

import Layout from '../layout';

const Home = ({ profiles }) => {
  console.log('Home ~ profiles', profiles);

  return (
    <Layout>
      {profiles &&
        profiles.map((profile, idx) => (
          <ProfileList profile={profile} key={idx} />
        ))}
    </Layout>
  );
};

export default Home;

export const getStaticProps = async (context) => {
  const prisma = new PrismaClient();
  //const session = await getSession(context);
  const profiles = await prisma.profile.findMany({
    select: { email: true, name: true, avatar: true, bio: true, twitter: true },
  });

  // const profile = await prisma.profile.findUnique({
  //   where: { email: session?.user?.email },
  // });

  // if (!profile) {
  //   return {
  //     redirect: {
  //       destination: '/create',
  //     },
  //   };
  // }
  return {
    props: {
      profiles,
    },
  };
};
