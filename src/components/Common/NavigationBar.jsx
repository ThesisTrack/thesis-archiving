'use client';
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";


export const NavigationBar = () => {

  const session = useSession();


    return (
        <header className="bg-blue-900 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-4">
            <Image
              src="/neulogo.png"
              alt="New Era University"
              width={50} 
              height={100}
              className="h-10"
            />
            <h1 className="text-xl font-bold uppercase">
              New Era University | Thesis Archive
            </h1>
          </div>
          <div className="flex items-center space-x-4">
          {session ? (
          <button 
          className="px-4 py-2 bg-yellow-500 text-blue-900 rounded hover:bg-yellow-400"
          onClick={() => signOut("google",{callbackUrl: '/'})}
          >
            Sign Out
          </button>
            ) :(
             <a href="/login">
                <button className="px-4 py-2 bg-yellow-500 text-blue-900 rounded hover:bg-yellow-400"
                >
                    Sign In
                </button>
            </a>
            )}
            <div className="bg-white text-blue-900 rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m7.5 0v10.5a2.25 2.25 0 01-2.25 2.25h-3a2.25 2.25 0 01-2.25-2.25V9m7.5 0H6.75m9 0H6.75m9 0h-9"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>
    );
};