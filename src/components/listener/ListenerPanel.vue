<script lang="ts" setup>
import { computed } from 'vue';
import AddMusic from './AddMusic.vue';
import { useCentralStore } from '../../stores/central';
import GCS from '../../firebase-service/gcs';
import RTDB from '../../firebase-service/database';
import type { Track } from '@/firebase-service/types';

const centralStore = useCentralStore();

const currentSrc = computed(() => {
    return centralStore.currentTrackSrc || undefined;
});

function play(index: number) {
    centralStore.setTrack(index);
}

async function removeTrack(track: Track) {
    if (centralStore.user.userId) {
        const tempSrcUrl = track.srcUrl;
        try {
            track.srcUrl = null;
            await GCS.deleteAudio(track.address);
            await RTDB.removeTrack(centralStore.user.userId, track);
        } catch (error) {
            console.error(error);
            track.srcUrl = tempSrcUrl;
        }
    }
}
</script>

<template>
    <div class="d-flex justify-center align-center ma-12">
        <v-card width="700" height="500" class="mr-10 pa-6 d-flex align-center">
            <audio style="width: 100%" controls :src="currentSrc"></audio>
        </v-card>
        <v-card width="400" height="500" class="pa-6">
            <v-list density="compact" class="pa-0">
                <v-list-item v-for="(item, i) in centralStore.fullPlaylist" :key="i" :value="item"
                    active-color="primary" @click="play(i)">
                    {{ item.name }}

                    <template v-slot:append>
                        <v-btn icon size="small" elevation="0" variant="plain" @click.stop="removeTrack(item)"
                            :loading="item.srcUrl === null">
                            <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                    </template>
                </v-list-item>
            </v-list>
            <add-music></add-music>
        </v-card>
    </div>
</template>
