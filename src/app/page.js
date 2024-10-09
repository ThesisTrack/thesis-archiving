'use client'
import { Button } from "@/components/ui/button";
import { signIn} from "next-auth/react";


export default function Home() {
  return (
    <div>
      <Button className="" onClick={() => signIn('google')}>Sign in with Google</Button>   
    </div>   
  );
}