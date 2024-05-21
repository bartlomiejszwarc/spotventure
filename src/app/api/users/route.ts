import {NextApiRequest, NextApiResponse} from 'next';
import {NextResponse} from 'next/server';

import connectDb from '@/database/connect-db';
import User from '@/database/models/User';

async function handler(req: Request, res: NextApiResponse) {
  const {method} = req;
  await connectDb();
  switch (method) {
    case 'GET': {
      return new NextResponse('Chuj');
    }
    case 'POST': {
      try {
        const data = await req.json();
        const user = new User({
          uid: data.uid,
          name: data.name,
          email: data.email,
        });
        await user.save();
        return NextResponse.json({success: true});
      } catch (error: any) {
        return NextResponse.json({success: false, message: error.message});
      }
    }
  }
}

export {handler as GET, handler as POST};
