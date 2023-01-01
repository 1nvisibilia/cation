import fireBaseApp from '../firebase-service';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, type UserCredential, OAuthCredential, getAuth, type Auth, signOut } from 'firebase/auth';

const auth: Auth = getAuth(fireBaseApp);
const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();
const gitHubProvider: GithubAuthProvider = new GithubAuthProvider();

async function googleSignIn(): Promise<UserCredential> {
    const result: UserCredential = await signInWithPopup(auth, googleProvider);
    const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);

    // console.log(result, credential);
    return result;
}

async function gitHubSignIn(): Promise<UserCredential> {
    const result: UserCredential = await signInWithPopup(auth, gitHubProvider);
    const credential = GithubAuthProvider.credentialFromResult(result);

    // console.log(result, credential);
    return result;
}

async function signOff(): Promise<void> {
    await signOut(auth);
}

export default {
    signIn: {
        Google: googleSignIn,
        GitHub: gitHubSignIn,
        // 'normal': () => { }
    },
    normalRegister: () => { },
    signOff
};
