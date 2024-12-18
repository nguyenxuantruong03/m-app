import prismadb from '@/lib/prismadb';
import { auth } from '@/auth';

const getUser = async () => {
    const session = await auth();
    if (!session?.user?.email) {
        return [];
    }

    try {
        const users = await prismadb.user.findMany({
            where: {
                AND: [
                    {
                        NOT: {
                            email: session.user.email,
                        },
                    },
                    {
                        NOT: {
                            email: 'guest@gmail.com',
                        },
                    },
                ],
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return users;
    } catch (err) {
        return [];
    }
};

export default getUser;
