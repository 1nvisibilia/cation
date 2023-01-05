<script setup lang="ts">
import Auth from '../auth';
import RTDB from '../firebase-service/database';
import { useCentralStore } from '../stores/central';
import type { AuthData } from '../firebase-service/types';

type Oauth = 'Google' | 'GitHub' | 'Facebook';

const emit = defineEmits(['LoginSignUpComplete']);
const centralStore = useCentralStore();

const loginTypes = [
    { icon: 'google', name: 'Google' },
    { icon: 'facebook', name: 'Facebook' },
    { icon: 'github', name: 'GitHub' },
    // { icon: 'microsoft', name: 'Microsoft' }
];

async function login(oauthType: Oauth) {
    const result: AuthData = await Auth.signIn[oauthType]();

    let userData = await RTDB.getUserData(result.id);

    if (!userData) {
        const userName: string = result.name || 'new user name';
        userData = await RTDB.createUserData(result.id, userName);
    }

    centralStore.userInit(userData, result);

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
