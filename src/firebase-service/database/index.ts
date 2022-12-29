import { getDatabase, ref, set, get, child, push, onValue, off, type DataSnapshot } from 'firebase/database';
import type { User, Track } from '../types';
import fireBaseApp from '..';

const rtdb = getDatabase(fireBaseApp);
const usersTable = ref(rtdb, 'users/');

async function getUserData(userId: string): Promise<User | null> {
    const userPath = child(usersTable, userId)
    const snapshot = await get(userPath);

    if (snapshot.exists()) {
        const value: User = snapshot.val();
        return {
            id: value.id,
            name: value.name,
            playlist: (Object.values(value.playlist || {} as object)) as Track[]
        };
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

async function addTrack(userId: string, track: Track) {
    const playList = child(usersTable, `${userId}/playlist`);
    const newTrack = push(playList);
    set(newTrack, track);
    console.log(track);
}

function registerListener(userId: string, callback: (newTracks: DataSnapshot) => any) {
    onValue(child(usersTable, `${userId}/playlist`), callback);
}

async function deleteListener(userId: string) {
    off(child(usersTable, `${userId}/playlist`))
}

export default {
    getUserData,
    createUserData,
    addTrack,
    registerListener,
    deleteListener
};
