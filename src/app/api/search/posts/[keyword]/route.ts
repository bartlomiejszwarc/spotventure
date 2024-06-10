import {NextResponse} from 'next/server';
import {PrismaClient, Post} from '@prisma/client';
const prisma = new PrismaClient({});

type SortOrder = 'asc' | 'desc';
export async function GET(req: Request, context: any) {
  try {
    const {params} = context;
    const url = new URL(req.url);
    const orderField: keyof Post = url.searchParams.get('orderBy') as keyof Post;
    const order: SortOrder = url.searchParams.get('order') as SortOrder;

    const keyword = params.keyword;
    if (!keyword) return new NextResponse('No keyword provided');

    if (url.searchParams.get('orderBy') === 'popularity') {
      const posts = await prisma.post.findMany({
        where: {
          OR: [
            {location: {contains: keyword, mode: 'insensitive'}},
            {description: {contains: keyword, mode: 'insensitive'}},
          ],
        },
        orderBy: {
          likesCount: 'desc',
        },
      });
      return NextResponse.json({posts: posts});
    }
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {location: {contains: keyword, mode: 'insensitive'}},
          {description: {contains: keyword, mode: 'insensitive'}},
        ],
      },
      orderBy: {
        [orderField]: order,
      },
    });
    return NextResponse.json({posts: posts});
  } catch (e) {
    return NextResponse.json({success: false});
  }
}
