    import { authOptions } from "@/server/auth";
    import { getServerSession } from "next-auth";
    import { createClient } from "@supabase/supabase-js";
    import { redirect } from "next/navigation";

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey, {
        db: {
          schema: 'next_auth', 
        },
      });

    export default async function Verify() {
        
        const session = await getServerSession(authOptions);

        const match = session.user.email;
        console.log(match);

        const data = await supabase
        .from('users') 
        .select('role')   
        .eq('email', match)
        .single();     
        console.log(data);

        const role = data.data.role;
        console.log(role);

        if (role === "user") {
            redirect("/");
          } else if (role === "admin") {
            redirect("/");
          } else if (role === "librarian") {
            redirect("/librarian");
          }

    }