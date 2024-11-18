'use client';

import { backgroundImage } from "@/components/homebackgroundimg";
import { LogInForm } from "@/components/login/logInForm";


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