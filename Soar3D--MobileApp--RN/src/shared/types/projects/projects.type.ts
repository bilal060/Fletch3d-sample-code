import { ImageSourcePropType } from "react-native";
import { IFolderList } from "../folders/folders.type";
import { IMyScansList } from "../myScans/myScans.type";
import { IUploadFileResponse } from "../uploadFile/uploadFile";
import { ILocationType } from "../utils/location.type";
import { ISortingType } from "../utils/utils.type";

export interface IProjectPostPayload {
  name: string;
  unassigned_scans: string[] | null;
  folder_field: string;
  folders: string[];
  thumbnail?: any;
  location: {
    latitude: string;
    longitude: string;
  };
}

export interface IProjectsListData {
  id: string;
  name: string;
  image: ImageSourcePropType;
}

export interface IProjectsListResponse {
  location: ILocationType;
  _id: string;
  name: string;
  user_id: string;
  unassigned_scans: IMyScansList[];
  scan_count: number;
  folders: IFolderList[];
  created_at: string;
  updated_at: string;
  thumbnail: IUploadFileResponse | null;
  __v: number;
}

export interface IDeleteProjectPayload {
  id: string;
  option: string;
}

export interface ICreateProjectFolderPayload {
  name: string;
  scans: IMyScansList[];
  project_id: string;
}

export interface IAssignScansToFolderApiPayload {
  project_id: string;
  assignments: {
    scan_id: string;
    folder_id: string;
  }[];
}

export interface IDeleteFolderFromProjectPayload {
  project_id: string;
  folderId: string;
  option: "folder" | "scans" | "all";
}

export interface IGetProjectParams {
  sort?: ISortingType;
  search_key?: string;
}
