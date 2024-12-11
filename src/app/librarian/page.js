/* eslint-disable @next/next/no-img-element */
"use client";

import { FileCount } from "@/components/Common/pdfcount";
import React from "react";
import { Footer } from "@/components/Common/Footer";
import { NavigationBar } from "@/components/Common/NavigationBar";
import { useRouter } from "next/navigation";
import { FilePreview } from "@/components/Common/pdfpreview";

export default function Home() {
    const router = useRouter();

  return (
    <div className="bg-white flex flex-col items-center w-full">
      <NavigationBar/>

      <main className="w-full max-w-[1440px] px-8 py-6">
        <section className="mb-8">
          <h2 className="text-[#003976] text-5xl font-bold">Librarian Dashboard</h2>
          <div className="flex items-center space-x-4 mt-4 text-[#b6bac1] text-lg">
            <FileCount/>
            <span className="text-[#93a4ff]">|</span>
            <span>New Submissions</span>
            <span className="text-[#93a4ff]">|</span>
            <span>Pending Reviews</span>
            <span className="text-[#93a4ff]">|</span>
            <span>Approved Theses</span>
          </div>
        </section>

        <section className="grid grid-cols-4 gap-4 mb-8">
          <button className="flex items-center justify-center bg-[#d9d9d9] rounded-lg p-4 " onClick={() => router.push('/uploadpdfpage')}>
            <img src="/upload.svg" alt="Upload" className="w-6 h-6 mr-2" />
            <span className="text-black text-xl">Add New Thesis</span>
          </button>
          <button className="flex items-center justify-center bg-[#d9d9d9] rounded-lg p-4" onClick={() => router.push('/librarian/review')}>
            <img src="/heartedit.svg" alt="Heart edit" className="w-6 h-6 mr-2" />
            <span className="text-black text-xl">Review Submissions</span>
          </button>
        </section>
        <FilePreview/>
      </main>
      <Footer/>
    </div>
  );
};
