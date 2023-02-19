import useStorage from "../hooks/useStorage";

export default function Upload() {
  const { isUploading, progress, upload } = useStorage({
    folder: "images",
    onSuccess: (url) => {
      console.log(url);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  function handleChangeInput(e: any) {
    upload(e.target.files[0]);
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <input type="file" onChange={handleChangeInput} />
      {isUploading && <p>uploading....</p>}
      {progress != 0 && <p> uploaded {progress} %</p>}
    </div>
  );
}
