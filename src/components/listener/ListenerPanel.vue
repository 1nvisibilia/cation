<script lang="ts" setup>
import AddMusic from './AddMusic.vue';
import { useCentralStore } from '../../stores/central';

const centralStore = useCentralStore();
</script>

<template>
    <div class="d-flex justify-center align-center ma-12">
        <v-card width="700" height="500" class="mr-10 pa-6 d-flex align-center">
            <audio style="width: 100%" controls></audio>
        </v-card>
        <v-card width="400" height="500" class="pa-6">
            <v-list density="compact" class="pa-0">
                <v-list-item v-for="(item, i) in centralStore.fullPlaylist" :key="i" :value="item"
                    active-color="primary"></v-list-item>
            </v-list>
            <add-music></add-music>
        </v-card>
    </div>
</template>
