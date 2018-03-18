<template>
   <div class="flex-row align-center justify-between the-footer text-grey">
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
        this.$router.push({ path: `/${className}` });
      }
    }
  }
};
</script>

<style lang="scss">
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
  }
  .index {
    &.active {
      color: #2196f3;
    }
    &:active {
      color: #2196f3;
      background-color: lighten(#2196f3, 30%);
      border-top-color: lighten(#2196f3, 30%);
    }
  }
  .music {
    &.active {
      color: #8a635c;
    }
    &:active {
      background-color: lighten(#8a635c, 45%);
    }
  }
  .articles {
    &.active {
      color: #f1b140;
    }
    &:active {
      background-color: lighten(#f1b140, 30%);
    }
  }
  .play {
    &.active {
      color: #83c44e;
    }
    &:active {
      background-color: lighten(#83c44e, 30%);
    }
  }
  .account {
    &.active {
      color: #3d83f8;
    }
    &:active {
      background-color: lighten(#3d83f8, 30%);
    }
  }
}
</style>
