"use client"
import main from "prisma/seed"
import { useState } from "react"

export default function SeedPage(){
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const seed = async ()=>{
    await main()
    setIsClicked(true)
  }
  return (
    <div className="bg-slate-400 p-3 m-8 text-2xl">
      <button onClick={()=>seed() }>{ isClicked?"Clicked":"SEED"}</button>
    </div>
  )
}