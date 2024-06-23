import {ReactNode} from 'react';

export default function FollowingPostsListWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
