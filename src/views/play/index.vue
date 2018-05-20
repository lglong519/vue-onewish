<template>
	<div class="play">
		<i v-if='showZoom' class='material-icons text-30 text-grey zoom' :class='{"text-white":type !=="articleZH" && type !=="articleEN"}'
		 @click='zoom'>{{hideTabBar?"select_all":"zoom_out_map"}}</i>

		<!--文章  -->
		<div class="page" v-if='type=="articleZH" || type=="articleEN"'>
			<!-- 跳转 -->
			<a href="#currentPart" class="text-grey">
				<i v-if='currAudio[0].url && showAnchor' class='material-icons anchor text-30' bindtap='toSection'>play_for_work</i>
			</a>
			<div class="page__bd reset-bg">
				<div v-for='art in currAudio' :key='art.title' class="weui-article">
					<div class="weui-article__section">
						<!--标题  -->
						<div class="weui-article__title text-orange-3 text-18 mb-2">
							{{art.title}}
							<template v-if='currAudio[0].url'>
								<i v-if='onPlay' class='material-icons text-blue-0' @click='playControl' :data-art-time='art.time'>volume_up</i>
								<i v-else class='material-icons text-grey-1' @click='playControl' :data-art-time='art.time'>volume_down</i>
							</template>
						</div>
						<!--内容  -->
						<div class="weui-article__section mb-2" v-for='(item,j) in art.sections' :key='j'>
							<!--时间  -->
							<div v-if='item.time' :id='currPart==item.time? "currentPart":""' class='weui-article__h3' :class='currPart==item.time && onPlay?"text-blue-2":"text-grey-6"'>
								{{item.time}}
								<i class='material-icons' :class='currPart==item.time && onPlay?"text-green-0":"text-grey-1"' @click='playSection' :data-art-id='art.id'
								 :data-art-url='art.url' :data-art-time='item.time'>{{currPart==item.time && onPlay && currentTimeFormat[4]%2==0 ?"volume_mute":"volume_down"}}</i>
							</div>
							<!--文本  -->
							<div class="weui-article__p text-justify" :class="item.time && currPart==item.time && 'bg-cyan-0'">
								{{item.chapter}}
							</div>

							<!--译文  -->
							<template v-if='item.trans'>
								<div class='weui-article__h3 text-blue-3 flex-row align-center' @click='showTransition' :data-show-trans-index='j'>
									<i class='material-icons'>g_translate</i>
									<text class='trans-down ml-1' :class='{"trans-up" : showTrans==art.title && showTransIndex==j}'></text>
								</div>
								<!--文本  -->
								<div v-if='showTrans==art.title && showTransIndex==j' class="weui-article__p text-justify text-grey">
									{{item.trans}}
								</div>
							</template>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--music  -->
		<div v-else class="page page-music flex-column align-center">
			<div class='z-index disc-wrapper rotation' :class='{"animation-paused":!show || !onPlay }' @click='playControl'>
				<img src='../../assets/images/disc.png' class='disc' />
				<img :src='currAudio[0].image || "/static/images/2018fly.jpg"' class='disc-image' />
			</div>
			<div class='z-index mt-4 text-white'>{{currAudio[0].title}}</div>
			<div class='z-index mt-4 text-white'>{{currAudio[0].author}}</div>
			<img :src='currAudio[0].image || "/static/images/stars-128.jpg"' class='bg-music blur' />
		</div>
		<div v-if='showToast' class='playmode-toast'>
			<div class='mode-name'>{{modeName[modeIndex]}}</div>
		</div>
		<ThePlayController @showToastEvent='showToastEvent' @modeIndexEvent='modeIndexEvent' @sliderChange='sliderChange' @sliderChanging='sliderChanging' :data='{currentTime,show,currentTimeFormat,durationFormat,duration,modeIcon,modeIndex,hideTabBar}'></ThePlayController>
	</div>
</template>

<style src='./play.css'>

</style>

<script src='./play.js'>
</script>