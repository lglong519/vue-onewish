import articleZH from '../../static/libs/articleZH'
import articleEN from '../../static/libs/articleEN'
import classical from '../../static/libs/classical'
import music from '../../static/libs/music'
import { setTimeout } from 'timers';


const init = (state) => {
   let data = state;
   if (!localStorage.getItem('articleType')) {
      localStorage.setItem('articleType', 'articleZH')
   }
   if (!localStorage.getItem('musicType')) {
      localStorage.setItem('musicType', 'music')
   }
   data.type = localStorage.getItem('type') || 'articleZH';
   data.index = localStorage.getItem('index') || 0;
   data.playMode = localStorage.getItem('playMode') || 'once';
   localStorage.setItem('type', data.type);
   localStorage.setItem('index', data.index);
   localStorage.setItem('playMode', data.playMode);
   localStorage.getItem('showAnchor') !== false && localStorage.setItem('showAnchor', true);
   localStorage.getItem('showZoom') !== false && localStorage.setItem('showZoom', true);

   //+设置audioList
   data.audioList = getAudioList(data.type);

   data.currAudio = data.audioList[data.index];
   data.url = data.currAudio[0].url;

   /*
      if (data.Audio.src) {
         data.Audio.src == data.url || (data.url && (data.Audio.src = data.url));
      } else {
         data.url && (data.Audio.src = data.url);
      }
   */
}


//重置所有数据
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
      state.audioList = getAudioList(params.type);
      _();
   } else {
      //如果只是索引改了
      if (params.index !== state.index) {
         _();
      }
   }
   function _() {
      state.index = params.index;
      state.currAudio = state.audioList[params.index];
      state.url = state.currAudio[0].url;
      state.Audio.src = state.url || '';
   }
}
const switchToPlay = function (e) {
   let dataset = e.currentTarget.dataset;
   this.$store.commit("RESET_DATA", {
      type: dataset.audioType,
      index: dataset.audioIndex
   });
   setTimeout(function () {
      this.$store.getters.Audio.play();
   }.bind(this), 100);
   this.$router.push({ path: '/play' })
}
const playControl = function (e) {
   let dataset = e.currentTarget.dataset;
   if (dataset.audioType && dataset.audioType != this.audioType || dataset.audioIndex && dataset.audioIndex != this.index) {
      this.$store.commit("RESET_DATA", {
         type: dataset.audioType,
         index: dataset.audioIndex
      });
      setTimeout(function () {
         this.$store.getters.Audio.play();
      }.bind(this), 100);
      return;
   }
   if (this.$store.getters.onPlay) {
      this.$store.getters.Audio.pause();
      this.$store.commit("SET_ONPLAY", false);
   } else {
      /*
       if (wx.getStorageSync('ended')) {
          app.data.Audio = wx.getBackgroundAudioManager();
          wx.removeStorageSync('ended')
          app.data.Audio.src = app.data.url;
          app.data.Audio.play()
       }
       if (app.data.url && app.data.Audio.src != app.data.url) {
          app.data.Audio.src = app.data.url;
       }
       */
      this.$store.commit("SET_ONPLAY", true);

      setTimeout(function () {
         console.log('paly');
         this.$store.getters.Audio.play();
      }.bind(this), 100);
   }
}
const keepPlay = app => {
   if (app.data.onPlay && app.data.url) {
      app.data.Audio.pause();
      app.data.Audio.play();
   } else {
      app.data.onPlay = false;
   }
}
const getAudioList = type => {
   switch (type) {
      case 'articleZH': return articleZH;
      case 'articleEN': return articleEN;
      case 'classical': return classical;
      default: return music
   }
}

const showRedDot = (app) => {
   app.timer && clearInterval(app.timer);
   var i = 0, compare;
   app.timer = setInterval(() => {
      if (!app.data.url && !app.data.Audio.src) {
         app.data.Audio.pause();
         app.data.onPlay = false;
      }
      if (app.data.onPlay && app.data.url) {
         //检测播放状态下的实际播放状态，step=500ms
         if (++i % 5 == 0) {
            if (app.data.Audio.currentTime == compare) {
               app.data.Audio.play();
            } else {
               compare = app.data.Audio.currentTime;
            }
         }

         wx.showTabBarRedDot({
            index: 3
         })
      } else {
         app.data.onPlay = false;
         wx.hideTabBarRedDot({
            index: 3
         })
      }

   }, 100);
}

