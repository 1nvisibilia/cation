import fireBaseApp from '../../firebase-service';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, type UserCredential, OAuthCredential, getAuth, type Auth } from 'firebase/auth';

const auth: Auth = getAuth(fireBaseApp);
const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();

async function googleSignIn() {
    const result: UserCredential = await signInWithPopup(auth, googleProvider);
    const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);

    console.log(result, credential);
}

export default {
    googleSignIn,
    facebookSignIn: () => { },
    normalSignIn: () => { },
    normalRegister: () => { }
};
