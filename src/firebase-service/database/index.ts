import { getDatabase, ref, set, get, child } from 'firebase/database';
import fireBaseApp from '..';

type User = {
    id: string,
    name: string
    playlist: Array<string> | null,
};

const rtdb = getDatabase(fireBaseApp);
const usersTable = ref(rtdb, 'users/');

async function getUserData(userId: string): Promise<User | null> {
    const userPath = child(usersTable, userId)
    const snapshot = await get(userPath);

    if (snapshot.exists()) {
        return snapshot.val();
    }
    return null;
}

async function createUserData(userId: string, userName: string): Promise<User> {
    await set(child(usersTable, userId), {
        id: userId,
        name: userName,
        playlist: []
    });

    return {
        id: userId,
        name: userName,
        playlist: []
    };
}

export default {
    getUserData,
    createUserData
};
