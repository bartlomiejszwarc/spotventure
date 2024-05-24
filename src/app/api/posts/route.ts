import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient({});

export async function POST(req: Request, res: NextResponse) {
  try {
    const data = await req.json();
    const post = await prisma.post.create({
      data: {
        uid: data.uid,
        description: data.description,
        category: data.category,
        visitDate: data.visitDate,
        imageUrl: data.imageUrl,
        location: data.location,
        free: data.free,
        disabilityFriendly: data.disabilityFriendly,
        parkingAvailable: data.parkingAvailable,
        anyTimeAvailable: data.anyTimeAvailable,
      },
    });
    prisma.$disconnect;
    return NextResponse.json({success: true, post: post});
  } catch (error: any) {
    prisma.$disconnect;
    return NextResponse.json({success: false, message: error.message});
  }
}
