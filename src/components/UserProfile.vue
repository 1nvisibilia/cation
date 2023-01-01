<script setup lang="ts">
import { computed } from 'vue';
import { useCentralStore } from '../stores/central';
import Auth from '../auth';

const centralStore = useCentralStore();
const imageUrl = computed(() => {
    return centralStore.authUser.avatarUrl || undefined;
});

async function logOff() {    
    await Auth.signOff();
    centralStore.userDestroy();
}

</script>

<template>
    <v-card width="700" height="500" class="mx-auto mt-16 d-flex pa-8">
        <div class="d-flex align-center">
            <v-img :src="imageUrl" aspect-ratio="1" width="150"></v-img>
        </div>
        <v-divider vertical class="mx-8"></v-divider>
        <div class="flex-grow-1 d-flex flex-column">
            <div>
                <v-text-field variant="underlined" readonly label="Username"
                    :model-value="centralStore.user.userName"></v-text-field>
            </div>

            <div class="d-flex align-right mt-auto">
                <v-btn @click="logOff" class="ml-auto">Sign Out</v-btn>
            </div>
        </div>
    </v-card>
</template>
