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
    if (!user) return NextResponse.json({success: false, message: 'User not found'});
    const reply = await prisma.reply.findUnique({where: {id: body.id}});
    if (!reply) return NextResponse.json({success: false, message: 'Reply not found'});
    if (user?.likedReplies.includes(body.id)) return NextResponse.json({success: false, message: 'User already liked'});
    const userUpdated = await prisma.user.update({
      data: {
        likedReplies: {
          set: [...user.likedReplies, body.id],
        },
      },
      where: {uid: user!.uid},
    });

    await prisma.reply.update({
      data: {
        likedByIds: {set: [...reply.likedByIds, id]},
      },
      where: {id: body.id},
    });

    return NextResponse.json({success: true});
  } catch (e: any) {
    return NextResponse.json({success: false, message: e.message});
  }
}

export async function PUT(req: Request, context: any) {
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
    if (!user) return NextResponse.json({success: false});
    const reply = await prisma.reply.findUnique({where: {id: body.id}});
    if (!reply) return NextResponse.json({success: false, message: 'Reply not found'});
    const updatedUser = await prisma.user.update({
      data: {
        likedReplies: {
          set: user!.likedReplies.filter((replyId) => replyId !== body.id),
        },
      },
      where: {uid: user!.uid},
    });
    await prisma.reply.update({
      data: {
        likedByIds: {set: reply.likedByIds.filter((userId) => userId !== id)},
      },
      where: {id: body.id},
    });

    return NextResponse.json({success: true});
  } catch (e) {
    return NextResponse.json({success: false, message: e});
  }
}
