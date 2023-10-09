import { IUserData } from "../auth/user.type";
import { IMyScansList } from "../myScans/myScans.type";
import { ILocationType } from "../utils/location.type";
import { ISelectMenuList } from "../utils/utils.type";

export interface IFeedFilterPayloadInterface {
  search_key?: string;
  post_type?: string;
  location?: string;
  page: number;
  limit: number;
  post_id?: string;
  tags?: string;
}

export interface IPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  type: "Scan" | "Article";
  tags: {
    _id: string;
    name: string;
  }[];
  total_likes?: number;
  like_ids: {
    user_id: string;
  }[];
  total_comments?: number;
  total_stars?: number;
  starred_by: string[];
  flagged_by: string[];
  scan_id?: IMyScansList;
  article_url?: string;
  article_title?: string;
  article_img?: string;
  user_id?: IUserData;
  created_at: string;
}

export interface ISubmitPostPayload {
  title: string;
  description: string;
  type: ISelectMenuList | string | undefined;
  scan_or_article?: string | ISelectMenuList;
  tags: ISelectMenuList[] | string[];
  scan_id?: string;
  article_url?: string;
  is_expanded?: boolean;
  is_scan_post?: boolean;
}

export interface ISpecificPostPayloadInterface {
  id: string;
}

export type PostActionTypes = "like" | "star"; // "comment"

export interface IPostActionPayloadInterface {
  params: {
    action: PostActionTypes;
  };
  body: {
    post_id: string;
    // comment?: string;
  };
}

export interface IPostCategoriesList {
  _id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
  __v: number;
}
