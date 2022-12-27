<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useCentralStore } from '../../stores/central';
import GCS from '../../firebase-service/gcs';
import RTDB from '../../firebase-service/database';

const centralStore = useCentralStore();
const state = reactive({
    addMusicDialog: false,
    externalLink: '',
    uploadedFile: undefined as File | undefined,
    musicName: ''
});

const disableUpload = computed((): boolean => {
    return state.externalLink === '' && state.uploadedFile === undefined;
});

function setFile(value: File[]) {
    state.uploadedFile = value[0];
    state.musicName = value[0].name.replace(/\.[^/.]+$/, '');
}

async function upload() {
    // user must be logged in
    if (state.uploadedFile) {
        const resultedName = await GCS.uploadAudio(state.uploadedFile);

        RTDB.addTrack(centralStore.user.userId, {
            name: state.musicName,
            provider: 'gcs',
            address: resultedName
        });
    }
}
</script>

<template>
    <v-btn block @click="(state.addMusicDialog = true)">Add</v-btn>
    <v-dialog v-model="state.addMusicDialog">
        <v-card width="500" class="mx-auto pa-6">
            <div class="text-h5 text-center">You can add a new music by</div>

            <v-file-input variant="underlined" label="Uploading an audio file" @update:model-value="setFile"
                accept="audio/*"></v-file-input>

            <div class="d-flex justify-center align-center py-4">
                <v-divider></v-divider>
                <div class="text-caption text-center mx-3">or</div>
                <v-divider></v-divider>
            </div>

            <v-text-field v-model="state.externalLink" variant="underlined"
                label="Paste a YouTube video link"></v-text-field>


            <v-text-field :disabled="disableUpload" v-model="state.musicName" variant="underlined"
                label="Music Title"></v-text-field>
            <v-btn :disabled="disableUpload" @click="upload">Add</v-btn>
        </v-card>
    </v-dialog>
</template>
