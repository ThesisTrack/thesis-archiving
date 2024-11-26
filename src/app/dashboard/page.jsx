/* eslint-disable @next/next/no-img-element */
import { getServerAuthSession } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import react from "react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const session = getServerAuthSession();

  console.log(session)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-900 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-4">
            <img
              src="neulogo.png" 
              alt="New Era University"
              className="h-10"
            />
            <h1 className="text-xl font-bold uppercase">
              New Era University | Thesis Archive
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-yellow-500 text-blue-900 rounded hover:bg-yellow-400">
              Apply
            </button>
            <div className="bg-white text-blue-900 rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m7.5 0v10.5a2.25 2.25 0 01-2.25 2.25h-3a2.25 2.25 0 01-2.25-2.25V9m7.5 0H6.75m9 0H6.75m9 0h-9"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>

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
          <img
            src="/campus.png"
            alt="New Era University Campus"
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
            the archive may do so by visiting the home page.
          </p>
        </main>
      </div>

      <footer className="bg-blue-900 text-white mt-6 py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 New Era University. All rights reserved</p>
          <p>9 Central Ave, New Era, Quezon City, 1107 Metro Manila</p>
          <p>Email: info@neu.ph | Phone: (02) 8981 4221</p>
        </div>
      </footer>
    </div>
  );
 
};

export default Dashboard;