import fireBaseApp from '../firebase-service';
import type { AuthData } from '../firebase-service/types';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, type UserCredential, OAuthCredential, getAuth, type Auth, signOut } from 'firebase/auth';

const auth: Auth = getAuth(fireBaseApp);
const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();
const gitHubProvider: GithubAuthProvider = new GithubAuthProvider();
const facebookProvider: FacebookAuthProvider = new FacebookAuthProvider();

async function googleSignIn(): Promise<AuthData> {
    const result: UserCredential = await signInWithPopup(auth, googleProvider);
    const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);

    return {
        id: result.user.uid,
        name: result.user.displayName,
        avatarURL: result.user.photoURL
    }
}

async function gitHubSignIn(): Promise<AuthData> {
    const result: UserCredential = await signInWithPopup(auth, gitHubProvider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    
    return {
        id: result.user.uid,
        name: result.user.displayName || ((result as any)._tokenResponse.screenName),
        avatarURL: result.user.photoURL
    };
}

async function facebookSignIn(): Promise<AuthData> {
    const result: UserCredential = await signInWithPopup(auth, facebookProvider);
    const credential = FacebookAuthProvider.credentialFromResult(result);

    console.log(result, credential);

    const rawResponse: any = JSON.parse((result as any)._tokenResponse.rawUserInfo);

    return {
        id: result.user.uid,
        name: result.user.displayName,
        avatarURL: rawResponse.picture.data.url
    };
}

async function signOff(): Promise<void> {
    await signOut(auth);
}

export default {
    signIn: {
        Google: googleSignIn,
        GitHub: gitHubSignIn,
        Facebook: facebookSignIn
        // 'normal': () => { }
    },
    normalRegister: () => { },
    signOff
};
