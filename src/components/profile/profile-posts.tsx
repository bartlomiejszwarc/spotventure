import {IPost} from '@/interfaces/post-interface';
import PostPreviewCard from '../ui/card/post/post-preview-card';
import LayoutPostsProfile from '@/layouts/layout-posts-profile';

interface Props {
  posts: IPost[];
  uid: string;
  profileImageUrl: string | undefined;
  name: string;
  processed: boolean;
}
export default function ProfilePosts({posts, uid, profileImageUrl, name, processed}: Props) {
  if (posts!?.length > 0) {
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
  if (posts.length === 0 && processed) {
    return (
      <div>
        <span className='text-2xl font-light'>This user has not add any posts yet</span>
      </div>
    );
  }
}
