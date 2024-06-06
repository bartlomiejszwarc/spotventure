type NotificationType = 'like' | 'follow' | 'reply';
export interface INotification {
  id?: string;
  receiverId: string;
  senderId: string;
  sourceId: string;
  type: NotificationType;
  createdAt?: Date;
}
