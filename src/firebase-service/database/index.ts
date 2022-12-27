import { getDatabase, ref, set, get, child, push } from 'firebase/database';
import type { User, Track } from '../types';
import fireBaseApp from '..';

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

async function addTrack(userId: string | null, track: Track) {
    if (userId === null) {
        console.error('not logged in');
        return;
    }

    const playList = child(usersTable, `${userId}/playlist`);
    const newTrack = push(playList);
    set(newTrack, track);
    console.log(track);
}

export default {
    getUserData,
    createUserData,
    addTrack
};
