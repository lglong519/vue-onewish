const state = {
   type: null,
   index: null,
   audioList: null,
   url: null,
   Audio: null,
   currAudio: null,
   onPlay: false,
   playMode: null,
   timer: null,
   audioBackstage: null,
   playModeLib: {
      index: { 'once': 0, 'loop': 1, 'list': 2, 'listLoop': 3, 'randomList': 4, 'randomInfinite': 5, 'randomAll': 6 },
      list: ['sync_disabled', 'repeat_one', 'format_list_numbered', 'low_priority', 'wrap_text', 'format_line_spacing', 'crop_rotate'],
      mode: ['once', 'loop', 'list', 'listLoop', 'randomList', 'randomInfinite', 'randomAll'],
      name: ['单曲播放', '单曲循环', '列表顺序', '列表循环', '列表随机', '列表随机循环', '全部随机']
   },
   path: 'index'
}
export default state;