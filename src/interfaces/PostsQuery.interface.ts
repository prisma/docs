import { EdgeNode } from './EdgeNode.interface';

interface Post {
  path: string;
  title: string;
  date: string;
}

export interface PostsQueryData {
  allMdx: {
    edges?: [EdgeNode<Post>];
  };
}
