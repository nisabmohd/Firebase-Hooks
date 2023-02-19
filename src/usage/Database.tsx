import { useEffect, useState } from "react";
import useFirestore from "../hooks/useFirestore";

export default function Database() {
  const { addDoc, getDocById, deleteDocById, updateDocById } = useFirestore({
    collectionName: "test",
    timestamps: false,
  });
  const [docId, setDocid] = useState<string | undefined>();
  useEffect(() => {
    addDoc({ name: "Nisab Mohd" }).then((idOfDoc) => {
      console.log(idOfDoc);
      setDocid(() => idOfDoc);
    });
    if (docId)
      getDocById(docId).then((data) => {
        console.log(data);
      });
    if (docId)
      updateDocById(docId, { name: "Hello" }).then(() => {
        console.log("updated");
      });
    if (docId)
      deleteDocById(docId).then(() => {
        console.log("deleted");
      });
  }, []);
  return <div>Database</div>;
}
