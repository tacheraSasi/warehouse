import prisma from "./client"

const createAdmin = async ()=>{
    await prisma.admin.create(
      
    )
}