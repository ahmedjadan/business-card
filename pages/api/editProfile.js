import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { getSession } from 'next-auth/react';

export default async function (req, res) {
  try {
    const { name, bio, twitter, facebook, instagram, phone, slug } = req.body;
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json('You need to log in');
    }
    const profile = await prisma.profile.update({
      where: { email: session.user.email },
      data: {
        name,
        bio,
        slug,
        twitter,
        facebook,
        instagram,
        phone,
        email: session.user.email,
      },
    });
    res.status(200).json(profile);
  } catch (error) {
    console.log('error', error);
  }
}
