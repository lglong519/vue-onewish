//index.js
// import { switchToPlay } from '../../utils/funs.js';
import classical from '../../../static/libs/classical'
import music from '../../../static/libs/music'
const audioList = {
  classical,
  music
}

export default {
  data() {
    return {
      audioList: Array,
      index: Number,
      onPlay: Boolean,
      audioType: String
    }
  },
  computed: {

  },
  methods: {
    switchToPlay() {
    },
    updateAudioList() {
      let type = localStorage.getItem('type');
      if (/classical|music/ig.test(type)) {
        this.audioType = type;
      } else {
        this.audioType = localStorage.getItem('musicType');
      }
      this.audioList = audioList[this.audioType];
    }
  },
  activated() {
    console.log('articles', "activated");
    this.updateAudioList();
  },
  deactivated() {
    console.log('articles', "deactivated");
  },
  beforeCreate() {
    console.log('articles', "beforeCreates");
  },
  created() {
    console.log('articles', "created");

  },
  beforeMount() {
    console.log('articles', "beforeMount");
  },
  mounted() {
    console.log('articles', "mounted");

  },
  beforeUpdate() {
    console.log('articles', "beforeUpdate");
  },
  updated() {
    console.log('articles', "updated");
  },
  beforeDestroy() {
    console.log('articles', "beforeDestroy");
  }
}
/*

Page({
  data: {
    audioType: null
  },
  switchToPlay: app.Funs.switchToPlay,
  onShow: function () {
    this.setData({
      audioType: localStorage.getItem('audioType') == 'music' && 'music' || 'classical'
    });
    wx.setTabBarStyle({
      selectedColor: '#8a635c',
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: localStorage.getItem('audioType') == 'music' ? '#514e5a' : '#8a635c',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    this.setData({
      audioList: localStorage.getItem('audioType') == 'music' ? app.Funs.music : app.Funs.classical,
      type: app.data.type,
      index: app.data.index,
      onPlay: app.data.onPlay
    });
  },
  playControl(e) {
    let dataset = e.currentTarget.dataset;
    if (app.data.type == dataset.audioType && app.data.index == dataset.audioIndex) {
      if (this.data.onPlay) {
        app.data.Audio.pause();
        app.data.onPlay = false;
        this.setData({
          onPlay: false,
          index: app.data.index,
          type: app.data.type
        });
      } else {
        app.data.Audio.play();
        this.setData({
          onPlay: true,
          index: app.data.index,
          type: app.data.type
        });
      }
      return;
    }
    app.Funs.resetData(dataset.audioType, dataset.audioIndex);
    if (app.data.onPlay) {
      app.data.Audio.play();
      this.setData({
        onPlay: true,
        index: app.data.index,
        type: app.data.type
      });
    } else {
      app.data.Audio.pause();
      app.data.onPlay = false;
      this.setData({
        onPlay: false,
        index: app.data.index,
        type: app.data.type
      });
    }
  },
  onPullDownRefresh: function () {
    this.onShow();
    wx.stopPullDownRefresh()
  }
})
*/