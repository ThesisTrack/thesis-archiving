'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export const NavigationBar = () => {
  const { data: session, status } = useSession(); // Fetch session and status
  const role = session?.user?.role || 'No Role';

  if (status === 'loading') {
    return <p className="text-gray-500">Loading...</p>; // Loading state
  }

  return (
    <div className="bg-white flex flex-col items-center w-full">
      <header className="bg-[#003976] w-full relative">
        <div className="bg-[#fcd116] h-3 w-full absolute bottom-0" />
        <div className="flex justify-between px-8">
          <div className="flex items-center px-8 py-4">
            <Image
              src="/neulogo.png"
              alt="Neu logo"
              width={100}
              height={100}
              className="object-contain mr-10"
              priority
            />
            <div>
              <h1 className="text-white text-4xl font-bold">
                NEW ERA UNIVERSITY{' '}
                <span className="font-normal">| THESIS ARCHIVE</span>
              </h1>
              <nav
                className="flex justify-start space-x-8 text-[#93a4ff] text-lg py-2"
                aria-label="Main Navigation"
              >
                <a href="#about" className="hover:underline" aria-label="About Section">
                  About
                </a>
                <a href="#browse" className="hover:underline" aria-label="Browse Section">
                  Browse
                </a>
                <a href="#faculty" className="hover:underline" aria-label="Faculty Section">
                  Faculty & Staff
                </a>
                <a href="#forms" className="hover:underline" aria-label="Forms Section">
                  Student Forms
                </a>
              </nav>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-white" aria-label="User Role">{role}</p>
            {session ? (
              <button
                className="px-4 py-2 bg-yellow-500 text-blue-900 rounded hover:bg-yellow-400"
                onClick={() => signOut({ callbackUrl: '/' })}
                aria-label="Sign Out Button"
              >
                Sign Out
              </button>
            ) : (
              <a href="/login" aria-label="Sign In Link">
                <button className="px-4 py-2 bg-yellow-500 text-blue-900 rounded hover:bg-yellow-400">
                  Sign In
                </button>
              </a>
            )}
            {session?.user && (
              <div className="bg-white text-green-900 rounded-full p-2">
                <Image
                  src={session.user.image}
                  alt={`${session.user.name}'s Profile Picture`}
                  className="rounded-full"
                  width={32}
                  height={32}
                />
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};