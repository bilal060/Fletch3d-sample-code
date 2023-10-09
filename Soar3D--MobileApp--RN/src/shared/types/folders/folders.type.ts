import { IMyScansList } from "shared/types/myScans/myScans.type";

export interface IFolderList {
    _id: string;
    name: string;
    scans: IMyScansList[];
    project_id: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
}

export type FolderActionType = "rename" | "delete";
