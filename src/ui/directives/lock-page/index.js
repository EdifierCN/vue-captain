// 添加在滚动元素上

export default {
  bind(el, { value }){
    let startY = 0;
    let status = 0;
    let stop = false;

    el.touchstartHandler = (e) => {
      status = 1;
      startY = e.targetTouches[0].pageY;
    };

    el.touchmoveHandler = (e) => {
      if (status !== 1) return;
      status = 2;

      let py = e.targetTouches[0].pageY;
      let ch = el.clientHeight; // 内容可视高度
      let sh = el.scrollHeight; // 内容滚动高度
      let st = el.scrollTop; // 当前滚动高度

      stop = false;

      // 已经到头部尽头了还要向上滑动，阻止它，// 在函数里添加 preventDefault 无效，原因未知
      if (st === 0 && startY < py) {
        stop = true;
      }

      // 已经到底部尽头了还要向下滑动，阻止它，// 在函数里添加 preventDefault 无效，原因未知
      if ((st === sh - ch) && startY > py) {
        stop = true;
      }
    };

    el.touchendHandler = (e) => {
      status = 0
    };

    window.addEventListener('touchmove', (e) =>{
      if(stop && status === 2){
        e.preventDefault();
      }
    });

    el.addEventListener('touchstart', el.touchstartHandler, false);
    el.addEventListener('touchmove', el.touchmoveHandler, false);
    el.addEventListener('touchend', el.touchendHandler, false);
  },
  unbind(el){
    document.removeEventListener('touchstart', el.touchstartHandler, true);
    document.removeEventListener('touchmove', el.touchmoveHandler, true);
    document.removeEventListener('touchend', el.touchendHandler, true);
    el.touchstartHandler = null;
    el.touchmoveHandler = null;
    el.touchendHandler = null;
  }
}
