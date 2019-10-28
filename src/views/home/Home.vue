<template>
    <div class="">
        <h3 class="text-center">Idea Box</h3>
        <h6 class="position-relative on-border py-4"><span>Z-αntiphon</span></h6>
        <div class="col-12 col-md-6 mx-auto align-left card py-3">
        <p class="text-center">このIdea Boxを使うのは</p>
            <ul class="">
                <li>新しく学習した言語で何か作って見たけど思い浮かばない</li>
                <li>こんなサービス作ってみたら面白そう</li>
                <li>プログラミング以外で何か企画したい</li>
                <li>ジアンにこれがあればいいな</li>
            </ul>
            <p class="text-center">...そんな時！</p>
            <p class="text-center">沢山のIdeaをお待ちしております！！！</p>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.on-border {
    position: relative;
    text-align: center;
}
.on-border span {
    position: relative;
    z-index: 2;
    display: inline-block;
    margin: 0 2.5em;
    padding: 0 1em;
    background-color: #fff;
    text-align: left;
}
.on-border::before {
    position: absolute;
    top: 50%;
    z-index: 1;
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background-color: #000;
}

</style>