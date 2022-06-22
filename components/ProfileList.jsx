import Image from 'next/image';
import React from 'react';

export default function ProfileList({ profile }) {
  const imgsrc = profile?.avatar;
  const imagewidth = imgsrc?.split('=s')[0];
  //=s400-c
  return (
    <div className=" relative max-w-3xl mx-auto mt-12 px-4">
      <div className="grid md:grid-cols-3 grid-cols-1 md:gap-4">
        <div className="relative  w rounded-md">
          <Image
            src={`${imagewidth}=s400-c`}
            alt={profile?.name}
            width={200}
            height={200}
            //layout="fill"
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
    </div>
  );
}
