import { defineStore } from 'pinia';
import RTDB from '../firebase-service/database';
import type { DataSnapshot } from 'firebase/database';
import type { User as AuthUserData } from 'firebase/auth';
import type { User, Track } from '../firebase-service/types';
import { nameObjectToFlatArray } from '../utils/conversions';

export const useCentralStore = defineStore('central', {
    state: () => {
        return {
            authUser: {
                userName: null as string | null,
                userId: null as string | null,
                avatarUrl: null as string | null
            },
            playlist: [] as Track[],
            currentAudioIndex: 0,
            srcUrl: null as string | null
        };
    },
    getters: {
        fullPlaylist(state) {
            return state.playlist;
        },
        user(state) {
            return state.authUser;
        },
        currentTrackSrc(state) {
            return state.srcUrl;
        }
    },
    actions: {
        userInit(userData: User, authData: AuthUserData) {
            this.playlist = userData.playlist ? nameObjectToFlatArray(userData.playlist) : [];
            this.authUser.userId = userData.id;
            this.authUser.userName = userData.name;
            this.authUser.avatarUrl = authData.photoURL;

            // register on change listeners
            RTDB.registerListener(userData.id, (newTracks: DataSnapshot) => {
                this.playlist = nameObjectToFlatArray(newTracks.val());
            });
        },
        userDestroy() {
            if (this.authUser.userId) {
                RTDB.deleteListener(this.authUser.userId);
                this.authUser.userId = null;
            }
            this.authUser.userName = null;
            this.playlist = [];
        },
        setTrack(index: number) {
            this.currentAudioIndex = index;
            this.srcUrl = this.playlist[index].srcUrl;
        }
    }
});
