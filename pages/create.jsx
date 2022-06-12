import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import CreateProfile from '../components/CreateProfile';
import { useRouter } from 'next/router';
import Layout from '../layout';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

export default function create() {
  const router = useRouter();
  const onSubmitForm = async (values) => {
    console.log(values);
    const config = {
      url: '/api/createProfile',
      method: 'POST',
      data: values,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios(config);
    if (response.status === 200) {
      router.push('/profile');
    }
    console.log('onSubmitForm ~ response', response);
  };
  return (
    <Layout>
      <CreateProfile onSubmit={onSubmitForm} />
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const session = await getSession(context);
  const profile = await prisma.profile.findUnique({
    where: { email: session?.user?.email },
  });
  if (profile && session) {
    return {
      redirect: {
        destination: '/profile',
      },
    };
  }
  if (!session) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
