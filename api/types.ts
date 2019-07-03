export interface Post {
  id?: string;
  author: string;
  text: string;
}

export interface Reaction {
  id?: string;
  type: 'clap';
  postId: string;
}

export interface ApiError {
  error: string;
}

export function isPost(post: unknown): post is Post {
  return (
    post != null &&
    typeof (post as Post).author === 'string' &&
    typeof (post as Post).text === 'string'
  );
}

export function isReaction(reaction: unknown): reaction is Reaction {
  return (
    reaction != null &&
    (reaction as Reaction).type === 'clap' &&
    typeof (reaction as Reaction).postId === 'string'
  );
}
