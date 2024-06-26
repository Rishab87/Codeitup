"use client"

import Navbar from "@/components/Navbar";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <div className="flex flex-col gap-10 h-[100vh] overlfow-hidden">
      <Navbar/>
      <AuroraBackground className="relative h-[91vh] overflow-y-hidden">
        <div className="flex justify-center items-center flex-col gap-5 mb-28">
          <div>
            <h1 className='mt-20 md:mt-0 text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-600 font-mono text-center'>Codeitup</h1>
            <p className="mt-20 md:mt-0 text-lg md:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-600 font-mono">The Only Platform You Need To Master DSA!</p>
          </div>
        </div>
      </AuroraBackground>
      <Button variant={"outline"} onClick={()=>router.push('/problems/1')} className="absolute bottom-64 left-[45vw]">Start Solving</Button>
    </div>
  );
}
