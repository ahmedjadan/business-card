import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import React from 'react';
import ProfileCard from '../components/Profile';
import Layout from '../layout';

export default function Profile({ profile }) {

  return (
    <Layout>
      <ProfileCard profile={profile} />
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }
  const profile = await prisma.profile.findUnique({
    where: { email: session?.user?.email },
  });
  if (!profile && session) {
    return {
      redirect: {
        destination: '/create',
      },
    };
  }
  return {
    props: {
      session,
      profile,
    },
  };
};
