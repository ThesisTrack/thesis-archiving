/* eslint-disable @next/next/no-img-element */
'use client';
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";


export const NavigationBar = () => {

  const session = useSession();


  return ( 
    <div className="bg-white flex flex-col items-center w-full">
  <header className="bg-[#003976] w-full relative">
    <div className="bg-[#fcd116] h-3 w-full absolute bottom-0" />
    <div className="flex justify-between px-8">
     <div className=" flex items-center px-8 py-4">
      <img
        src="/neulogo.png"
        alt="Neu logo"
        className="w-[100px] h-[100px] object-contain mr-10"
      />
      <div className="">
      <h1 className="text-white text-4xl font-bold">
        NEW ERA UNIVERSITY{" "}
        <span className="font-normal">| THESIS ARCHIVE</span>
      </h1>
      <nav className=" flex justify-start space-x-8 text-[#93a4ff] text-lg py-2">
      <a href="#about" className="hover:underline">
        About
      </a>
      <a href="#browse" className="hover:underline">
        Browse
      </a>
      <a href="#faculty" className="hover:underline">
        Faculty & Staff
      </a>
      <a href="#forms" className="hover:underline">
        Student Forms
      </a>
    </nav>  
      </div>
    </div>
    <div className="flex justify-between items-center px-8 py-4">
    <button 
      className="mr-10 right-1 px-4 py-2 bg-yellow-500 text-blue-900 rounded hover:bg-yellow-400"
      onClick={() => signOut("google",{callbackUrl: '/'})}
      >
        Sign Out
      </button>
      <img
        src="/icon.png"
        alt="Profile user"
        className="w-[50px] h-[50px] rounded-full "/>  
    </div>
    </div>
  </header>
  </div>
);
};