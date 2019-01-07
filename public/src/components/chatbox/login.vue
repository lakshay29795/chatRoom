<template>
    <div class="login-page">
        <!-- <chatScreen class="chat-screen" v-if="isChatActive" :userName="username"></chatScreen -->
        <form class="login-form" action="" @submit.prevent="logingIn">
            USERNAME: <input type="text" v-model="username">
            <input type="submit" value="Log in">
        </form>
    </div>
</template>

<script>
import chatScreen from './chatScreen';
import router from '@/router';

export default {
    data() {
        return {
            username: '',
            isChatActive: false,
        };
    },
    methods: {
        logingIn() {
            this.isChatActive = true;
                router.push({ path: "chatscreen", query: { 'userName': this.username } });
            
        }
    },
    components: {
        chatScreen,
    },
    
}
</script>

<style lang="scss" scoped>
.login-page {
    .login-form {
        z-index: 1;
    }
    .chat-screen {
        z-index: 2;
    }
}
</style>
