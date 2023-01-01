<script setup lang="ts">
import { reactive } from 'vue';
import LoginSignUp from './components/LoginSignUp.vue';
import ListenerPanel from './components/listener/ListenerPanel.vue';
import UserProfile from './components/UserProfile.vue';
import AuthRequired from './components/AuthRequired.vue';
import { useCentralStore } from './stores/central';
// import { RouterLink, RouterView } from 'vue-router';
// import HelloWorld from './components/HelloWorld.vue';

const centralStore = useCentralStore();
const state = reactive({
    currentPage: 'Player',
    drawer: false
});

const pages = [
    { text: 'Player', icon: 'mdi-music' },
    { text: 'Profile', icon: 'mdi-account-circle-outline' }
];

function switchPage(destPage: string) {
    state.currentPage = destPage;
    state.drawer = false;
}
</script>

<template>
    <v-app>
        <div v-if="!centralStore.authUser.userId" class="d-flex flex-column justify-center" style="height: 100vh">
            <login-sign-up></login-sign-up>
        </div>
        <template v-else>
            <v-app-bar title="Application">
                <template v-slot:prepend>
                    <v-app-bar-nav-icon variant="text" @click="(state.drawer = !state.drawer)"></v-app-bar-nav-icon>
                </template>

                <template v-slot:append>
                    <v-btn icon="mdi-account-circle-outline" @click="switchPage('Profile')"></v-btn>
                    <v-btn icon="mdi-dots-vertical"></v-btn>
                </template>
            </v-app-bar>

            <v-navigation-drawer v-model="state.drawer" temporary>
                <v-list>
                    <v-list-item v-for="(page, i) in pages" :key="i" :value="page" @click="switchPage(page.text)">
                        {{ page.text }}
                        <template v-slot:prepend>
                            <v-icon>{{ page.icon }}</v-icon>
                        </template>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-main>
                <listener-panel v-if="state.currentPage === 'Player'"></listener-panel>
                <user-profile v-if="state.currentPage === 'Profile'"></user-profile>
            </v-main>
            <!-- <auth-required /> -->
        </template>
    </v-app>

</template>

<style scoped>

</style>
