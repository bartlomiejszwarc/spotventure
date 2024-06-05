import {IPost} from '@/interfaces/postInterface';
import LayoutPosts from '@/layouts/layoutPosts';
import PostPreviewCard from '../ui/card/postPreviewCard';
import NoResults from './no-results';

interface Props {
  posts: IPost[] | null;
  keyword: string;
  processed: boolean;
}
export default function ResultsPosts({posts, keyword, processed}: Props) {
  if (posts!.length > 0 && keyword) {
    return (
      <LayoutPosts>
        {posts?.map((post, idx) => (
          <PostPreviewCard
            key={idx}
            id={post.id}
            uid={post.uid}
            imageUrl={post.imageUrl}
            location={post.location}
            visitDate={post.visitDate}
            likedByIds={post.likedByIds}
          />
        ))}
      </LayoutPosts>
    );
  }
  if (posts!.length === 0 && keyword && processed) {
    return <NoResults type={'posts'} keyword={keyword} />;
  }
}
