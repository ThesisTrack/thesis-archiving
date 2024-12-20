"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { NavigationBar } from "@/components/Common/NavigationBar";
import { Footer } from "@/components/Common/Footer";
import UploadPage from "./uploadpdfpage/page";
import BrowseTheses from "./browsetheses/page";
import Image from "next/image";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, {
  db: {
    schema: "next_auth",
  },
});

export default function App() {
  const { data: session } = useSession();
  const [showUploadPage, setShowUploadPage] = useState(false);
  const [showBrowsePage, setShowBrowsePage] = useState(false);
  const [showAdminPage, setShowAdminPage] = useState(false);
  const [role, setRole] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editedUsers, setEditedUsers] = useState({});

  if (!session) {
    redirect("/login");
  }

  useEffect(() => {
    const fetchRole = async () => {
      const match = session.user.email;
      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("email", match)
        .single();

      if (error) {
        console.error("Error fetching role", error);
      } else {
        setRole(data?.role);
      }
    };

    const fetchUsers = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(data);
      }
      setLoading(false);
    };

    if (session) {
      fetchRole();
      fetchUsers();
    }
  }, [session]);

  const handleRoleChange = async (userId, newRole) => {
    const { error } = await supabase
      .from("users")
      .update({ role: newRole })
      .eq("id", userId);

    if (error) {
      console.error("Error updating role:", error);
    } else {
      setEditedUsers((prevState) => ({
        ...prevState,
        [userId]: true,
      }));

      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      );
      setUsers(updatedUsers);

      setTimeout(() => {
        setEditedUsers((prevState) => ({
          ...prevState,
          [userId]: false,
        }));
      }, 2000);
    }
  };

  const isAdmin = role === "admin"; // Check if the user is an admin

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavigationBar />
      <div className="container mx-auto flex flex-1 mt-6 px-4">
        <aside className="w-1/4 bg-gray-200 rounded-lg p-4">
          <button
            className="shadow-md mt-6 p-2 text-blue w-full hover:bg-slate-300"
            onClick={() => {
              setShowUploadPage(!showUploadPage);
              setShowBrowsePage(false);
              setShowAdminPage(false);
            }}
          >
            {showUploadPage ? "Thesis Archive" : "Upload PDF"}
          </button>
          <button
            className="shadow-md mt-6 p-2 text-blue w-full hover:bg-slate-300"
            onClick={() => {
              setShowBrowsePage(!showBrowsePage);
              setShowUploadPage(false);
              setShowAdminPage(false);
            }}
          >
            {showBrowsePage ? "Hide Thesis Archive" : "Browse Theses"}
          </button>
          {isAdmin && ( // Show the Admin button only if the user is an admin
            <button
              className="shadow-md mt-6 p-2 text-blue w-full hover:bg-slate-300"
              onClick={() => {
                setShowAdminPage(!showAdminPage);
                setShowUploadPage(false);
                setShowBrowsePage(false);
              }}
            >
              {showAdminPage ? "Hide Admin" : "Admin"}
            </button>
          )}
        </aside>

        <main className="w-3/4 bg-white rounded-lg p-6 ml-6 shadow flex flex-col">
          {showUploadPage ? (
            <UploadPage />
          ) : showBrowsePage ? (
            <BrowseTheses />
          ) : showAdminPage && isAdmin ? ( // Show Admin page only if isAdmin is true
            <div>
              <h1 className="text-3xl font-bold mb-4">Admin Section</h1>
              <p className="text-gray-700 mb-4">
                This is the admin section where you can manage the system,
                upload thesis projects, or manage users.
              </p>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <table className="table-auto w-full mb-6">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">Name</th>
                      <th className="border px-4 py-2">Email</th>
                      <th className="border px-4 py-2">Role</th>
                      <th className="border px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="border px-4 py-2 text-center">{user.name}</td>
                        <td className="border px-4 py-2 text-center">{user.email}</td>
                        <td className="border px-4 py-2 text-center">
                          <div className="flex items-center justify-center">
                            <select
                              value={user.role}
                              onChange={(e) => handleRoleChange(user.id, e.target.value)}
                              className="border p-2 rounded-md"
                            >
                              <option value="admin">Admin</option>
                              <option value="user">User</option>
                              <option value="librarian">Librarian</option>
                            </select>
                            {editedUsers[user.id] && (
                              <span className="ml-2 text-green-500 text-sm">Edited</span>
                            )}
                          </div>
                        </td>
                        <td className="border px-4 py-2 text-center"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
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
