export class FeedModel {
  id: string;
  type: string;
  title: string;
  description: string;
  thumbnail: string;
  authorId: string;
  authorDisplayName: string;
  authorAvatar: string;
  sections: any[];
  commentCount: number;
  likeCount: number;
  viewCount: number;
  youtubeHost: string;
  videoUrl: string;
  dislikeCount: string;
  userFeed: UserFeed;
  subscriberCount: number;
}
interface UserFeed {
  bookMarked: boolean;
  likeStatus: string;
}