const setAudioEvent = (app, that) => {
   let data;
   if (that) {
      data = that.data
   }
   let appData = app.data;
   let Audio = app.data.Audio;
   Audio.onplay(() => {
      console.log('onPlay');
      wx.hideLoading();
      wx.removeStorageSync('ended');
      if (!appData.url) { return }
      createRandomIndex();
      appData.onPlay = true;
      if (!data) { return }
      that.setData({
         onPlay: true
      });
   });

   if (!data) {
      if (!appData.audioBackstage) {
         Audio.onSeeking(() => {
            console.log('onSeeking');
            wx.showLoading();
         });
         Audio.onSeeked(() => {
            console.log('onSeeked');
            wx.hideLoading();
            if (appData.onPlay) {
               Audio.pause();
            }
            if (appData.url) {
               Audio.play();
            }
         });
      }
      Audio.onError((err) => {
         console.log('onError', err);
         Audio.pause();
      });
   }

   Audio.onPause(() => {
      console.log('onPause');
      wx.hideLoading();
      if (appData.audioBackstage) {
         appData.onPlay = false;
      }
      if (!data) { return }
      that.setData({
         onPlay: false
      });
   });
   Audio.onStop(() => {
      console.log('onStop');
      wx.hideLoading();
      localStorage.setItem('ended', true);
		/*
		appData.onPlay = false;
		if (!data) { return }
		that.setData({
			onPlay: false
		});
		*/
   });
   Audio.onended(() => {
      console.log('ended');
      wx.hideLoading();
      if (data) {
         that.setData({
            onPlay: false
         });
      }
      var bool = false;
      if (appData.audioBackstage) {
         localStorage.setItem('ended', true);
         bool = true;
      } else {
         if (data) {
            bool = false;
         } else {
            bool = true;
         }
      }
      if (bool) {
         appData.onPlay = false;
         let playMode = wx.getStorageSync('playMode');
         if (playMode == 'loop') {
            if (appData.url) {
               appData.Audio.src = appData.url;
               appData.Audio.play();
            }
         }

         if (playMode == 'list') {
            if (appData.index < appData.audioList.length - 1) {
               let newIndex = appData.index + 1;
               resetData(appData.type, newIndex);
               appData.onPlay = true;
               if (appData.url) {
                  appData.Audio.play();
               }
               app.data.onShow();
            }
         }

         if (playMode == 'listLoop') {
            let newIndex
            if (appData.index < appData.audioList.length - 1) {
               newIndex = appData.index + 1;
            } else {
               newIndex = 0;
            }
            resetData(appData.type, newIndex);
            if (appData.url) {
               appData.Audio.play();
            }
            app.data.onShow();
         }

         if (playMode == 'randomList') {
            let list = wx.getStorageSync('randomList') || [];;
            list && list.shift();
            if (list.length) {
               localStorage.setItem('randomList', list);
               resetData(appData.type, list[0]);
               if (appData.url) {
                  appData.Audio.play();
               }
               app.data.onShow();
            } else {
               wx.removeStorageSync('randomList');
            }
         }

         if (playMode == 'randomInfinite') {
            let newIndex = parseInt(Math.random() * appData.audioList.length);
            resetData(appData.type, newIndex);
            if (appData.url) {
               appData.Audio.play();
            }
            app.data.onShow();
         }
         if (playMode == 'randomAll') {
            let types = ['articleZH', 'articleEN', 'classical', 'music'];
            let typeIndex = parseInt(Math.random() * types.length);
            appData.audioList = getAudioList(types[typeIndex]);
            let newIndex = parseInt(Math.random() * appData.audioList.length);
            resetData(types[typeIndex], newIndex);
            if (appData.url) {
               appData.Audio.play();
            }
            app.data.onShow();
         }
      }
   });
   if (appData.audioBackstage) {
      Audio.onPrev(() => {
         skip_previous(that, app);
      });
      Audio.onNext(() => {
         skip_next(that, app);
      });
   }
}
const skip_previous = (that, app) => {
   var newIndex;
   let appData = app.data;
   if (appData.index > 0) {
      newIndex = appData.index - 1;
   } else {
      newIndex = appData.audioList.length - 1;
   }
   _prevOrNext(that, app, newIndex);
}

const skip_next = (that, app) => {
   var newIndex;
   let appData = app.data;
   if (appData.index < appData.audioList.length - 1) {
      newIndex = appData.index + 1;
   } else {
      newIndex = 0;
   }
   _prevOrNext(that, app, newIndex);
}

function _prevOrNext(that, app, newIndex) {
   resetData(app.data.type, newIndex);
   if (app.data.url) {
      app.data.Audio.play();
   }
   if (that) {
      if (app.data.type.indexOf('article') > -1 && that.currAudio != app.data.currAudio) {
         var sectionTimes = app.data.currAudio[0].sections.map(i => i.time);
      }
      that.setData({
         currAudio: app.data.currAudio,
         type: app.data.type,
         onPlay: app.data.onPlay,
         sectionTimes: sectionTimes || [],
      });
   } else {
      app.data.onShow();
   }
}

const toMinute = myTime => {
   var minutes = parseInt(myTime / 60);
   var seconds = parseInt(myTime - 60 * minutes);
   minutes = minutes < 10 ? '0' + minutes : minutes;
   seconds = seconds < 10 ? '0' + seconds : seconds;
   return minutes + ':' + seconds;
}
const toSecond = myTime => {
   var reg = /[:：]/;
   if (!reg.test(myTime)) {
      return myTime;
   }
   var arr = myTime.split(reg);
   return arr[0] * 60 + arr[1] * 1;
}
const getCurrPart = (sectionTime, currentTime) => {
   for (var j = 0; j < sectionTime.length; j++) {
      if (j == sectionTime.length - 1) {
         if (toSecond(currentTime) >= toSecond(sectionTime[j])) {
            return sectionTime[j];
         }
      }
      if (toSecond(currentTime) >= toSecond(sectionTime[j]) && toSecond(currentTime) < toSecond(sectionTime[j + 1])) {
         return sectionTime[j];
      }
   }
   return '00:00'
}
const createRandomIndex = () => {
   let appData = getApp().data
   if (wx.getStorageSync('playMode') == 'randomList') {
      if (!wx.getStorageSync('randomList')) {
         let count = appData.audioList.length - 1;
         let initNo = [];
         while (count >= 0) {
            initNo.unshift(count--);
         }
         initNo.splice(appData.index, 1);
         let randomList = [];
         (function getRandomNo() {
            if (initNo.length > 0) {
               randomList = randomList.concat(initNo.splice(parseInt(Math.random() * initNo.length), 1));
               getRandomNo();
            }
         })();
         randomList.unshift(appData.index);
         localStorage.setItem('randomList', randomList);
      }
   }
}
export default {
   articleZH: articleZH,
   articleEN: articleEN,
   classical: classical,
   music: music,
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
   createRandomIndex
}