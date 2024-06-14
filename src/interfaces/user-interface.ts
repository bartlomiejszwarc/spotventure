export interface IUser extends IUserProfileUpdate {
  uid: string;
  email: string | null;
  name: string;
  country?: string;
  createdAt: Date;
  profileImageUrl?: string;
  backgroundImageUrl?: string;
  followers?: string[];
  following?: string[];
  likedPosts?: string[];
  likedReplies?: string[];
  notifications?: string[];
  postsVisible?: boolean;
}

export interface IUserProfileUpdate {
  name?: string;
  country?: string;
  profileImageUrl?: string;
  prevProfileImageUrl?: string;
  backgroundImageUrl?: string;
  prevBackgroundImageUrl?: string;
  password?: string;
  postsVisible?: boolean;
}

export interface IUpdate {
  name?: string;
  country?: string;
  profileImageFile?: File;
  backgroundImageFile?: File;
}
