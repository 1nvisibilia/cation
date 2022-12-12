import { defineStore } from 'pinia';

export const usePlaylistStore = defineStore('playlist', {
    state: () => {
        return {
            playlist: [] as string[],
            currentAudioIndex: 0
        };
    },
    getters: {
        fullPlaylist(state) {
            return state.playlist;
        }
    },
    actions: {
        setPlaylist(playlist: Array<string>) {
            this.playlist = playlist;
        }
    }
});
