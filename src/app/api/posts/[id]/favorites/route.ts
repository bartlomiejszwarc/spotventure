import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient({});

export async function POST(req: Request, context: any) {
  try {
    const {params} = context;
    const id = params.id;
    if (!id) return new NextResponse('No ID provided');
    const body = await req.json();
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    if (!post) return NextResponse.json({success: false});
    if (post?.likedByIds.includes(body.uid)) return NextResponse.json({success: false});
    await prisma.post.update({
      data: {
        likedByIds: {push: [body.uid]},
      },
      where: {
        id: id,
      },
    });

    return NextResponse.json({success: true});
  } catch (e) {
    return NextResponse.json({success: false, message: e});
  }
}

export async function PUT(req: Request, context: any) {
  try {
    const {params} = context;
    const id = params.id;
    if (!id) return new NextResponse('No ID provided');
    const body = await req.json();
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    if (!post) NextResponse.json({success: false});
    await prisma.post.update({
      data: {
        likedByIds: {
          set: post!.likedByIds.filter((userId) => {
            userId !== body.uid;
          }),
        },
      },
      where: {
        id: id,
      },
    });

    return NextResponse.json({success: true});
  } catch (e) {
    return NextResponse.json({success: false, message: e});
  }
}
