import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient({});

export async function GET(req: Request, context: any) {
  try {
    const {params} = context;
    const id = params.id;
    if (!id) return new NextResponse('No ID provided');

    const replies = await prisma.reply.findMany({
      where: {sourceId: id},
    });
    return NextResponse.json({success: true, replies: replies});
  } catch (error) {}
}

export async function POST(req: Request, context: any) {
  try {
    const {params} = context;
    const id = params.id;
    if (!id) return new NextResponse('No ID provided');
    const body = await req.json();
    const reply = await prisma.reply.create({
      data: {
        uid: body.uid,
        sourceId: body.sourceId,
        text: body.text,
      },
    });
    if (!reply) return NextResponse.json({success: false});
    const post = await prisma.post.update({
      data: {replies: {push: [reply.id]}},
      where: {id: id},
    });
    if (!post) return NextResponse.json({success: false});
    return NextResponse.json({success: true, reply: reply});
  } catch (error: any) {
    return NextResponse.json({success: false, message: error.message});
  }
}
