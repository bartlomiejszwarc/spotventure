import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient({});

export async function POST(req: Request, context: any) {
  try {
    const {params} = context;
    const id = params.id;
    const followId = params.followId;
    const body = await req.json();
    if (!id) return new NextResponse('No ID provided');
    if (!followId) return new NextResponse('No ID provided');
    const user = await prisma.user.findUnique({
      where: {
        uid: id,
      },
    });
    if (!user) return NextResponse.json({success: false});
    if (user?.likedPosts.includes(body.id)) return NextResponse.json({success: false});

    await prisma.user.update({
      data: {
        following: {
          push: followId,
        },
      },
      where: {uid: user!.uid},
    });

    const userToFollow = await prisma.user.findUnique({
      where: {
        uid: followId,
      },
    });
    if (!userToFollow) return NextResponse.json({success: false});

    await prisma.user.update({
      data: {
        followers: {
          push: id,
        },
      },
      where: {uid: userToFollow!.uid},
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
    const followId = params.followId;
    const body = await req.json();
    if (!id) return new NextResponse('No ID provided');
    if (!followId) return new NextResponse('No ID provided');

    const user = await prisma.user.findUnique({
      where: {
        uid: id,
      },
    });

    const userToUnfollow = await prisma.user.findUnique({
      where: {
        uid: followId,
      },
    });
    if (!user) return NextResponse.json({success: false});
    if (!userToUnfollow) return NextResponse.json({success: false});

    await prisma.user.update({
      data: {
        following: {
          set: user!.following.filter((userId) => userId !== followId),
        },
      },

      where: {uid: user!.uid},
    });

    await prisma.user.update({
      data: {
        followers: {
          set: userToUnfollow!.followers.filter((userId) => userId !== id),
        },
      },

      where: {uid: userToUnfollow!.uid},
    });

    return NextResponse.json({success: true});
  } catch (e) {
    return NextResponse.json({success: false, message: e});
  }
}
