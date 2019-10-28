<template>
    <div class="container-fluid">
        <div class="text-center">
            <h3 class="text-center">新規登録</h3>
            <label for ="email">Email：</label>
            <input id ="email" type="text" v-model="email">
            <br><br>
            <label for="password">Password：</label>
            <input id="password" v-model="password">
            <br><br>
            <button @click="register">新規登録する</button>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return{
            email: this.email,
            password: this.password,
        };
    },
    methods: {
        register(){
            this.$store.dispatch('register', {
                email: this.email,
                password: this.password,
            });
            this.email = "";
            this.password = "";
        }
    }
};
</script>