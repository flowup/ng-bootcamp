import { MessageModel } from './message.model';

export interface MessageWithLikesModel extends MessageModel {
  likes: number;
}
