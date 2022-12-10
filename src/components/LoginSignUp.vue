<script setup lang="ts">
const loginTypes = [
    { icon: 'google', name: 'Google' },
    { icon: 'facebook', name: 'Facebook' },
    { icon: 'github', name: 'GitHub' },
    { icon: 'microsoft', name: 'Microsoft' }
];
</script>

<template>
    <div>
        <v-card width="600" class="mx-auto pa-4">
            <div class="text-h5 text-center">Login</div>
            <div class="text-body-1 text-center my-4">We currently provide third party logins from these services</div>
            <div class="d-flex justify-space-around">
                <v-btn v-for="loginType in loginTypes" icon elevation="0" :key="loginType.icon">
                    <v-icon>{{ `mdi-${loginType.icon}` }}</v-icon>
                    <v-tooltip activator="parent" location="top">{{ loginType.name }}</v-tooltip>
                </v-btn>
            </div>
        </v-card>
    </div>
</template>
