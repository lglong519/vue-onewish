<template>
    <div class="page">
        <div class=" weui-cells_after-title">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <div class='text-center text-orange-3 text-20'>文章列表</div>
                </div>
            </div>
            <div v-for='(item,i) in articles' :key="item[0].title" class="weui-cell weui-cell_access" v-bind:class="{'bg-orange-0':index===i, 'text-green-0':onPlay && type==item[0].type && index==i}" @click='switchToPlay' :data-audio-index='i' :data-audio-type='item[0].type'>
                <div class="weui-cell__bd">
                    <div style="display: inline-block; vertical-align: middle">{{item[0].title}}</div>
                    <div v-if='item[0].author' class='text-grey text-12'>作者:{{item[0].author}}</div>
                </div>
                <!--箭头  -->
                <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </div>
            <div class="weui-cell weui-cell_access"></div>
        </div>
        <the-footer :path='path'></the-footer>
    </div>
</template>

<style src='./articles.css'>

</style>

<script src='./articles.js'>
</script>
