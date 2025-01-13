"use client"
import main from "prisma/seed"
import { useState } from "react"

export default function SeedPage(){
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const seed = ()=>{
    main()
    setIsClicked(true)
  }
  return (
    <div>
      <button onClick={()=>seed() }>{ isClicked?"Clicked":"SEED"}</button>
    </div>
  )
}