import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { getServerSession } from "next-auth";
import { createClient } from "@supabase/supabase-js";

const getSupabaseClient = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
  );

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENTID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY,
  }),
  callbacks: {
    async session({ session, user }) {
      const supabase = getSupabaseClient();
      let role = "No Role Found";

      try {
        const { data: userWithRole, error } = await supabase
          .from("next_auth.users")
          .select("role")
          .eq("email", session.user.email)
          .single();

        if (error) {
          console.error("Error fetching role from Supabase:", error);
        } else {
          role = userWithRole?.role || role;
        }
      } catch (err) {
        console.error("Unexpected error in session callback:", err);
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role,
        },
      };
    },
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email.endsWith("@neu.edu.ph");
      }
      return true;
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
