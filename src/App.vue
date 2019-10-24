<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
export default {
    data(){
        return{
            name: "",
            idea: "",
            posts: []
        };
    },
    methods: {
        createIdea(){
            // 第一引数：URL,第二引数：送りたいデータ,第三引数：詳細な設定
            axios.post(
                "https://firestore.googleapis.com/v1/projects/ideabox-8b0eb/databases/(default)/documents/idea",
                {
                    fields: {
                        name: {
                            stringValue: this.name
                        },
                        idea: {
                            stringValue: this.idea
                        }
                    }
                }
            );
            this.name = "";
            this.comment = "";
        }
    }
};
</script>

<style>
</style>
