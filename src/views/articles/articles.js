import Funs from '../../utils/funs';
const articles = {
	articleZH: Funs.articleZH,
	articleEN: Funs.articleEN
};

export default {
	data () {
		return {
			articles: Array,
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
		updateArticles () {
			this.articles = articles[localStorage.getItem('articleType')];
		}
	},
	activated () {
		console.log('articles', 'activated');
		this.updateArticles();
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
			articles: localStorage.getItem('audioType') == 'articleEN' ? app.Funs.articleEN : app.Funs.articleZH,
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
