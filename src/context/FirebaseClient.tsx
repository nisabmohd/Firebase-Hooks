import { createContext, ReactNode, useContext, useMemo } from "react";
import { initializeApp } from "firebase/app";
import { FirebaseStorage, getStorage } from "firebase/storage";

type contextType = {
  storage: FirebaseStorage;
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
  const contextvalue = useMemo(() => {
    return { storage };
  }, []);
  return <Context.Provider value={contextvalue}>{children}</Context.Provider>;
}

export function useFirebase() {
  return useContext(Context) as contextType;
}
