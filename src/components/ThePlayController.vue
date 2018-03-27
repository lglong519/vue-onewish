<template>
	<!--音乐控制器 -->
	
	<div v-if='currAudio[0].url' class='playcontroller' :class='{"hide":hide ,"show":data.show ,"bg-transparent":type !=="articleZH" && type !=="articleEN", "rollup":rollup}'>
		<div v-if='!rollup' class='flex-row align-center pt-2 pb-1'>
			<div class='text-white pl-2 mr-2'>{{data.currentTimeFormat}}</div>
			 <!-- <slider class='flex' bindchange="sliderChange" bindchanging='sliderChanging' value="{{currentTime}}" max='{{duration}}' block-size='12' activeColor='#5287E9' block-color='#FDE0E9' /> -->
       <input type="range" name="slider" id="slider" class="flex" :style="'background: linear-gradient(to right, #059cfa '+range+'%, white '+range+'%) no-repeat;'" min='0' :max="data.duration" v-model="data.currentTime" @input="sliderChanging()" @change="sliderChange()">
			<div class='text-white pr-2  ml-2'>{{data.durationFormat}}</div>
		</div>
		<div class='text-center play-btn flex-row align-center'>
			<div class='aside pl-2'>
				<i class='material-icons text-24 text-grey' @click='playModeChange'>{{data.modeIcon[data.modeIndex]}}</i>
			</div>
			<div class='flex flex-row align-center justify-center'>
				<i class='material-icons text-40' bindtap='skip_previous'>skip_previous</i>
				<i class='material-icons text-40' @click='playBackward'>fast_rewind</i>
				<i class='material-icons text-50 mx-1' @click='playControl'>{{onPlay?"pause_circle_outline":"play_circle_outline"}}</i>
				<i class='material-icons text-40' @click='playForward'>fast_forward</i>
				<i class='material-icons text-40' bindtap='skip_next'>skip_next</i>
			</div>
			<div class='aside pr-2'>
				<i class='material-icons text-30' @click='playerRollup'>more_vert</i>
			</div>
		</div>
	</div>
</template>


<script>
import Funs from "../utils/funs";
export default {
  props: ["data"],
  data() {
    return {
      hide: false,
      rollup: false,
      modeTimer: null
    };
  },
  computed: {
    currAudio() {
      return this.$store.getters.currAudio;
    },
    onPlay() {
      return this.$store.getters.onPlay;
    },
    type() {
      return this.$store.getters.type;
    },
    Audio() {
      return this.$store.getters.Audio;
    },
    range() {
      return this.data.currentTime / this.data.duration * 100;
    },
    playModeLib() {
      return this.$store.getters.playModeLib;
    }
  },
  methods: {
    playControl: Funs.playControl,
    playerRollup() {
      this.rollup = !this.rollup;
    },
    //后退5s
    playBackward() {
      this.Audio.currentTime = this.data.currentTime - 5;
    },
    playForward() {
      this.Audio.currentTime = this.data.currentTime + 5;
    },
    sliderChanging() {
      console.log("Changing");
      this.$emit("sliderChanging", 1);
    },
    sliderChange() {
      console.log("changed");
      this.$emit("sliderChange", this.data.currentTime);
    },
    playModeChange() {
      this.modeTimer && clearTimeout(this.modeTimer);
      if (this.data.modeIndex < this.playModeLib.list.length - 1) {
        var index = this.data.modeIndex + 1;
      } else {
        var index = 0;
      }

      this.$emit("modeIndexEvent", index);
      this.$emit("showToastEvent", true);

      this.modeTimer = setTimeout(() => {
        this.$emit("showToastEvent", false);
      }, 2000);
      localStorage.setItem(
        "playMode",
        this.playModeLib.mode[this.data.modeIndex]
      );
      localStorage.removeItem("randomList");
      if (this.onPlay) {
        Funs.createRandomIndex(this.$store.getters);
      }
    }
  },
  activated() {
    console.log("this.data", this.data);
  }
};
</script>


<style lang="scss">
.playcontroller {
  position: fixed;
  bottom: -100%;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
  transition: all 0.6s;
  .aside {
    flex-basis: 40px;
  }
  &.bg-transparent {
    background-color: transparent;
  }

  input[type="range"] {
    -webkit-appearance: none;
    border-radius: 10px;

    &:focus {
      outline: none;
    }
  }

  input[type="range"]::-webkit-slider-runnable-track {
    height: 1.5px;
    // background-color: white;
    // #5287E9
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 10px;
    width: 10px;
    margin-top: -4px;
    background: #fde0e9;
    border-radius: 50%;
  }
}
.play-btn {
  margin-bottom: 5px;
}

.play-btn i:not(.text-green-0) {
  color: #fff;
}

.play-btn .text-grey {
  opacity: 0.6;
}

.play-btn i:active {
  color: #83c44e;
}

.rollup {
  left: -90%;
  border-radius: 50px;
}

.hide {
  display: none;
}

.show {
  bottom: 50px;
}
</style>