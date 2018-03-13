<template>
    <div class="page">
        <div>
            <img src='../../assets/images/2018fly.jpg' class='banner-img' />
        </div>
        <div class='flex-row  text-center bg-white py-4'>
            <div class='xs3 flex-column ' bindtap='toArticles' data-type='articleZH'>
                <i class='material-icons text-orange-3 text-30'>import_contacts</i>
                <span>文章</span>
            </div>
            <div class='xs3 flex-column' bindtap='toMusic' data-type='music'>
                <i class='material-icons text-green-0 text-30'>audiotrack</i>
                <span>歌单</span>
            </div>
            <div class='xs3 flex-column' bindtap='toMusic' data-type='classical'>
                <i class='material-icons text-blue-1 text-30'>straighten</i>
                <span>轻音乐</span>
            </div>
            <div class='xs3 flex-column' bindtap='toArticles' data-type='articleEN'>
                <i class='material-icons text-red-0 text-30'>sort_by_alpha</i>
                <span>Articles</span>
            </div>
        </div>
    </div>
</template>

// <script src='./index.js'></script>
<style src='./index.css'></style>


<script>
</script>