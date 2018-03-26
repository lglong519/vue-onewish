import Funs from '../../utils/funs';
import ThePlayController from "../../components/ThePlayController";

let toMinute = Funs.toMinute;
let toSecond = Funs.toSecond;
let getCurrPart = Funs.getCurrPart;


export default {
	components: { ThePlayController },
	data() {
		return {
			//page data
			currPart: '',
			currentTime: 0,
			currentTimeFormat: '00:00',
			timeStamp: 0,
			duration: 0,
			durationFormat: '00:00',
			windowHeight: 0,
			id: null,
			show: false,
			hide: false,
			hideTabBar: false,
			showAnchor: true,
			showZoom: false,
			onshow: true,
			modeIcon: this.$store.getters.playModeLib.list,
			modeIndex: this.$store.getters.playModeLib.index[localStorage.getItem('playMode')],
			modeName: this.$store.getters.playModeLib.name,
			showToast: false,
			modeTimer: null,
			rollup: false,
			showTrans: null,
			showTransIndex: null,

		}
	},
	computed: {
		onPlay() {
			return this.$store.getters.onPlay;
		},
		type() {
			return this.$store.getters.type;
		},
		index() {
			return this.$store.getters.index;
		},
		currAudio() {
			return this.$store.getters.currAudio;
		},
		Audio() {
			return this.$store.getters.Audio;
		},
		sectionTimes() {
			//如果是文章类型，设置章节时间列表
			if (this.type.indexOf('article') > -1) {
				let sections = this.currAudio[0].sections;
				if (sections) {
					var sectionTimes = sections.map(i => i.time);
				}
			}
			return sectionTimes || [];
		}
	},
	methods: {
		playControl: Funs.playControl,
		sliderChange(val) {
			this.Audio.currentTime = val;
			this.timeStamp = 0;
		},
		sliderChanging(val) {
			this.timeStamp = val
		},
		playSection(e) {
			var dataset = e.currentTarget.dataset;
			if (dataset.artTime) {
				var sec = toSecond(dataset.artTime);
				this.Audio.play();
				this.Audio.currentTime = sec || 0;
				this.$store.commit('SET_ONPLAY', true);
			}
		}
	},
	activated() {
		console.log('play', "activated");
		this.show = true;
	},
	deactivated() {
		console.log('play', "deactivated");
		this.show = false;
	},
	mounted() {
		console.log('play', "mounted");
		var i = 0;
		var that = this;
		let Audio = this.Audio;
		setInterval(() => {
			if (!Audio.src || !this.$store.getters.url || !this.show) { return }

			if (parseInt(this.duration) != parseInt(Audio.duration)) {
				this.duration = Audio.duration,
					this.durationFormat = toMinute(Audio.duration)
			}
			if (this.timeStamp) {
				return;
			}
			let currentTimeFormat = toMinute(Audio.currentTime);

			if (!this.onPlay && this.onshow && i++ % 10 == 0) {
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
				let currPart = getCurrPart(this.sectionTimes, Audio.currentTime);
				if (currPart != this.currPart) {
					this.currPart = currPart;
				}
			}

		}, 100);
	},

}


/*
// pages/play/play
const app = getApp();
let appData = app.data;
let Audio = appData.Audio;


Page({
	data: {
		currAudio: [],//页面数据
		type: null,//判断页面类型
		onPlay: false,//判断播放器和musice和article的状态
		//page data
		sectionTimes: [],
		currPart: '',
		currentTime: 0,
		currentTimeFormat: '00:00',
		timeStamp: 0,
		duration: Audio.duration,
		durationFormat: '00:00',
		windowHeight: 0,
		id: null,
		show: false,
		hideTabBar: false,
		showAnchor: true,
		showZoom: false,
		animation: {},
		onshow: true,
		modeIcon: appData.playModeLib.list,
		modeIndex: appData.playModeLib.index[localStorage.getItem('playMode')],
		modeName: appData.playModeLib.name,
		showToast: false,
		modeTimer: null,
		rollup: false,
		showTrans: null,
		showTransIndex: null
	},
	onLoad() {
		app.setAudioEvent(getApp(), this);
	},
	onReady() {
		var that = this;
		var data = this.data;
		app.data.playOnload = this.onLoad;
		app.data.onShow = this.onShow;
		this.setData({
			windowHeight: appData.windowHeight
		});
		var i = 0;
		setInterval(() => {
			if (!Audio.src || !appData.url) { return }

			if (parseInt(data.duration) != parseInt(Audio.duration)) {
				that.setData({
					duration: Audio.duration,
					durationFormat: toMinute(Audio.duration)
				});
			}
			if (that.data.timeStamp) {
				return;
			}


			let currentTimeFormat = toMinute(Audio.currentTime);

			if (!appData.onPlay && data.onshow && i++ % 10 == 0) {
				if (toMinute(data.currentTime) != currentTimeFormat) {
					that.setData({
						currentTimeFormat,
						currentTime: Audio.currentTime
					});
				}
			}


			if (toMinute(data.currentTime) != currentTimeFormat) {
				if (appData.onPlay && data.onshow) {
					appData.animation.rotate(40 * appData.turns++).step();
					that.setData({
						animation: appData.animation.export(),
						currentTime: Audio.currentTime,
						currentTimeFormat
					})
				}
				let currPart = getCurrPart(that.data.sectionTimes, Audio.currentTime);
				if (currPart != that.data.currPart) {
					that.setData({
						currPart
					});
				}
			}
		}, 100);
	},
	playControl: app.Funs.playControl,
	
	zoom() {
		if (this.data.hideTabBar) {
			wx.showTabBar({
				aniamtion: true
			})
			this.setData({
				hideTabBar: false
			});
		} else {
			wx.hideTabBar({
				aniamtion: true
			})
			this.setData({
				hideTabBar: true
			});
		}

	},
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
	skip_previous() {
		app.Funs.skip_previous(this, app);
	},
	skip_next() {
		app.Funs.skip_next(this, app);
	},
	playModeChange() {
		this.data.modeTimer && clearTimeout(this.data.modeTimer);
		if (this.data.modeIndex < appData.playModeLib.list.length - 1) {
			this.data.modeIndex++;
		} else {
			this.data.modeIndex = 0;
		}
		this.setData({
			modeIndex: this.data.modeIndex,
			showToast: true
		});
		var that = this;
		this.data.modeTimer = setTimeout(() => {
			that.setData({
				showToast: false
			});
		}, 2000);
		localStorage.setItem('playMode', appData.playModeLib.mode[this.data.modeIndex]);
		localStorage.removeItem('randomList');
		if (this.data.onPlay) {
			app.Funs.createRandomIndex();
		}
	},
	
	showTrans(e) {
		var dataset = e.currentTarget.dataset;
		if (this.data.showTransIndex == dataset.showTransIndex) {
			this.setData({
				showTrans: this.data.currAudio[0].title,
				showTransIndex: -1
			});
		} else {
			this.setData({
				showTrans: this.data.currAudio[0].title,
				showTransIndex: dataset.showTransIndex
			});
		}

	}
})

*/