import articleZH from '../../static/libs/articleZH';
import articleEN from '../../static/libs/articleEN';
import classical from '../../static/libs/classical';
import music from '../../static/libs/music';
import lyric from '../../static/libs/lyric';

import { setTimeout } from 'timers';

const init = state => {
	let data = state;
	if (!localStorage.getItem('articleType')) {
		localStorage.setItem('articleType', 'articleZH');
	}
	if (!localStorage.getItem('musicType')) {
		localStorage.setItem('musicType', 'music');
	}
	data.type = localStorage.getItem('type') || 'articleZH';
	data.index = localStorage.getItem('index') || 0;
	data.playMode = localStorage.getItem('playMode') || 'once';
	localStorage.setItem('type', data.type);
	localStorage.setItem('index', data.index);
	localStorage.setItem('playMode', data.playMode);
	localStorage.getItem('showAnchor') != 'false' && localStorage.setItem('showAnchor', true);
	localStorage.getItem('showZoom') != 'false' && localStorage.setItem('showZoom', true);

	// +设置audioList
	data.audioList = _getAudioList(data.type);

	data.currAudio = data.audioList[data.index];
	data.url = data.currAudio[0].url;

	/*
      if (data.Audio.src) {
         data.Audio.src == data.url || (data.url && (data.Audio.src = data.url));
      } else {
         data.url && (data.Audio.src = data.url);
      }
   */
};

// 重置所有数据
const resetData = (state, params) => {
	localStorage.setItem('type', params.type);
	localStorage.setItem('index', params.index);
	if (params.type === state.type && params.index === state.index) {
		state.onPlay = true;
		return;
	}
	state.Audio && state.Audio.pause();
	state.onPlay = true;
	if (params.type !== state.type) {
		// clearstate(app);
		state.type = params.type;
		state.audioList = _getAudioList(params.type);
		_();
	} else {
		// 如果只是索引改了
		if (params.index !== state.index) {
			_();
		}
	}
	function _ () {
		state.index = params.index;
		state.currAudio = state.audioList[params.index];
		state.url = state.currAudio[0].url;
		state.Audio.src = state.url || '';
	}
};
const switchToPlay = function (e) {
	let { audioType: type, audioIndex: index } = e.currentTarget.dataset;
	this.$store.commit('RESET_DATA', {
		type,
		index
	});
	setTimeout(() => {
		this.$store.getters.Audio.play();
	}, 100);
	this.$router.push({
		path: '/play'
	});
};
const playControl = function (e) {
	let dataset = e.currentTarget.dataset;
	if (dataset.audioType && dataset.audioType != this.audioType || dataset.audioIndex && dataset.audioIndex != this.index) {
		this.$store.commit('RESET_DATA', {
			type: dataset.audioType,
			index: dataset.audioIndex
		});
		setTimeout(() => {
			this.$store.getters.Audio.play();
		}, 100);
		return;
	}
	if (this.$store.getters.onPlay) {
		this.$store.getters.Audio.pause();
		this.$store.commit('SET_ONPLAY', false);
	} else {

		/*
       if (localStorage.getItem('ended')) {
          app.data.Audio = wx.getBackgroundAudioManager();
          localStorage.removeItem('ended')
          app.data.Audio.src = app.data.url;
          app.data.Audio.play()
       }
       if (app.data.url && app.data.Audio.src != app.data.url) {
          app.data.Audio.src = app.data.url;
       }
       */
		this.$store.commit('SET_ONPLAY', true);

		setTimeout(() => {
			this.$store.getters.Audio.play();
		}, 100);
	}
};
const keepPlay = app => {
	if (app.data.onPlay && app.data.url) {
		app.data.Audio.pause();
		app.data.Audio.play();
	} else {
		app.data.onPlay = false;
	}
};
function _getAudioList (type) {
	switch (type) {
		case 'articleZH': return articleZH;
		case 'articleEN': return articleEN;
		case 'classical': return classical;
		default: return music;
	}
}

const showRedDot = app => {
	app.timer && clearInterval(app.timer);
	let i = 0,
		compare;
	app.timer = setInterval(() => {
		if (!app.data.url && !app.data.Audio.src) {
			app.data.Audio.pause();
			app.data.onPlay = false;
		}
		if (app.data.onPlay && app.data.url) {
			// 检测播放状态下的实际播放状态，step=500ms
			if (++i % 5 === 0) {
				if (app.data.Audio.currentTime == compare) {
					app.data.Audio.play();
				} else {
					compare = app.data.Audio.currentTime;
				}
			}

			wx.showTabBarRedDot({
				index: 3
			});
		} else {
			app.data.onPlay = false;
			wx.hideTabBarRedDot({
				index: 3
			});
		}

	}, 100);
};

