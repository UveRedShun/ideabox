<template>
<div>
    <div>
        <h3>アイデア一覧</h3>
            <div>
            <br>
            <table>
                <thead>
                    <tr>
                        <td>ニックネーム</td>
                        <td>アイデア</td>
                    </tr>
                </thead>
                <tbody v-for="post in posts" :key="post.name">
                    <td>{{ post.fields.name.stringValue}}</td>
                    <td>{{ post.fields.idea.stringValue}}</td>
                </tbody>
            </table>
        </div>
    </div>
    <h3>アイデアを投稿する</h3>
    <label for ="name">ニックネーム</label>
    <input id ="name" type="text" v-model="name">
    <br><br>
    <label for="idea">アイデア：</label>
    <textarea id="idea" v-model="idea"></textarea>
    <br><br>
    <button @click="createIdea">アイデアを提案する</button>
</div>
</template>

<script>
/* axios install */
import axios from "axios";
export default {
    data(){
        return{
            name: "",
            idea: "",
            posts: []
        };
    },
    created(){
        axios.get(
            "https://firestore.googleapis.com/v1/projects/ideabox-1287b/databases/(default)/documents/ideas"
        )
        .then(response => {
            this.posts = response.data.documents;
        });
    },
    methods: {
        createIdea(){
            /*第一引数：URL,第二引数：送りたいデータ,第三引数：詳細な設定 */
            axios.post(
                "https://firestore.googleapis.com/v1/projects/ideabox-1287b/databases/(default)/documents/ideas",
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
            )
            .then(response => {
                console.log(response);
            })
            .then(error => {
                console.log(error);
            })
            this.name = "";
            this.idea = "";
        }
    }
};
</script>

<style>

</style>