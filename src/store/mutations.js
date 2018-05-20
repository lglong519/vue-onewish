import Funs from '../utils/funs';

export default {
	SET_PATH (state, path) {
		state.path = path;
	},
	SET_AUDIO (state, Audio) {
		state.Audio = Audio;
	},
	SET_ONPLAY (state, onPlay) {
		state.onPlay = onPlay;
	},
	SET_TYPE (state, type) {
		state.type = type;
	},
	SET_INDEX (state, index) {
		state.index = index;
	},
	SET_CURRAUDIO (state, currAudio) {
		state.currAudio = currAudio;
	},
	SET_URL (state, url) {
		state.url = url;
	},
	RESET_DATA: Funs.resetData
};
