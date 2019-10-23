<template>
<div>
    <div>
        <h3>アイデア一覧</h3>
    </div>
    <h3>Ideas index</h3>
    <h3>アイデアを投稿する</h3>
    <label for ="name">ニックネーム</label>
    <input id ="name" type="text" v-model="name">
    <br><br>
    <label for="comment">コメント：</label>
    <textarea id="comment" v-model="comment"></textarea>
    <br><br>
    <button @click="createComment">コメントをサーバーに送る</button>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>