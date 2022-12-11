<script setup lang="ts">
import { reactive } from 'vue';
import LoginSignUp from './components/LoginSignUp.vue';
import ListenerPanel from './components/listener/ListenerPanel.vue';
// import { RouterLink, RouterView } from 'vue-router';
// import HelloWorld from './components/HelloWorld.vue';
const state = reactive({
    drawer: false,
    loginPopup: false
});
</script>

<template>
    <v-app>
        <v-app-bar title="Application">
            <template v-slot:prepend>
                <v-app-bar-nav-icon variant="text" @click="(state.drawer = !state.drawer)"></v-app-bar-nav-icon>
            </template>

            <template v-slot:append>
                <v-btn icon="mdi-account-circle-outline" @click="(state.loginPopup = !state.loginPopup)"></v-btn>
                <v-btn icon="mdi-dots-vertical"></v-btn>
            </template>
        </v-app-bar>

        <v-navigation-drawer v-model="state.drawer" temporary>
            test
        </v-navigation-drawer>

        <v-main>
            <!-- <div class="text-h1 pa-4" style="text-align: center">Cation</div>
            <v-file-input prepend-icon="" prepend-inner-icon="mdi-paperclip" label="Your Audio File"
                variant="underlined"></v-file-input>
            <audio src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" controls></audio> -->
            <listener-panel></listener-panel>
        </v-main>

        <v-dialog v-model="state.loginPopup">
            <login-sign-up></login-sign-up>
        </v-dialog>
    </v-app>

</template>

<style scoped>
</style>
