import Funs from '../../utils/funs';
import ThePlayController from '../../components/ThePlayController';
import { LAG_TIME } from '../../config';

const { toMinute, toSecond, getCurrPart, lyricFormat, lyric } = Funs;

export default {
	components: { ThePlayController },
	props: ['hideTabBar'],
	data () {
		return {
			// page data
			currPart: '',
			currentTime: 0,
			currentTimeFormat: '00:00',
			timeStamp: 0,
			duration: 0,
			durationFormat: '00:00',
			windowHeight: 0,
			id: null,
			show: true,
			showAnchor: true,
			onshow: true,
			modeIcon: this.$store.getters.playModeLib.list,
			modeIndex: this.$store.getters.playModeLib.index[localStorage.getItem('playMode')],
			modeName: this.$store.getters.playModeLib.name,
			showToast: false,
			modeTimer: null,
			showTrans: null,
			showTransIndex: null,
			showZoom: localStorage.getItem('showZoom') == 'true',
			currLyric: 0,
			lyricIndex: 'lyric0',
			eqIndex: null,
			lyrics: null,
			waitTime: LAG_TIME,
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
		},
		currAudio () {
			return this.$store.getters.currAudio;
		},
		Audio () {
			return this.$store.getters.Audio;
		},
		audioList () {
			return this.$store.getters.audioList;
		},
		url () {
			return this.$store.getters.url;
		},
		sectionTimes () {
			// 如果是文章类型，设置章节时间列表
			let sectionTimes = [];
			if (this.type.indexOf('article') > -1) {
				let { sections } = this.currAudio[0];
				if (sections) {
					sectionTimes = sections.map(i => i.time);
				}
			}
			return sectionTimes;
		}
	},
	methods: {
		playControl: Funs.playControl,
		sliderChange (val) {
			this.Audio.play();
			this.Audio.currentTime = val;
			this.timeStamp = 0;
			this.$store.commit('SET_ONPLAY', true);
		},
		sliderChanging (val) {
			this.timeStamp = val;
		},
		playSection (e) {
			let { dataset } = e.currentTarget;
			if (dataset.artTime) {
				let sec = toSecond(dataset.artTime);
				this.Audio.play();
				this.Audio.currentTime = sec || 0;
				this.$store.commit('SET_ONPLAY', true);
			}
		},
		showToastEvent (bool) {
			this.showToast = bool;
		},
		modeIndexEvent (modeIndex) {
			this.modeIndex = modeIndex;
		},
		showTransition (e) {
			let dataset = e.currentTarget.dataset;
			if (this.showTransIndex == dataset.showTransIndex) {
				this.showTrans = this.currAudio[0].title;
				this.showTransIndex = -1;
			} else {
				this.showTrans = this.currAudio[0].title;
				this.showTransIndex = dataset.showTransIndex;
			}
		},
		zoom () {
			if (this.hideTabBar) {
				this.$emit('tabBarEvent', false);
			} else {
				this.$emit('tabBarEvent', true);
			}
		},
		updateLyrics (lyrics) {
			this.lyrics = lyrics;
		},
		touchScreen () {
			this.waitTime = LAG_TIME;
		}
	},
	activated () {
		// 控制 进度条 显示/隐藏
		// this.show = true;
		this.onshow = true;
		this.modeIndex = this.$store.getters.playModeLib.index[localStorage.getItem('playMode')];
		if (localStorage.getItem('hideTabBar') == 'true') {
			this.$emit('tabBarEvent', true);
		}
		this.showZoom = localStorage.getItem('showZoom') == 'true';
		this.showAnchor = localStorage.getItem('showAnchor') == 'true';
		this.lyrics = lyricFormat(lyric[this.currAudio[0].id]);
	},
	deactivated () {
		console.log('play', 'deactivated');
		// this.show = false;
		this.onshow = false;
	},
	mounted () {
		console.log('play', 'mounted');
		let i = 1, n = 1;
		let { Audio } = this;
		setInterval(() => {
			if (n++ % 100 == 0) {
				this.waitTime -= 1000;
				this.waitTime < 0 && (this.waitTime = -1);
			}
			if (!Audio.src || !this.$store.getters.url || !this.show) {
				return;
			}

			if (parseInt(this.duration) != parseInt(Audio.duration)) {
				this.duration = Audio.duration,
				this.durationFormat = toMinute(Audio.duration);
			}
			if (this.timeStamp) {
				return;
			}
			let currentTimeFormat = toMinute(Audio.currentTime);

			if (!this.onPlay && this.onshow && i++ % 2 == 0) {
				if (toMinute(this.currentTime) != currentTimeFormat) {
					this.currentTimeFormat = currentTimeFormat;
					this.currentTime = Audio.currentTime;
				}
			}

			if (toMinute(this.currentTime) != currentTimeFormat) {
				if (this.onPlay && this.onshow) {
					this.currentTime = Audio.currentTime;
					this.currentTimeFormat = currentTimeFormat;
				}

				let [currPart, eqIndex] = getCurrPart(this.sectionTimes, Audio.currentTime);
				let [currLyric] = getCurrPart(this.lyrics.lyricTimeTable, Audio.currentTime);
				currLyric == '00:00' && (currLyric = 0);
				if (currPart != this.currPart && currLyric != this.currLyric) {
					let index = this.lyrics.lyricTimeTable.indexOf(currLyric);
					let lyricIndex = `lyric${index > 1 ? index - 2 : 0}`;
					this.eqIndex = eqIndex;
					this.currPart = currPart;
					this.currLyric = currLyric;
					this.lyricIndex = lyricIndex;
					return;
				}

				if (currPart != this.currPart) {
					this.currPart = currPart;
				}

				if (currLyric != this.currLyric) {
					let index = this.lyrics.lyricTimeTable.indexOf(currLyric);
					if (index > 1) {
						index -= 2;
					} else {
						index = 0;
					}
					let lyricIndex = `top:-${index * 22}px`;
					this.currLyric = currLyric;
					this.lyricIndex = lyricIndex;
				}
			}

		}, 10);
	},

};

