import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';

import {IUserProfileUpdate} from '@/interfaces/user-interface';

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
    return NextResponse.json({user: user});
  } catch (e) {}
}

export async function PUT(req: Request, context: any) {
  try {
    const {params} = context;
    const id = params.id;
    const body: IUserProfileUpdate = await req.json();
    if (!id) return new NextResponse('No ID provided');
    const userData = await prisma.user.findUnique({
      where: {
        uid: id,
      },
    });
    if (!userData) return new NextResponse('Error while fetching user data');
    const userUpdated = await prisma.user.update({
      data: {
        name: body.name ? body.name : userData.name,
        country: body.country ? body.country : userData.country,
        profileImageUrl: body.profileImageUrl ? body.profileImageUrl : userData.profileImageUrl,
        backgroundImageUrl: body.backgroundImageUrl ? body.backgroundImageUrl : userData.backgroundImageUrl,
      },
      where: {uid: id},
    });
    if (!userUpdated) return NextResponse.json({success: false});
    return NextResponse.json({success: true, user: userUpdated});
  } catch (error) {
    return NextResponse.json({success: false});
  }
}
