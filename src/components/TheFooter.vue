<template>
	<div class="flex-row align-center justify-between the-footer text-grey bg-white" 
  :class="{'bg-articles':path=='articles'}">
		<div class="index" :class="{active:path=='index'}" @click="switchTo($event)">
			<i class='material-icons'>home</i>
			<span>主页</span>
		</div>
		<div class="music" :class="{active:path=='music'}" @click="switchTo($event)">
			<i class='material-icons'>queue_music</i>
			<span>音乐</span>
		</div>
		<div class="articles" :class="{active:path=='articles'}" @click="switchTo($event)">
			<i class='material-icons'>import_contacts</i>
			<span>文章</span>
		</div>
		<div class="play" :class="{active:path=='play'}" @click="switchTo($event)">
			<i class='material-icons'>equalizer</i>
			<span>播放</span>
		</div>
		<div class="account" :class="{active:path=='account'}" @click="switchTo($event)">
			<i class='material-icons'>perm_identity</i>
			<span>我的</span>
		</div>
	</div>
</template>

<script>
export default {
  props: ["path"],
  methods: {
    switchTo(e) {
      let className = e.currentTarget.className.trim();
      if (className.indexOf("active") === -1) {
        this.$router.push({
          path: `/${className}`
        });
        this.$emit("changePath", className);
      }
    }
  }
};
</script>

<style lang="scss">
$color-blue: #2196f3;
$color-brown: #8a635c;
$color-orange: #f1b140;
$color-green: #83c44e;
$color-sky: #3d83f8;
.bg-articles {
  background-color: #ebe1d5;
}
.the-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  > div {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 3px 0;
    border-top: 1px solid #e0e0e0;
    transition: font-size 0.6s;
    &:active > i {
      font-size: 20px;
      margin-top: 4px;
    }
  }
  .index {
    &.active {
      color: $color-blue;
    }
    &:active {
      color: $color-blue;
      background-color: lighten($color-blue, 30%);
      border-top-color: lighten($color-blue, 30%);
    }
  }
  .music {
    &.active {
      color: $color-brown;
    }
    &:active {
      color: $color-brown;
      border-top-color: lighten($color-brown, 30%);
      background-color: lighten($color-brown, 45%);
    }
  }
  .articles {
    &.active {
      color: $color-orange;
    }
    &:active {
      color: $color-orange;
      border-top-color: lighten($color-orange, 30%);
      background-color: lighten($color-orange, 30%);
    }
  }
  .play {
    &.active {
      color: $color-green;
    }
    &:active {
      color: $color-green;
      border-top-color: lighten($color-green, 30%);
      background-color: lighten($color-green, 30%);
    }
  }
  .account {
    &.active {
      color: $color-sky;
    }
    &:active {
      color: $color-sky;
      border-top-color: lighten($color-sky, 30%);
      background-color: lighten($color-sky, 30%);
    }
  }
}
</style>
