//index.js
// import { switchToPlay } from '../../utils/funs.js';
import articleZH from '../../../static/libs/articleZH'
import articleEN from '../../../static/libs/articleEN'
const articles = {
	articleZH,
	articleEN
}

export default {
	data() {
		return {
			articles: Array,
			index: Number,
			onPlay: Boolean,
			type: String
		}
	},
	computed: {

	},
	methods: {
		switchToPlay() {
		},
		updateArticles() {
			let currArticles = articles[localStorage.getItem('articleType') || 'articleZH'];
			this.articles = currArticles;
		}
	},
	activated() {
		console.log('articles', "activated");
		this.updateArticles();
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
const app = getApp();

Page({
	data: {},
	switchToPlay,
	onShow: function () {
		wx.setTabBarStyle({
			selectedColor: '#FFB13F',
			backgroundColor: '#EBE1D5',
			borderStyle: 'white'
		})
		this.setData({
			articles: wx.getStorageSync('audioType') == 'articleEN' ? app.Funs.articleEN : app.Funs.articleZH,
			type: app.data.type,
			index: app.data.index,
			onPlay: app.data.onPlay
		});
	},
	onPullDownRefresh: function () {
		this.onShow();
		wx.stopPullDownRefresh()
	}

})
*/