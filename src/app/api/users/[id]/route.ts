import {NextApiResponse} from 'next';
import {NextResponse, NextRequest} from 'next/server';
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient({});

export async function GET(req: Request, context: any) {
  try {
    const {params} = context;
    const id = params.id;
    if (!id) return new NextResponse('No ID provided');
    const user = await prisma.user.findUnique({
      where: {
        uid: id,
      },
    });
    return NextResponse.json({user: user});
  } catch (e) {}
}
