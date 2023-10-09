import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { useRef } from "react";
import { useFinishUploadingVideoMutation } from "shared/apis/uploaderApi/uploaderApi";

import {
  removeVideoFromUploads,
  setInitialUpload,
  setUploadProgress,
} from "store/slices/Video/VideoSlice";
import { useAppDispatch } from "./useRedux";
import { ISubmitScanLocal } from "shared/types/myScans/myScans.type";
import { MY_SERVER_URL } from "shared/utils/helpers";

interface Props {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

let CHUNK_SIZE = 1024 * 1024 * 10;

const useUppyFileUploader = (props: Props) => {
  const { onSuccess, onError } = props;
  const [finishVideo, { data, error }] = useFinishUploadingVideoMutation();

  const dispatch = useAppDispatch();

  const uppyRef = useRef(new Uppy({ debug: false, autoProceed: true }));

  const uploadUppyFile = async (file: any, scanData?: ISubmitScanLocal) => {
    if (!file) return;

    let myPromise = new Promise((resolve, reject) => {
      dispatch(
        setInitialUpload({
          videoId: file.name,
          payload: {
            uploadStatus: "uploading",
          },
        })
      );

      try {
        let endpoint = `${MY_SERVER_URL}/uploads/start`;
        // send this url to uppy with the file
        const uppy = new Uppy({ debug: true, autoProceed: true });
        uppy.addFile({
          name: file?.name,
          type: file?.type,
          data: file,
        });
        uppy.use(Tus, { endpoint, chunkSize: CHUNK_SIZE });
        uppy.on("complete", async (result: any) => {
          if (result.successful && result.successful.length) {
            let uuid = result.successful[0].uploadURL.split("/").pop();
            uuid = uuid?.split("?").shift() ?? "";
            if (uuid && file) {
              const res: any = await finishVideo({
                id: uuid,
                filename: file.name,
                mimetype: file.type,
                size: file.size,
              });

              dispatch(
                removeVideoFromUploads({
                  videoId: file!.name,
                  payload: "",
                })
              );
              resolve(res.data);
              if (onSuccess) {
                if (scanData) onSuccess({ data: res.data, scanData });
                else onSuccess(res.data);
              }
            }
          }
        });
        uppy.on("progress", (e: any) => {
          dispatch(
            setUploadProgress({
              videoId: file.name,
              payload: {
                progress: e,
              },
            })
          );
        });
        uppy.on("error", (error: any) => {
          if (onError) onError(error);

          dispatch(
            removeVideoFromUploads({
              videoId: file!.name,
              payload: "",
            })
          );

          reject(error);
        });
      } catch (error) {}
    });

    return myPromise;
  };

  const stopAllUploads = () => {
    uppyRef.current.cancelAll();
  };

  return { uploadUppyFile, stopAllUploads, data };
};

export default useUppyFileUploader;
