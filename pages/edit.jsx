import axios from 'axios';
import { useRouter } from 'next/router';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import Layout from '../layout';
import EditProfile from '../components/EditProfile';

export default function EditYourProfile({ profile }) {
  const router = useRouter();

  const onSubmitForm = async (values) => {
    const config = {
      url: '/api/editProfile',
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
  };
  return (
    <Layout>
      <EditProfile onSubmit={onSubmitForm} profile={profile} />
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
        permenent: false,
      },
    };
  }
  const profile = await prisma.profile.findUnique({
    where: { email: session?.user?.email },
  });

  return {
    props: {
      session,
      profile,
    },
  };
};
