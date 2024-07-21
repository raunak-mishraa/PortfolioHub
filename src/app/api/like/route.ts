import { NextRequest } from 'next/server'
import { getServerSession, User } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/options';
export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const user:User = session?.user as User;
}