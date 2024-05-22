import {NextApiRequest, NextApiResponse} from 'next';
import {NextRequest, NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient({});

async function handler(req: NextRequest, res: NextApiResponse) {
  try {
    const {method} = req;
    switch (method) {
      case 'GET': {
        const id = req.nextUrl.searchParams.get('id');
        if (!id) return NextResponse.json({success: false, message: 'No ID provided'});
        const user = await prisma.user.findUnique({
          where: {
            uid: 'gerferg',
          },
        });
        return NextResponse.json({success: true, user: user || null});
      }
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
}

export {handler as GET, handler as POST};