const setAudioEvent = that => {

	let appData = that.$store.getters;
	let { Audio } = appData;
	Audio.onplay = () => {
		console.log('onPlay');
		if (!appData.url) {
			return;
		}
		createRandomIndex(appData);
		that.$store.commit('SET_ONPLAY', true);
	};

	Audio.onSeeking = () => {
		console.log('onSeeking');
	};
	Audio.onSeeked = () => {
		console.log('onSeeked');
		if (appData.url) {
			Audio.play();
		}
	};
	Audio.onerror = err => {
		console.log('onError', err);
		Audio.pause();
	};

	Audio.onpause = () => {
		console.log('onPause');
		that.$store.commit('SET_ONPLAY', false);
	};

	Audio.onended = () => {
		console.log('ended');
		that.$store.commit('SET_ONPLAY', false);
		let playMode = localStorage.getItem('playMode');
		if (playMode === 'loop') {
			appData.Audio.play();
		}

		if (playMode === 'list') {
			if (appData.index < appData.audioList.length - 1) {
				let newIndex = appData.index * 1 + 1;
				that.$store.commit('RESET_DATA', {
					type: appData.type,
					index: newIndex
				});
				if (appData.url) {
					setTimeout(() => {
						appData.Audio.play();
					}, 100);
				}
				let lyrics = lyricFormat(lyric[that.$store.getters.currAudio[0].id]);
				// 通过 ref 来调用子组件的方法
				that.$refs.lyrics && that.$refs.lyrics.updateLyrics && that.$refs.lyrics.updateLyrics(lyrics);

			}
		}

		if (playMode === 'listLoop') {
			let newIndex;
			if (appData.index < appData.audioList.length - 1) {
				newIndex = appData.index * 1 + 1;
			} else {
				newIndex = 0;
			}
			that.$store.commit('RESET_DATA', {
				type: appData.type,
				index: newIndex
			});
			if (appData.url) {
				setTimeout(() => {
					appData.Audio.play();
				}, 100);
			}
			let lyrics = lyricFormat(lyric[that.$store.getters.currAudio[0].id]);
			that.$refs.lyrics && that.$refs.lyrics.updateLyrics && that.$refs.lyrics.updateLyrics(lyrics);

		}

		if (playMode === 'randomList') {
			let list = JSON.parse(localStorage.getItem('randomList')) || [

			];
			list && list.shift();
			if (list.length) {
				localStorage.setItem('randomList', JSON.stringify(list));
				that.$store.commit('RESET_DATA', {
					type: appData.type,
					index: list[0]
				});
				if (appData.url) {
					setTimeout(() => {
						appData.Audio.play();
					}, 100);
				}
				let lyrics = lyricFormat(lyric[that.$store.getters.currAudio[0].id]);
				that.$refs.lyrics && that.$refs.lyrics.updateLyrics && that.$refs.lyrics.updateLyrics(lyrics);
			} else {
				localStorage.removeItem('randomList');
			}
		}

		if (playMode === 'randomInfinite') {
			let newIndex = parseInt(Math.random() * appData.audioList.length);
			that.$store.commit('RESET_DATA', {
				type: appData.type,
				index: newIndex
			});
			if (appData.url) {
				appData.Audio.play();
			}
			let lyrics = lyricFormat(lyric[that.$store.getters.currAudio[0].id]);
			that.$refs.lyrics && that.$refs.lyrics.updateLyrics && that.$refs.lyrics.updateLyrics(lyrics);
		}
		if (playMode === 'randomAll') {
			let types = [
				'articleZH',
				'articleEN',
				'classical',
				'music'
			];
			let typeIndex = parseInt(Math.random() * types.length);
			appData.audioList = _getAudioList(types[typeIndex]);
			let newIndex = parseInt(Math.random() * appData.audioList.length);
			that.$store.commit('RESET_DATA', {
				type: types[typeIndex],
				index: newIndex
			});
			if (appData.url) {
				appData.Audio.play();
			}
			let lyrics = lyricFormat(lyric[that.$store.getters.currAudio[0].id]);
			that.$refs.lyrics && that.$refs.lyrics.updateLyrics && that.$refs.lyrics.updateLyrics(lyrics);
		}
	};

};
const skip_previous = that => {
	let newIndex;
	if (that.index > 0) {
		newIndex = that.index - 1;
	} else {
		newIndex = that.audioList.length - 1;
	}
	_prevOrNext(that, newIndex);
};

