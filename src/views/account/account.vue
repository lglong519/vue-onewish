<template>
    <view class="container">
        <view wx:if='{{userInfo}}' class="weui-flex justify-between align-center py-3 bg-white mt-4 px-4">
            <view class='weui-flex align-center'>
                <image bindtap="bindViewTap" class="userinfo-avatar mx-4" src="{{userInfo.avatarUrl}}" background-size="cover"></image>
                <text class="userinfo-nickname">{{userInfo.nickName}}</text>
            </view>
            <image bindtap='previewImage' class='qrcode mx-4' src='../../public/images/qrcode.jpg'></image>
        </view>

        <picker bindchange="tapPlayMode" value="{{index}}" range="{{mode}}">
            <view class="weui-flex justify-between py-3 bg-white  mt-4 border-bt">
                <view>
                    <icon class='material-icons ml-3 mr-2 text-blue-2'>{{modeIcon[index]}}</icon>
                    <text class='weight-600 text-black'>播放模式</text>
                </view>
                <text class='text-grey mx-3'>{{mode[index]}}</text>
            </view>
        </picker>

        <view class="weui-flex justify-between py-3 bg-white">
            <view>
                <icon class='material-icons ml-3 mr-2 text-orange-3'>phonelink_ring</icon>
                <text class='weight-600 text-black'>后台播放</text>
            </view>
            <switch class='mx-3' checked='{{audioBackstage}}' bindchange="audioBackstageChange"></switch>
        </view>

        <view class="weui-flex justify-between py-3 bg-white mt-4 border-bt">
            <view>
                <icon class='material-icons ml-3 mr-2 text-cyan-1'>zoom_out_map</icon>
                <text class='weight-600 text-black'>自动全屏</text>
            </view>
            <switch class='mx-3' disabled='{{showZoom==false}}' checked='{{hideTabBar}}' bindchange="hideTabBar"></switch>
        </view>

        <view class="weui-flex justify-between py-3 bg-white border-bt">
            <view>
                <icon class='material-icons ml-3 mr-2 text-green-0'>select_all</icon>
                <text class='weight-600 text-black'>全屏按钮</text>
            </view>
            <switch class='mx-3' disabled='{{hideTabBar}}' checked='{{showZoom}}' bindchange="showZoom"></switch>
        </view>

        <view class="weui-flex justify-between py-3 bg-white">
            <view>
                <icon class='material-icons ml-3 mr-2 text-blue-2'>play_for_work</icon>
                <text class='weight-600 text-black'>跳转按钮</text>
            </view>
            <switch class='mx-3' checked='{{showAnchor}}' bindchange="showAnchor"></switch>
        </view>



        <view wx:if='{{userInfo}}' class="weui-flex py-3 bg-white mt-4" bindtap='logoutEvent'>
            <view>
                <icon class='material-icons ml-3 mr-2 text-red-0'>settings</icon>
                <text class='weight-600 text-black'>退出登录</text>
            </view>
        </view>
        <view wx:else class="weui-flex py-3 bg-white mt-4" bindtap='loginEvent'>
            <view>
                <icon class='material-icons ml-3 mr-2 text-green-0'>settings</icon>
                <text class='weight-600 text-black'>微信登录</text>
            </view>
        </view>
    </view>
</template>