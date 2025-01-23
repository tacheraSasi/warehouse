"use client"
import prisma from "prisma/client"
import main from "prisma/seed"
import { useState } from "react"

export default function SeedPage(){
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const seed = async ()=>{
    await main()
    
    const dataFromDb = await prisma.products.findMany()
    let categoriesArray = []
    dataFromDb.forEach(data=>{
      data.category && categoriesArray.push(data.category)
    })
    await prisma.categories.createMany(categoriesArray)
    const products = dataFromDb
    const totalProducts = await prisma.products.count()
    setIsClicked(true)
  }
  return (
    <div>
      <button onClick={()=>seed() }>{ isClicked?"Clicked":"SEED"}</button>
    </div>
  )
}