/*

Page({

	onShow: function () {
		if (Audio !== getApp().data.Audio) {
			Audio = getApp().data.Audio;
		}
		if (localStorage.getItem('hideTabBar')) {
			wx.hideTabBar({
				aniamtion: true
			})
			this.setData({
				hideTabBar: true
			});
		} else {
			wx.showTabBar({
				aniamtion: true
			})
			this.setData({
				hideTabBar: false
			});
		}
		wx.setTabBarStyle({
			selectedColor: '#83c44e',
			// backgroundColor: appData.url ? '#C6C6C6' : '',
			borderStyle: appData.url ? 'white' : ''
		});
		console.log('play onshow');

		this.setData({
			currAudio: appData.currAudio,
			type: appData.type,
			onPlay: appData.onPlay,
			sectionTimes: sectionTimes || [],
			showAnchor: localStorage.getItem('showAnchor') === false ? false : true,
			showZoom: localStorage.getItem('showZoom'),
			modeIndex: appData.playModeLib.index[localStorage.getItem('playMode')],
			onshow: true,
			hide: false
		});

		setTimeout(() => {
			this.setData({
				show: true
			});
		}, 100);
	},
	onHide() {
		this.setData({
			show: false,
			hide: true,
			onshow: false
		});
	},
	sliderChange(event) {
		var sliderValue = event.detail;
		this.setData({
			currentTimeFormat: toMinute(sliderValue.value),
			currentTime: sliderValue.value,
			timeStamp: 0
		});
		Audio.seek(sliderValue.value);
	},
	sliderChanging(event) {
		let sliderValue = event.detail;
		this.setData({
			currentTimeFormat: toMinute(sliderValue.value),
			currentTime: sliderValue.value,
			timeStamp: 1
		});
	}

})

*/
