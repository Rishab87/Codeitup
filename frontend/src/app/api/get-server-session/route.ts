// pages/api/another-route.ts

import { NextApiRequest} from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest){
    const session = await getServerSession(authOptions);
    let userInfo = {};

    if (session) {
    userInfo = {
        name: session.user!.name,
        email: session.user!.email,
    };
    
    return NextResponse.json({message:"Session found" , data: userInfo});
    }
   else {
    return NextResponse.json({ message: 'Session not found' });
  }
};
