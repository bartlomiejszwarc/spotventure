import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient({});

export async function POST(req: Request, context: any) {
  try {
    const {params} = context;
    const id = params.id;
    const body = await req.json();
    if (!id) return new NextResponse('No ID provided');
    const user = await prisma.user.findUnique({
      where: {
        uid: id,
      },
    });
    if (!user) NextResponse.json({success: false});
    await prisma.user.update({
      data: {
        likedPosts: {
          push: body.id,
        },
      },
      where: {uid: user!.uid},
    });
    return NextResponse.json({success: true});
  } catch (e) {
    return NextResponse.json({success: false, message: e});
  }
}
