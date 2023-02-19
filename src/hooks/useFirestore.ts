import { useFirebase } from "../context/FirebaseClient";
import {
  collection,
  addDoc as addDocument,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  deleteDoc,
  onSnapshot,
  query,
} from "firebase/firestore";

type Prop = {
  collectionName: string;
  timestamps?: boolean;
};

export default function useFirestore({ collectionName, timestamps }: Prop) {
  const { db } = useFirebase();
  let value = {};
  async function addDoc(value: any) {
    const docRef = await addDocument(
      collection(db, collectionName),
      timestamps
        ? {
            ...value,
            timsetamp: serverTimestamp(),
          }
        : value
    );
    return docRef.id;
  }
  async function updateDocById(docId: string, value: any) {
    const Ref = doc(db, collectionName, docId);
    await updateDoc(Ref, value);
  }
  async function getDocById(docId: string) {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }
  async function deleteDocById(docId: string) {
    await deleteDoc(doc(db, collectionName, docId));
  }

  function suscribeCollection() {
    const q = query(collection(db, "cities"));
    const data: any[] = [];
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
    });
    return { unsubscribe, data };
  }

  function suscribeDoc(docId: string) {
    const unsubscribe = onSnapshot(doc(db, collectionName, docId), (doc) => {
      console.log("Current data: ", doc.data());
    });
    return unsubscribe;
  }
  return {
    addDoc,
    getDocById,
    updateDocById,
    deleteDocById,
    db,
    collection,
    suscribeCollection,
    suscribeDoc,
  };
}
