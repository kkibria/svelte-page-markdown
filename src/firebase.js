import { authState } from 'rxfire/auth';

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();

export function userSubscribe (fn) {
    authState(auth).subscribe(fn);
}