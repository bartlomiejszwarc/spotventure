import {IPost} from '@/interfaces/post-interface';
import LayoutPosts from '@/layouts/layout-posts';
import PostPreviewCard from '../ui/card/post/post-preview-card';
import NoResults from './no-results';
import {useSearchParams} from 'next/navigation';

interface Props {
  posts: IPost[] | null;
  processed: boolean;
}
export default function ResultsPosts({posts, processed}: Props) {
  const searchParams = useSearchParams();

  const search = searchParams.get('search');

  if (posts!?.length > 0 && search) {
    return (
      <LayoutPosts>
        {posts?.map((post, idx) => (
          <PostPreviewCard
            key={idx}
            id={post.id}
            uid={post.uid}
            likesCount={post.likesCount}
            imageUrl={post.imageUrl}
            location={post.location}
            visitDate={post.visitDate}
            likedByIds={post.likedByIds}
          />
        ))}
      </LayoutPosts>
    );
  }
  if (posts!?.length === 0 && search && processed) {
    return <NoResults type={'posts'} keyword={search} />;
  }
}
