"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { backgroundImage } from "@/components/homebackgroundimg";


export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center">

     <div className="absolute inset-0"
        style={{...backgroundImage}}
      />
    
      <div className="relative z-10 flex justify-center items-center">
        <div className="w-full max-w-lg p-20 bg-green-300 rounded-lg shadow-lg flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">NEU-Library</h1>
          <Button
            className="flex items-center bg-blue-300 border border-black-300 shadow-2xl px-10 py-2 rounded-full hover:bg-black-500"
            onClick={() => signIn("google")}
          >
            <FcGoogle className="mr-2" size={24} />
            Sign In with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
