import {NextApiRequest, NextApiResponse} from 'next';
import {NextRequest, NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient({});

async function handler(req: NextRequest, res: NextApiResponse) {
  try {
    const {method} = req;
    switch (method) {
      case 'POST': {
        try {
          const data = await req.json();
          const user = await prisma.user.create({
            data: {
              uid: data.uid,
              email: data.email,
              name: data.name,
              profileImageUrl: '',
            },
          });
          return NextResponse.json({success: true});
        } catch (error: any) {
          return NextResponse.json({success: false, message: error.message});
        }
      }
    }
  } catch (error) {
    prisma.$disconnect;
  } finally {
    prisma.$disconnect;
  }
  prisma.$disconnect;
}

export {handler as GET, handler as POST};
