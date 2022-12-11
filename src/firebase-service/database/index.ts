import { getDatabase, ref, set, get, child } from 'firebase/database';
import fireBaseApp from '..';

const rtdb = getDatabase(fireBaseApp);
const usersTable = ref(rtdb, 'users/');

async function getUserData(userId: string) {
    const userPath = child(usersTable, userId)
    const snapshot = await get(userPath);

    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        set(child(usersTable, userId), {
            id: userId,
            playlist: []
        });
    }
}

export default {
    getUserData
};
