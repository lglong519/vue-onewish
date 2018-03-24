import Funs from '../utils/funs';

export default {
   changePath(state, path) {
      state.path = path;
   },
   getAudio(state, Audio) {
      state.Audio = Audio;
   },
   setAudioSrc(state, params) {
      if (params.type != state.type || params.index != state.index) {
         state.type = params.type;
         state.index = params.index;
         state.audioList = Funs[params.type]
         state.currAudio = state.audioList[params.index]
      }
      state.Audio.src = state.currAudio[0].url || '';
   }
}