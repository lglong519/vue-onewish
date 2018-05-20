// index.js
import Funs from '../../utils/funs';
const audioList = {
	classical: Funs.classical,
	music: Funs.music
};

export default {
	data () {
		return {
			audioList: Array,
			audioType: String
		};
	},
	computed: {
		onPlay () {
			return this.$store.getters.onPlay;
		},
		type () {
			return this.$store.getters.type;
		},
		index () {
			return this.$store.getters.index;
		}
	},
	methods: {
		switchToPlay: Funs.switchToPlay,
		playControl: Funs.playControl,
		updateAudioList () {
			this.audioType = localStorage.getItem('musicType');
			this.audioList = audioList[this.audioType];
		}
	},
	activated () {
		console.log('articles', 'activated');
		this.updateAudioList();
	},
	deactivated () {
		console.log('articles', 'deactivated');
	},
	beforeCreate () {
		console.log('articles', 'beforeCreates');
	},
	created () {
		console.log('articles', 'created');

	},
	beforeMount () {
		console.log('articles', 'beforeMount');
	},
	mounted () {
		console.log('articles', 'mounted');

	},
	beforeUpdate () {
		console.log('articles', 'beforeUpdate');
	},
	updated () {
		console.log('articles', 'updated');
	},
	beforeDestroy () {
		console.log('articles', 'beforeDestroy');
	}
};

/*

Page({
  data: {
    audioType: null
  },
  switchToPlay: app.Funs.switchToPlay,
  onShow: function () {

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
