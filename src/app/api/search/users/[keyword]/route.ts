import {NextApiResponse} from 'next';
import {NextResponse, NextRequest} from 'next/server';
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient({});

export async function GET(req: Request, context: any) {
  try {
    const {params} = context;
    const keyword = params.keyword;
    if (!keyword) return new NextResponse('No keyword provided');
    const users = await prisma.user.findMany({
      where: {
        OR: [{name: {contains: keyword, mode: 'insensitive'}}],
      },
    });
    return NextResponse.json({users: users});
  } catch (e) {}
}
