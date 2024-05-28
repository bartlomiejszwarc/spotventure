import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient({});

export async function POST(req: Request, context: any) {
  try {
    const {params} = context;
    const id = params.id;
    if (!id) return new NextResponse('No ID provided');

    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    if (!post) NextResponse.json({success: false});
    await prisma.post.update({
      data: {
        likesCount: post!.likesCount + 1,
      },
      where: {
        id: id,
      },
    });

    prisma.$disconnect;
    return NextResponse.json({success: true});
  } catch (e) {
    prisma.$disconnect;
    return NextResponse.json({success: false, message: e});
  }
}

export async function DELETE(req: Request, context: any) {
  try {
    const {params} = context;
    const id = params.id;
    if (!id) return new NextResponse('No ID provided');

    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    if (!post) NextResponse.json({success: false});
    await prisma.post.update({
      data: {
        likesCount: post!.likesCount - 1,
      },
      where: {
        id: id,
      },
    });

    prisma.$disconnect;
    return NextResponse.json({success: true});
  } catch (e) {
    prisma.$disconnect;
    return NextResponse.json({success: false, message: e});
  }
}
