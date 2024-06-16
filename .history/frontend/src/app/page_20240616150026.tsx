"use client"

import Navbar from "@/components/Navbar";
import { useEffect } from "react";
 

export default function Home() {

  useEffect(()=>{

  } , []);

  return (
    <div className="flex flex-col gap-10">
      <Navbar/>
      {/*idhr sara login singup site ki tareefe yeh sab dal skta hai*/}
      <h1>WELCOME</h1>
    </div>
  );
}
