import { getServerAuthSession } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


const Dashboard = () => {
  const session = getServerAuthSession();

  console.log(session)

  if (!session) {
    redirect('/login')
  }

  return (
   <h1>Hello</h1>
  )
 
};

export default Dashboard;