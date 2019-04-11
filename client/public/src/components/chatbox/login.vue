<template>
    <div class="login-page">
        <!-- <chatScreen class="chat-screen" v-if="isChatActive" :userName="username"></chatScreen> -->
        <form class="login-form" method="" action="" @submit.prevent="logingIn">
            USERNAME: <input type="text" class="username-input" v-model="username"><br>
            PASSWORD: <input type="text" class="password-input" v-model="password"><br>
            <input type="submit" value="Log in">
        </form>
        <div class="registerLink"><div @click="registerPageLink"> Register Here</div></div>
    </div>
</template>

<script>
// import chatScreen from './chatScreen';
import router from '@/router';

export default {
    props: {
        userName1: {
            type: String,
            required: false,
        },
    },
    data() {
        return {
            username: '',
            password: '',
            isChatActive: false,
        };
    },
    mounted() {
        if (this.userName1) {
            this.username = this.userName1;
        }
    },
    methods: {
        logingIn() {
            console.log('hello');
            this.isChatActive = true;
             var func =function(response) {
                 console.log(response, this);
                //  if (response.)
                router.push({ path: response.data, query: { 'userName': this.username } });
             }; 
            this.$http.post('http://localhost:3000/api/posts/login', {
                'username': this.username,
                'password': this.password,
            }).then(func.bind(this)).catch((err) => {
                console.log(err);
            });
            // using bind above to able to use this of this.username otherwise use arrow function in 
            // then or make func an arrow function
        },
        registerPageLink() {
            router.push({ path: "register"});
        }
    },
    components: {
        // chatScreen,
    },
    
}
</script>

<style lang="scss" scoped>
@import "./variables.scss";
.login-page {
    .login-form {
        z-index: 1;
    }
    .chat-screen {
        z-index: 2;
    }
    .username-input {
        border: 1px solid black;
    }
    .password-input {
        border: 1px solid black;
        margin: 10px 10px;
    }
    .registerLink {
        position: relative;
        width: auto;
        height: 100 * $s;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;


    }
}
</style>
