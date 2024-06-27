// pages/api/another-route.ts

import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest){
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
