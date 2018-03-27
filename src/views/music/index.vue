<template>
    <div class="page">
        <div v-if='audioType =="music"' class='banner flex-row align-center pl-4'>
            <img class='ml-4' src='http://p3.music.126.net/_ybcEpYdUVxuCct1yQwpyg==/109951163093420045.jpg?param=200y200' />
            <span class='ml-4 pt-4 text-20 self-start'>我已见过银河<br>但我只爱一颗星</span>
            <a :href="'#id'+index" class="text-white">
            <i class='material-icons headset'>headset</i>
            </a>
        </div>
        <div v-if='audioType =="classical"' class='banner flex-row align-center pl-4 classical'>
            <img class='ml-4' src='http://p4.music.126.net/EiXMkopL2JhN45fbUG8zeA==/18497084116263735.jpg?param=200y200' />
            <span class='ml-4 pt-4 text-20 self-start'>不苟活而生<br>唯信念而死</span>
            <i class='material-icons headset'>headset</i>
        </div>
        <div v-for='(item,i) in audioList' :key="item[0].title" class='flex-row justify-between align-center text-center bg-white py-1'  :id='"id"+i'>
            <i v-if='onPlay && type==item[0].type && index==i' class='material-icons series text-red-1'>volume_up</i>
            <div v-else class='series'>{{i+1}}</div>
            <div class="flex flex-row justify-between align-center border-bt">
                <div class="flex flex-column align-start my-2" @click='switchToPlay' :data-audio-type='item[0].type' :data-audio-index='i'>
                    <span class="mb-1 weight-700">{{item[0].title}}</span>
                    <span class="text-grey text-12">{{item[0].author}}</span>
                </div>
                <i @click='playControl' class='material-icons pr-4 text-grey' :data-audio-type='item[0].type' :data-audio-index='i'>{{onPlay && type==item[0].type && index==i?'pause_circle_outline':'play_circle_outline' }}</i>
            </div>
        </div>
    </div>
</template>

<style src='./music.css'>

</style>

<script src='./music.js'>
</script>