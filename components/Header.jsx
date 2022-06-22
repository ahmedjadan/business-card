import React from 'react';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
  const { data: session } = useSession();
  console.log('Header ~ session', session);
  return (
    <div className="f isolate w-full max-w-4xl mx-auto p-4  flex items-center justify-between">
      <Link href="/">
        <a>
          <h1 className="text-3xl font-bold text-gray-700">AJ.</h1>
        </a>
      </Link>
      <Link href="/login">
        <a>{!session ? 'Sign In' : ''}</a>
      </Link>
      {/* <div className="bg-red-500 px-4 py-2 rounded">
        <button onClick={() => signIn()}>{!session ? 'Sign In' : ''}</button>
      </div> */}

      {session && (
        <div className="flex items-center space-x-4 text-gray-700">
          <Link href="/profile">
            <a>Profile</a>
          </Link>
          <div className="flex items-center">
            {/* <h2 className="px-2"> {session?.user?.name} </h2> */}
            <Image
              src={session?.user?.image}
              alt=""
              width={30}
              height={30}
              className="rounded-md"
            />
          </div>
          <button onClick={() => signOut()}>
            {' '}
            {session ? ' Sign Out' : ''}{' '}
          </button>
        </div>
      )}
    </div>
  );
}
