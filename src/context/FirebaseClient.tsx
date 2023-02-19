import { createContext, ReactNode, useContext, useMemo } from "react";
import { initializeApp } from "firebase/app";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { Firestore, getFirestore } from "firebase/firestore";

type contextType = {
  storage: FirebaseStorage;
  db:Firestore
};

type firebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

const Context = createContext<contextType | undefined>(undefined);
type Props = {
  children: ReactNode;
  config: firebaseConfig;
};

export default function FirebaseClient({ children, config }: Props) {
  const app = useMemo(() => initializeApp(config), []);
  const storage = useMemo(() => getStorage(app), []);
  const db = useMemo(() => getFirestore(app), []);
  const contextvalue = useMemo(() => {
    return { storage, db };
  }, []);
  return <Context.Provider value={contextvalue}>{children}</Context.Provider>;
}

export function useFirebase() {
  return useContext(Context) as contextType;
}
