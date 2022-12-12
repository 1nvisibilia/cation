import fireBaseApp from '../firebase-service';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, type UserCredential, OAuthCredential, getAuth, type Auth } from 'firebase/auth';

const auth: Auth = getAuth(fireBaseApp);
const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();
const gitHubProvider: GithubAuthProvider = new GithubAuthProvider();

async function googleSignIn(): Promise<UserCredential> {
    const result: UserCredential = await signInWithPopup(auth, googleProvider);
    const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);

    console.log(result, credential);

    // if (!credential) return;
    return result;
}

async function gitHubSignIn(): Promise<UserCredential> {
    const result: UserCredential = await signInWithPopup(auth, gitHubProvider);
    const credential = GithubAuthProvider.credentialFromResult(result);

    console.log(result, credential);
    return result;
}

export default {
    signIn: {
        Google: googleSignIn,
        GitHub: gitHubSignIn,
        // 'normal': () => { }
    },
    normalRegister: () => { },
};
