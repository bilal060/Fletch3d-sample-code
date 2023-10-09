import { VideoFile } from "react-native-vision-camera";
import { IUserData } from "../auth/user.type";
import { IProjectsListResponse } from "../projects/projects.type";
import { IUploadFileResponse } from "../uploadFile/uploadFile";
import { ILocationType } from "../utils/location.type";
import { ISelectMenuList, ISortingType } from "../utils/utils.type";

export interface IMyScansList {
  location: ILocationType;
  _id: string;
  user_id: IUserData;
  profile_id: {
    _id: string;
    user_id: string;
    profile_name: string;
    configuration_id: string;
    profile_type: string;
    created_at: string;
    updated_at: string;
    __v: number;
  };
  scan_name: string;
  status: string;
  input_videos: IUploadFileResponse[];
  answers: [];
  scan_capture_intent: string;
  category: string;
  space_used: number;
  created_at: string;
  updated_at: string;
  __v: number;
  folder_id: {
    name: string;
  };
  project_id: IProjectsListResponse;
  model_id: Partial<IScanListModel> | string;
  default?: boolean;
}

export interface IScanListModel {
  viewers: [];
  _id: string;
  scan_id: string;
  status:
    | "Success"
    | "Failed"
    | "Processing"
    | "Pending"
    | "Completed"
    | "In Processing Queue"
    | "In Training Queue";
  invited_emails: [];
  is_link_created: boolean;
  is_failed: boolean;
  ports_in_usage: [];
  created_at: string;
  updated_at: string;
  public_link?: string;
  __v: number;
  ns_process_file: {
    _id: string;
    filepath: string;
    key: string;
    filename: string;
    original_name: string;
    mimetype: string;
    size: number;
    bucket: string;
    type: string;
    created_at: string;
    updated_at: string;
    __v: number;
  };
  failed_reason: string;
  time_in_processing: number;
  ns_train_file: {
    _id: string;
    filepath: string;
    key: string;
    filename: string;
    original_name: string;
    mimetype: string;
    size: number;
    bucket: string;
    type: string;
    created_at: string;
    updated_at: string;
    __v: number;
  };
  time_in_training: number;
}

export interface IMyScansByProjectList {
  project_name: string;
  scans: IMyScansList[];
}

export interface ISubmitMyScanPayload {
  scan_name: string;
  category: string;
  location: {
    longitude: string;
    latitude: string;
  };
  input_videos: string[];
  scanning_device: string;
  scan_capture_intent: string;
  project_id?: string;
  folder_id?: string;
}

export interface IUpdateMyScanPayload {
  id: string;
  scan_name: string;
  category: string;
  scan_capture_intent: string;
  project_id: string;
  location: {
    longitude: string;
    latitude: string;
  };
}

export interface IAddScansToProjectPayload {
  project_id: string;
  scans: IMyScansList[];
  folder_id: string;
}

export interface IAddScansToProjectWithOptionalFolderPayload {
  project_id: string;
  body: {
    scans: string[];
    folder_id?: string;
  }[];
}

export interface MyScanPayloadFilterInterface {
  group_by?: "project" | "folder" | "";
  project_unassigned?: boolean;
  project_name?: string | null | IProjectsListResponse;
  model_status?: string | ISelectMenuList;
  category?: string | ISelectMenuList;
  capture_intent?: string | ISelectMenuList;
  start_date?: string;
  search_key?: string;
  end_date?: string;
  folder_unassigned?: boolean;
  sort?: ISortingType;
}

export interface ISubmitScanLocal
  extends Omit<ISubmitMyScanPayload, "input_videos"> {}

export interface IUploadLaterScan {
  videoUrl: VideoFile;
  scanData: ISubmitScanLocal;
}
