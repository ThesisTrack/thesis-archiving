"use client";

import { redirect } from "next/navigation";
import { NavigationBar } from "@/components/Common/NavigationBar";
import { Footer } from "@/components/Common/Footer";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import UploadPage from "./uploadpdfpage/page";
import BrowseTheses from "./browsetheses/page"; 

export default function App() {
  const { data: session } = useSession();
  const [showUploadPage, setShowUploadPage] = useState(false);
  const [showBrowsePage, setShowBrowsePage] = useState(false); 

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavigationBar />
      <div className="container mx-auto flex flex-1 mt-6 px-4">
        <aside className="w-1/4 bg-gray-200 rounded-lg p-4">
          <button
            className="hover:underline text-white-500 mb-4 w-full text-center p-2 bg-blue-500 rounded"
            onClick={() => setShowUploadPage(!showUploadPage)}
          >
            {showUploadPage ? "Thesis Archive" : "Upload PDF"}
          </button>
          <button
            className="hover:underline text-white-500 w-full text-center p-2 bg-green-500 rounded"
            onClick={() => setShowBrowsePage(!showBrowsePage)}
          >
            {showBrowsePage ? "Thesis Archive" : "Browse Theses"}
          </button>
        </aside>
        <main className="w-3/4 bg-white rounded-lg p-6 ml-6 shadow flex flex-col">
          {showUploadPage ? (
            <UploadPage />
          ) : showBrowsePage ? (
            <BrowseTheses /> 
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-4">Thesis Archive</h1>
              <nav className="text-sm text-gray-600 mb-6">
                <a href="#" className="hover:underline">
                  Browse
                </a>{" "}
                /{" "}
                <a href="#" className="hover:underline">
                  College of Informatics and Computing Studies
                </a>{" "}
                / Thesis Archive
              </nav>
              <Image
                src="/campus.png"
                alt="New Era University Campus"
                width={1200}
                height={600}
                priority
                className="rounded-lg mb-6"
              />
              <p className="text-gray-700">
                The Thesis Archive provides information about Senior Honors
                Theses/Projects that have been completed by Honors students over
                the years.
              </p>
              <p className="text-gray-700 mt-4">
                The online thesis archive is meant to serve as a record of the
                undergraduate honors theses completed by New Era University
                students. Anyone interested in reading one of the theses listed
                in the archive may do so by exploring the website.
              </p>
            </>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
