export interface CommentModel {
  id: string;
  text: string;
  timestamp: number;
  author: {
    name: string;
    color: string;
  };
  likes?: number;
}
