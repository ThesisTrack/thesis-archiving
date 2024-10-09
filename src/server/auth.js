import GoogleProvider from "next-auth/providers/google"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import jwt from "jsonwebtoken";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENTID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY,
  }),
  callbacks: {
  },
};
