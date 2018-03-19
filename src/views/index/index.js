//index.js
export default {
	data() {
		return {}
	},
	methods: {
		toArticles(e) {
			let type = e.currentTarget.dataset.type
			localStorage.setItem('audioType', type)
			this.$router.push({ path: '/articles' })
		},
		toMusic(e) {
			let type = e.currentTarget.dataset.type
			localStorage.setItem('audioType', type)
			this.$router.push({ path: '/music' })
		}
	}
}



/*
const app = getApp();

Page({
	data: {
		articles: []
	},
	toArticles(e) {
		let dataset = e.currentTarget.dataset;
		wx.setStorageSync('audioType', dataset.type);
		wx.switchTab({
			url: '/pages/articles/articles',
		})
	},
	toMusic(e) {
		let dataset = e.currentTarget.dataset;
		wx.setStorageSync('audioType', dataset.type);
		wx.switchTab({
			url: '/pages/music/music',
		})
	},
	onShow: function () {
		wx.setTabBarStyle({
			selectedColor: '#73A0C2',
		});
	},
	onShareAppMessage(){
		
	}
})
*/