import {NextResponse} from 'next/server';
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
    if (!user) return new NextResponse('User not found');

    const posts = await prisma.post.findMany({
      //take: 5,
      where: {uid: {in: user.following}},
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({success: true, posts: posts});
  } catch (e) {
    return NextResponse.json({success: false, message: e});
  }
}
