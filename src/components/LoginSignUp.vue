<script setup lang="ts">
import Auth from '../auth';
import type { UserCredential } from '@firebase/auth';
import RTDB from '../firebase-service/database';
import { usePlaylistStore } from '../stores/playlist';

type Oauth = 'Google' | 'GitHub';

const emit = defineEmits(['LoginSignUpComplete']);
const playlistStore = usePlaylistStore();

const loginTypes = [
    { icon: 'google', name: 'Google' },
    { icon: 'facebook', name: 'Facebook' },
    { icon: 'github', name: 'GitHub' },
    { icon: 'microsoft', name: 'Microsoft' }
];

async function login(oauthType: Oauth) {
    console.log(oauthType);
    
    const result: UserCredential = await Auth.signIn[oauthType]();

    let userData = await RTDB.getUserData(result.user.uid);

    if (!userData) {
        const userName: string = (result.user.displayName || result.user.email as string);
        userData = await RTDB.createUserData(result.user.uid, userName);
    }

    console.log(userData);

    playlistStore.setPlaylist(userData.playlist || []);

    emit('LoginSignUpComplete');
}
</script>

<template>
    <div>
        <v-card width="600" class="mx-auto pa-4">
            <div class="text-h5 text-center">Login</div>
            <div class="text-body-1 text-center my-4">We currently provide third party logins from these services</div>
            <div class="d-flex justify-space-around">
                <v-btn v-for="loginType in loginTypes" icon elevation="0" :key="loginType.icon"
                    @click="login(loginType.name as Oauth)">
                    <v-icon>{{ `mdi-${loginType.icon}` }}</v-icon>
                    <v-tooltip activator="parent" location="top">{{ loginType.name }}</v-tooltip>
                </v-btn>
            </div>
        </v-card>
    </div>
</template>
