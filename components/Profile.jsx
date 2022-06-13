import axios from 'axios';
import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';
import EditProfile from './EditProfile';

export default function Profile({ profile }) {
  const router = useRouter();

  const { data: session } = useSession();
  const [editProfile, setEdit] = useState(false);
  const imgsrc = profile?.avatar;
  const imagewidth = imgsrc?.split('=s')[0];
  //=s400-c

  const deleteProfile = async (values) => {
    const config = {
      url: '/api/deleteProfile',
      method: 'DELETE',
      data: profile,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios(config);
    if (response.status === 200) {
      router.push('/create');
    }
  };
  return (
    <div className=" relative max-w-4xl mx-auto mt-12 px-4">
      <div className="grid md:grid-cols-3 grid-cols-1 md:gap-4">
        <div className="relative aspect-square w">
          <Image
            src={`${imagewidth}=s400-c`}
            alt=""
            // width={290}
            // height={250}
            layout="fill"
            className="rounded-md"
            objectFit="cover"
          />
        </div>
        <div className="col-span-2">
          <h2 className="font-bold ">{profile?.name}</h2>
          <h2 className="italic text-gray-500">{profile.email}</h2>
          <h2>{profile?.twitter}</h2>
          <p className="p-2 bg-slate-100 rounded mt-2">{profile?.bio}</p>
        </div>
      </div>
      <div className="flex items-center justify-between max-w-sm space-x-4">
        <button
          className=" bg-indigo-700 text-white mt-8 rounded-md px-4 py-2 hover:bg-indigo-600"
          onClick={() => router.push('/edit')}
        >
          Edit Your Profile
        </button>
        <button
          className=" bg-red-100/80 text-red-700 mt-8 rounded-md px-4 py-2 hover:bg-red-100"
          onClick={deleteProfile}
        >
          Delete Your Profile
        </button>
      </div>
      {/* <div className=" ">
        {editProfile && <EditProfile profile={profile} />}
      </div> */}
    </div>
  );
}
