export interface IUploadFileResponse {
    filepath: string;
    url: string;
    key: string;
    filename: string;
    original_name: string;
    mimetype: string;
    size: string;
    bucket: string;
    type: string;
    thumbnail: string;
    _id: string;
    created_at: string;
    updated_at: string;
    __v: string;
}

export interface IFinishVideoUploading {
    id: string;
    filename: string;
    mimetype: string;
    size: number;
}
