import { defineStore } from 'pinia';

import type { User, Track } from '../firebase-service/types';

export const useCentralStore = defineStore('central', {
    state: () => {
        return {
            authUser: {
                userName: null as string | null,
                userId: null as string | null,
            },
            playlist: [] as Track[],
            currentAudioIndex: 0
        };
    },
    getters: {
        fullPlaylist(state) {
            return state.playlist;
        },
        user(state) {
            return state.authUser;
        }
    },
    actions: {
        userInit(userData: User) {
            this.playlist = userData.playlist || [];
            this.authUser.userId = userData.id;
            this.authUser.userName = userData.name;
        }
    }
});
