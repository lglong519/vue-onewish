// pages/account/account.js
let app = getApp();
Page({
	data: {
		userInfo: null,
		playMode: app.data.playModeLib.mode,
		mode: app.data.playModeLib.name,
		modeIcon: app.data.playModeLib.list,
		index: 0,
		audioBackstage: null,
		hideTabBar: localStorage.getItem('hideTabBar') || false,
		showAnchor: localStorage.getItem('showAnchor'),
		showZoom: localStorage.getItem('showZoom')
	},
	audioBackstageChange(e) {
		app = getApp();
		this.setData({
			audioBackstage: e.detail.value
		})
		localStorage.setItem('audioBackstage', e.detail.value);
		let playStatus = app.data.onPlay;
		let currentTime = app.data.Audio.currentTime;
		let audioSrc;
		if (app.data.Audio.src) {
			audioSrc = app.data.Audio.src;
		}
		app.data.onPlay = false;
		app.data.Audio.stop();

		if (this.data.audioBackstage) {
			app.data.Audio = wx.getBackgroundAudioManager();
		} else {
			app.data.Audio = wx.createInnerAudioContext();
		}
		if (playStatus && 'webUrl' in app.data.Audio) {
			app.data.Audio.src = app.data.url;
		}
		app.Funs.init(app);
		app = getApp();
		app.data.playOnload && app.data.playOnload();

		// console.log('playStatus', playStatus);
		// console.log('audioSrc', audioSrc);

		if (playStatus && audioSrc) {
			app.data.Audio.src = audioSrc;
			app.data.onPlay = true;
			app.data.Audio.play();
			app.data.Audio.onPlay(function () {
				// console.log('currentTime', currentTime);
				if (currentTime) {
					app.data.Audio.seek(currentTime)
					currentTime = null;
				}
			});
		}
	},
	hideTabBar(e) {
		this.setData({
			hideTabBar: e.detail.value
		})
		localStorage.setItem('hideTabBar', e.detail.value);
	},
	showAnchor(e) {
		this.setData({
			showAnchor: e.detail.value
		})
		localStorage.setItem('showAnchor', e.detail.value);
	},
	showZoom(e) {
		this.setData({
			showZoom: e.detail.value
		})
		localStorage.setItem('showZoom', e.detail.value);
	},
	previewImage() {
		wx.previewImage({
			urls: ['https://lglong519.github.io/test/images/qrcode.jpg']
		})
	},
	tapPlayMode(e) {
		this.setData({
			index: e.detail.value
		})
		var that = this;
		localStorage.setItem('playMode', that.data.playMode[that.data.index]);
		localStorage.removeItem('randomList');
		if (app.data.onPlay) {
			app.Funs.createRandomIndex();
		}
	},
	logoutEvent() {
		var that = this;
		wx.showModal({
			content: '是否退出当前帐号？',
			complete(res) {
				if (res.confirm) {
					wx.openSetting({
						complete(res) {
							if (res.authSetting['scope.userInfo']) {
							} else {
								localStorage.removeItem('userInfo')
								app.data.userInfo = null;
								that.setData({
									userInfo: null
								})
							}
						}
					});
				}
			}
		});
	},
	loginEvent() {
		app.Funs.wxLogin(app);
		this.onShow();
	},
	onShow: function () {
		var that = this;
		wx.setTabBarStyle({
			selectedColor: '#5287E9',
		});
		this.setData({
			audioBackstage: localStorage.getItem('audioBackstage'),
			index: app.data.playModeLib.index[localStorage.getItem('playMode')]
		})
		if (app.data.userInfo) {
			this.setData({
				userInfo: app.data.userInfo
			})
		} else {
			app.Funs.wxLogin(app).then(res => {
				that.setData({
					userInfo: res
				})
			});
		}
	},
})