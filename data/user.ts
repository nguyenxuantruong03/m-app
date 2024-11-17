import prismadb from "@/lib/prismadb"

export const getUserByEmail = async (email:string | undefined) => {
    try {
        const user = await prismadb.user.findUnique({where: {email}})
        return user
    } catch (error) {
        return null       
    }
}
 
export const getUserById = async (id:string | undefined) => {
    try {
        const user = await prismadb.user.findUnique({where: {id},include:{
            socialLink: true,
            imageCredential: {
                orderBy: {
                    createdAt: 'desc'
                }
            },
            feedback: {
                orderBy: {
                    createdAt: 'desc',
                },
                take: 1, // Lấy 1 feedback mới nhất
            },
            stream: {
                select: {
                    isLive: true
                }
            }
        }})
        return user
    } catch (error) {
        return null       
    }
}