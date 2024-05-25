export interface IPost {
  uid: string;
  description: string;
  category?: string;
  visitDate: Date | undefined;
  imageUrl: string;
  location: string;
  likesCount: number;
  free?: boolean;
  disabilityFriendly?: boolean;
  parkingAvailable?: boolean;
  anyTimeAvailable?: boolean;
}