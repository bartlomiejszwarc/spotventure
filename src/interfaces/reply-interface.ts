export interface IReply {
  id?: string;
  uid: string;
  sourceId: string;
  text: string;
  likedByIds?: string[];
  createdAt?: Date;
}
