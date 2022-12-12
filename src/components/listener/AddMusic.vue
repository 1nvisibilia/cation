<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
    addMusicDialog: false
});

</script>

<template>
    <v-btn block @click="(state.addMusicDialog = true)">Add</v-btn>
    <v-dialog v-model="state.addMusicDialog">
        <v-card>
            
        </v-card>
    </v-dialog>
</template>