const skip_next = that => {
	let newIndex;
	if (that.index < that.audioList.length - 1) {
		newIndex = that.index * 1 + 1;
	} else {
		newIndex = 0;
	}
	_prevOrNext(that, newIndex);
};

function _prevOrNext (that, newIndex) {
	that.$store.commit('RESET_DATA', {
		type: that.type,
		index: newIndex
	});
	let lyrics = lyricFormat(lyric[that.currAudio[0].id]);
	that.$emit('updateLyrics', lyrics);
	if (that.url) {
		setTimeout(() => {
			that.Audio.play();
		}, 100);
	}
}

const toMinute = myTime => {
	let minutes = parseInt(myTime / 60);
	let seconds = parseInt(myTime - 60 * minutes);
	minutes = minutes < 10 ? `0${minutes}` : minutes;
	seconds = seconds < 10 ? `0${seconds}` : seconds;
	return `${minutes}:${seconds}`;
};
const toSecond = myTime => {
	if (typeof myTime === 'number') {
		return myTime;
	}
	let reg = /[:：]/;
	myTime = myTime.replace(/[[\]\s]/g, '');
	if (!reg.test(myTime)) {
		return myTime;
	}
	let arr = myTime.split(reg);
	return arr[0] * 60 + arr[1] * 1;
};

const getCurrPart = (sectionTimes, currentTime) => {
	let i = sectionTimes.length - 1;
	if (typeof i !== 'number' || isNaN(i)) {
		throw new TypeError('i is not a Number');
	}
	let eqIndex = true;
	while (i >= 0) {
		if (!sectionTimes[i]) {
			eqIndex = false;
		}
		let eqCurrentTime = toSecond(currentTime) >= toSecond(sectionTimes[i]);
		if (!eqCurrentTime) {
			eqIndex = true;
		} else if (sectionTimes[i]) {
			return [sectionTimes[i], eqIndex];
		}
		i--;
	}
	return '00:00';
};

const createRandomIndex = getters => {
	let appData = getters;
	if (localStorage.getItem('playMode') == 'randomList') {
		if (!localStorage.getItem('randomList')) {
			let count = appData.audioList.length - 1;
			let initNo = [

			];
			while (count >= 0) {
				initNo.unshift(count--);
			}
			initNo.splice(appData.index, 1);
			let randomList = [

			];
			(function getRandomNo () {
				if (initNo.length > 0) {
					randomList = randomList.concat(initNo.splice(parseInt(Math.random() * initNo.length), 1));
					getRandomNo();
				}
			}());
			randomList.unshift(appData.index);
			localStorage.setItem('randomList', JSON.stringify(randomList));
		}
	}
};

const lyricFormat = lyric => {
	if (!lyric) {
		return {
			lyricTimeTable: [],
			lyricJson: {},
			lyricList: []
		};
	}
	let arr = lyric.split('\n');
	let lyricJson = {};
	let lyricTimeTable = [];
	arr.forEach(item => {
		let text = item.replace(/\[\d+([^\]]*)?\d+\]/g, '');
		if (!text) {
			return;
		}
		let time = item.replace(text, '').replace(/\s/g, '');
		let timeTable = time.match(/\[([^\]]*)?\]/g);
		if (timeTable) {
			timeTable.forEach(val => {
				let seconds = toSecond(val);
				lyricJson[seconds] = {};
				lyricJson[seconds].text = text;
				lyricJson[seconds].time = seconds;
				lyricTimeTable.push(seconds);
			});
		} else if (lyricJson[0]) {
			lyricJson[0].text = `${lyricJson[0].text}\n${text}`;
		} else {
			lyricTimeTable.push(0);
			lyricJson[0] = {};
			lyricJson[0].text = text;
			lyricJson[0].time = 0;
		}
	});
	lyricTimeTable.sort((a, b) => a - b);
	return {
		lyricTimeTable,
		lyricJson,
		lyricList: Object.values(lyricJson).sort((a, b) => a.time - b.time)
	};
};

export default {
	articleZH,
	articleEN,
	classical,
	music,
	lyric,
	init,
	keepPlay,
	switchToPlay,
	playControl,
	resetData,
	setAudioEvent,
	toMinute,
	toSecond,
	getCurrPart,
	skip_previous,
	skip_next,
	createRandomIndex,
	lyricFormat,
};
