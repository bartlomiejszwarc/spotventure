export interface IUser {
  uid: string;
  email: string | null;
  name: string;
  location?: string;
  createdAt: Date;
  profileImageUrl?: string;
  followers?: string[];
  following?: string[];
  likedPosts?: string[];
  likedReplies?: string[];
  notifications?: string[];
}
