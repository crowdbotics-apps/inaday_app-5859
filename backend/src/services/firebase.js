import Firebase from 'firebase';

import FirebaseConfig from '../config/firebase';

Firebase.initializeApp(FirebaseConfig);

export const FireStore = Firebase.firestore();
export const Auth = Firebase.auth();
export const Storage = Firebase.storage();
