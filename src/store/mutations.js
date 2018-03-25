import Funs from '../utils/funs';

export default {
   SET_PATH(state, path) {
      state.path = path;
   },
   SET_AUDIO(state, Audio) {
      state.Audio = Audio;
   },
   SET_ONPLAY(state, onPlay) {
      state.onPlay = onPlay;
   },
   RESET_DATA: Funs.resetData
}