import {
  getAuth,
  createUserWithEmailAndPassword,
  User,
  signInWithEmailAndPassword,
  signOut as signout,
} from "firebase/auth";
const auth = getAuth();

export default function useAuthentication() {
  function signUp(
    email: string,
    password: string,
    onSuccess: (user: User) => void,
    onFailure?: (err: any) => void
  ) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        onSuccess(userCredential.user);
      })
      .catch((error) => {
        if (onFailure) onFailure(error);
      });
  }
  function signIn(
    email: string,
    password: string,
    onSuccess: (user: User) => void,
    onFailure?: (err: any) => void
  ) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        onSuccess(userCredential.user);
      })
      .catch((error) => {
        if (onFailure) onFailure(error);
      });
  }
  function signOut(onSuccess: () => void, onFailure?: (err: any) => void) {
    signout(auth)
      .then(() => {
        onSuccess();
      })
      .catch((err) => {
        if (onFailure) onFailure(err);
      });
  }
  return { signIn, signUp, signOut };
}
