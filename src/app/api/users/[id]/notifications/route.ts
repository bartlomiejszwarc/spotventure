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

    const notifications = await prisma.notification.findMany({
      where: {receiverId: id},
    });

    return NextResponse.json({success: true, notifications: notifications});
  } catch (e) {
    return NextResponse.json({success: false, message: e});
  }
}

export async function POST(req: Request, context: any) {
  try {
    const {params} = context;
    const id = params.id;
    const body = await req.json();
    if (id === body.receiverId) return;
    if (!id) return new NextResponse('No ID provided');
    const user = await prisma.user.findUnique({
      where: {
        uid: id,
      },
    });
    if (!user) return new NextResponse('User not found');

    const notification = await prisma.notification.create({
      data: {
        receiverId: body.receiverId,
        senderId: id,
        sourceId: body.sourceId,
        type: body.type,
      },
    });

    if (user?.notifications.includes(notification.id)) return NextResponse.json({success: false});
    await prisma.user.update({
      data: {
        notifications: {
          set: [...user.notifications, notification.id],
        },
      },
      where: {
        uid: body.receiverId,
      },
    });

    return NextResponse.json({success: true});
  } catch (e) {
    return NextResponse.json({success: false, message: e});
  }
}
