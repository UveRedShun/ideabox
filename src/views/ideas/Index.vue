<template>
    <div class="container-fluid">
        <div class="col-12 col-md-8 mx-sm-auto">
            <div class="row">
                <div class="col-12 col-md-6 text-center text-md-left">
                    <h5 class="mt-5 mb-3 my-md-3"><strong>アイデアを提案する</strong></h5>
                    <label for ="name">ニックネーム：</label>
                    <br>
                    <input id ="name" type="text" v-model="name">
                    <br><br>
                    <label for="idea">アイデア：</label>
                    <br>
                    <textarea id="idea" v-model="idea"></textarea>
                    <br><br>
                    <button @click="createIdea">アイデアを提案する</button>
                </div>

                <div class="col-12 col-md-6 text-center text-md-left">
                    <h5 class="my-3"><strong>アイデア一覧</strong></h5>
                    <div>
                        <div class="card my-4" v-for="post in posts" :key="post.name">
                            <h6>Name: {{ post.fields.name.stringValue}}</h6>
                            <p>Idea: {{ post.fields.idea.stringValue}}</p>
                            <div v-if="userStarCounts.includes(post.post_id)">
                                <p v-show="likedDrawer" color="text-white" @click="deleteStar(post.post_id)"><i class="fas fa-heart pink"></i></p>
                                <p v-show="!likedDrawer" color="text-white" @click="addStar(post.post_id)"><i class="fas fa-heart pink"></i></p>
                            </div>
                            <div v-else>
                                <p v-show="likedDrawer" color="text-white" @click="addStar(post.post_id)"><i class="fas fa-heart pink"></i></p>
                                <p v-show="!likedDrawer" color="text-white" @click="deleteStar(post.post_id)"><i class="fas fa-heart pink"></i></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* axios install */
import axios from "axios";
import firebase from "firebase";

export default {
    data(){
        return{
            name: '',
            idea: '',
            posts: [],
            starCount: 0,
            userStarCounts: [],
            likedDrawer: true
        }
    },
    computed: {
        idToken() {
            return this.$store.getters.idToken;
        }
    },
    created(){

        axios
        .get("/ideas",{
                headers: {
                    Authorization: `Bearer ${this.idToken}`
                }
            })
        .then(response => {
            this.posts = response.data.documents;
        }),

        firebase.firestore().collection(`users/${this.$store.getters.uid}/starCount`).doc('starCount')
        .get().then(doc => {
            this.userStarCounts = (doc.data().star_post_id)
        });

    },
    methods: {
        createIdea(){
            /*第一引数：URL,第二引数：送りたいデータ,第三引数：詳細な設定 */
            axios.post(
                "/ideas",
                {
                    fields: {
                        name: {
                            stringValue: this.name
                        },
                        idea: {
                            stringValue: this.idea
                        }
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.idToken}`
                    },
                }
            )
            this.name = "";
            this.idea = "";
        },

        addStar(postId){
            this.addStarCount(postId)
            this.starCount ++
            this.likeDrawer = !this.likeDrawer
        },

        deleteStar(postId){
            if(confirm('削除しますか？')){
                this.deleteStarCount(postId)
                this.starCount --
                this.likeDrawer = !this.likeDrawer
            }else{
                alert("削除は取り消されました");
            }
        },
    }
};
</script>

<style>
.pink{
    color: palevioletred;
}

</style>