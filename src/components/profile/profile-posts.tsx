import {IPost} from '@/interfaces/post-interface';
import PostPreviewCard from '../ui/card/post/post-preview-card';
import LayoutPostsProfile from '@/layouts/layout-posts-profile';
import NoResults from './NoResults';
import PostPreviewCardSkeleton from '../ui/skeletons/post-preview-card/post-preview-card-skeleton';

interface Props {
  posts: IPost[];
  uid: string;
  profileImageUrl: string | undefined;
  name: string;
  processed: boolean;
  processing: boolean;
}
export default function ProfilePosts({posts, uid, profileImageUrl, name, processed, processing}: Props) {
  if (processing) {
    return (
      <LayoutPostsProfile>
        {Array.from({length: 3}).map((_, idx) => (
          <PostPreviewCardSkeleton key={idx} />
        ))}
      </LayoutPostsProfile>
    );
  }
  if (posts!?.length > 0 && !processing) {
    return (
      <LayoutPostsProfile>
        {posts.map((post, idx) => (
          <PostPreviewCard
            key={idx}
            id={post.id}
            uid={uid}
            imageUrl={post.imageUrl}
            location={post.location}
            visitDate={post.visitDate}
            likesCount={post.likesCount}
            likedByIds={post.likedByIds}
            profileImageUrl={profileImageUrl}
            username={name}
          />
        ))}
      </LayoutPostsProfile>
    );
  }
  if (posts!?.length === 0 && !processing) {
    return <NoResults uid={uid} />;
  }
}
