/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Footer } from "@/components/Common/Footer";
import { NavigationBar } from "@/components/Common/NavigationBar";
import { useRouter } from "next/navigation";
import { FileTable } from "@/components/Common/reviewpdf";

export default function Home() {
    const router = useRouter();

  return (
    <div className="bg-white flex flex-col items-center w-full">
      <NavigationBar/>

      <main className="w-full max-w-[1440px] px-8 py-6">
        <section className="mb-8">
          <h2 className="text-[#003976] text-5xl font-bold">Librarian Dashboard</h2>
          <FileTable/>
        </section>  
      </main>

      <Footer/>
    </div>
  );
};