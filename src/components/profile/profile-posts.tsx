import {IPost} from '@/interfaces/postInterface';
import LayoutPosts from '@/layouts/layoutPosts';
import PostPreviewCard from '../ui/card/post/postPreviewCard';

interface Props {
  posts: IPost[];
  uid: string;
  profileImageUrl: string | undefined;
  name: string;
  processed: boolean;
}
export default function ProfilePosts({posts, uid, profileImageUrl, name, processed}: Props) {
  if (posts!.length > 0) {
    return (
      <LayoutPosts>
        {posts.map((post, idx) => (
          <PostPreviewCard
            key={idx}
            id={post.id}
            uid={uid}
            imageUrl={post.imageUrl}
            location={post.location}
            visitDate={post.visitDate}
            likedByIds={post.likedByIds}
            profileImageUrl={profileImageUrl}
            username={name}
          />
        ))}
      </LayoutPosts>
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
