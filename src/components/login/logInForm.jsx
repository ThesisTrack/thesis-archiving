"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";


export const LogInForm = () => {
  return (
    <div className="w-full max-w-lg p-20 bg-green-300 rounded-lg shadow-lg flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">NEU-Library</h1>
      <Button
        className="flex items-center bg-blue-300 border border-black-300 shadow-2xl px-10 py-2 rounded-full hover:bg-black-500"
        onClick={() => signIn("google", { callbackUrl: "/verifyrole" })}
      >
        <FcGoogle className="mr-2" size={24} />
        Sign In with Google
      </Button>
    </div>
  );
};