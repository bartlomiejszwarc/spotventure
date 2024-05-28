import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient({});

export async function GET(req: Request, context: any) {
  try {
    const {params} = context;
    const id = params.id;
    if (!id) return new NextResponse('No ID provided');
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json({post: post});
  } catch (e) {}
}
