<template>
    <div class="container">
        <div v-if='userInfo' class="weui-flex justify-between align-center py-3 bg-white mt-4 px-4">
            <div class='weui-flex align-center'>
                <img bindtap="bindViewTap" class="userinfo-avatar mx-4" :src="userInfo.avatarUrl" background-size="cover"/>
                <span class="userinfo-nickname">{{userInfo.nickName}}</span>
            </div>
            <img bindtap='previewImage' class='qrcode mx-4' src='/static/images/qrcode.jpg'/>
        </div>

        <!-- <picker bindchange="tapPlayMode" value="{{index}}" range="{{mode}}"> -->
            <div class="weui-flex justify-between py-3 bg-white mt-4" @click="playModeChange">
                <div class='flex-row align-center'>
                    <i class='material-icons ml-3 mr-2 text-blue-2'>{{modeIcon[modeIndex]}}</i>
                    <span class='weight-600 text-black'>播放模式</span>
                </div>
                <span class='text-grey mx-3'>{{modeName[modeIndex]}}</span>
            </div>
        <!-- </picker> -->


        <div class="weui-flex justify-between py-3 bg-white mt-4 border-bt">
            <div class='flex-row align-center'>
                <i class='material-icons ml-3 mr-2 text-cyan-1'>zoom_out_map</i>
                <span class='weight-600 text-black'>自动全屏</span>
            </div>
            <div class="switch mx-3" :class='{"switch-open":hideTabBar}' @click="hideTabBarChange">
                <div></div>
            </div>
            <!-- <switch class='mx-3' disabled='{{showZoom==false}}' checked='{{hideTabBar}}' bindchange="hideTabBar"></switch> -->
        </div>

        <div class="weui-flex justify-between py-3 bg-white border-bt">
            <div class='flex-row align-center'>
                <i class='material-icons ml-3 mr-2 text-green-0'>select_all</i>
                <span class='weight-600 text-black'>全屏按钮</span>
            </div>
            <div class="switch mx-3" :class='{"switch-open":showZoom}' @click="showZoomChange">
                <div></div>
            </div>
            <!-- <switch class='mx-3' disabled='{{hideTabBar}}' checked='{{showZoom}}' bindchange="showZoom"></switch> -->
        </div>

        <div class="weui-flex justify-between py-3 bg-white">
            <div class='flex-row align-center'>
                <i class='material-icons ml-3 mr-2 text-blue-2'>play_for_work</i>
                <span class='weight-600 text-black'>跳转按钮</span>
            </div>
            <div class="switch mx-3" :class='{"switch-open":showAnchor}' @click="showAnchorChange">
                <div></div>
            </div>
            <!-- <switch class='mx-3' checked='{{showAnchor}}' bindchange="showAnchor"></switch> -->
        </div>

        <div v-if='userInfo' class="weui-flex py-3 bg-white mt-4" bindtap='logoutEvent'>
            <div class='flex-row align-center'>
                <i class='material-icons ml-3 mr-2 text-red-0'>settings</i>
                <span class='weight-600 text-black'>退出登录</span>
            </div>
        </div>
        <div v-else class="weui-flex py-3 bg-white mt-4" bindtap='loginEvent'>
            <div class='flex-row align-center'>
                <i class='material-icons ml-3 mr-2 text-green-0'>settings</i>
                <span class='weight-600 text-black'>微信登录</span>
            </div>
        </div>
    </div>
</template>

<style src='./account.css'>

</style>

<script src='./account.js'>
</script>