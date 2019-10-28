<template>
    <div>
        <header class="container-fluid bg-dark py-2">
            <div class="col-12">
                <nav class="navbar culturepage-navbar justify-content-center">
                    <ul class="nav culturepage-nav-list nav-img">
                        <template v-if = "isAuthenticated">
                            <li><router-link to ="/ideas" class="text-white mx-3">IdeaBox</router-link></li>
                            <li><span class="text-white btn-header" @click="logout">Logout</span></li>
                        </template>
                        <template v-if = "!isAuthenticated">
                            <li><router-link to ="/" class="text-white">Home</router-link></li>
                            <li class="mx-3"><router-link to ="/login" class="text-white">ログイン</router-link></li>
                            <li><router-link to ="/registration" class="text-white">新規登録</router-link></li>
                        </template>
                    </ul>
                </nav>
            </div>
        </header>
        <div class="justify-content-center text-center">
            <img alt="Vue logo" src="./assets/logo.png">
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    computed: {
        isAuthenticated() {
            return this.$store.getters.idToken !== null;
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
        }
    }
};
</script>

<style>

.btn-header{
    cursor: pointer;
}
</style>
