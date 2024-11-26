"use client";

// import { getServerAuthSession } from "@/server/auth";
// import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NavigationBar } from "@/components/Common/NavigationBar";
import { Footer } from "@/components/Common/Footer";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  
  const {data: session} = useSession();

// If the user is not login 
  if (!session) {
    redirect('/login');
}

  return (
    <div className="min-h-screen bg-gray-100">
      
     <NavigationBar/>

      <div className="container mx-auto flex mt-6 px-4">

        <aside className="w-1/4 bg-gray-200 rounded-lg p-4">
          
        </aside>

        <main className="w-3/4 bg-white rounded-lg p-6 ml-6 shadow">
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
            width={10000}
            height={100}
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
            students. Anyone interested in reading one of the theses listed in
            the archive may do so by exploring the website.
          </p>
        </main>
      </div>

     <Footer/>
    </div>
  )
 
};