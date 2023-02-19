import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useCallback, useState } from "react";
import { useFirebase } from "../context/FirebaseClient";

type useStorageProp = {
  folder: string;
  onSuccess?: (url: string) => void;
  onError?: (e: any) => void;
};

export default function useStorage({
  folder,
  onSuccess,
  onError,
}: useStorageProp) {
  const { storage } = useFirebase();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const upload = useCallback((file: any) => {
    setProgress(0);
    setIsUploading(true);
    const storageRef = ref(storage, `${folder}/` + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressTo =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressTo);
      },
      (error) => {
        setIsUploading(false);
        if (onError) onError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsUploading(false);
          if (onSuccess) onSuccess(downloadURL);
        });
      }
    );
  }, []);
  return { upload, isUploading, progress };
}
