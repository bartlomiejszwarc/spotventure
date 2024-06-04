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

    if (user?.likedPosts.includes(body.id)) return NextResponse.json({success: false, message: 'User already liked'});

    const userUpdated = await prisma.user.update({
      data: {
        likedPosts: {
          set: [...user.likedPosts, body.id],
        },
      },
      where: {uid: user!.uid},
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
    const updatedUser = await prisma.user.update({
      data: {
        likedPosts: {
          set: user!.likedPosts.filter((postId) => postId !== body.id),
        },
      },

      where: {uid: user!.uid},
    });

    return NextResponse.json({success: true});
  } catch (e) {
    return NextResponse.json({success: false, message: e});
  }
}
