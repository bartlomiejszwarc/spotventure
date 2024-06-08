export interface IPost {
  id?: string;
  uid: string;
  description: string;
  category?: string;
  visitDate: Date | undefined;
  imageUrl: string;
  location: string;
  likedByIds: string[];
  replies?: string[];
  free?: boolean;
  createdAt?: Date;
  disabilityFriendly?: boolean;
  parkingAvailable?: boolean;
  anyTimeAvailable?: boolean;
}
