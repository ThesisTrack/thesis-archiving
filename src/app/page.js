import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { backgroundImage } from "@/components/homebackgroundimg";
import { getServerSession } from "next-auth";
import { LogInForm } from "@/components/login/logInForm";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center">
      <div className="absolute inset-0" style={{ ...backgroundImage }} />

      <div className="relative z-10 flex justify-center items-center">
        <LogInForm />
      </div>
    </div>
  );
}
