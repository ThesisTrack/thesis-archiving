"use client";

import { backgroundImage } from "@/components/login/loginbackgroundimg";
import { LogInForm } from "@/components/login/logInForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center">
      <div
        className="absolute inset-0"
        style={{
          ...backgroundImage,
        }}
      />
      <div className="relative z-10 flex justify-center items-center">
        <LogInForm />
      </div>
    </div>
  );
}
