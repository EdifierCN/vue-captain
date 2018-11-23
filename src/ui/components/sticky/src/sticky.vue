<script>
  export default {
    props: {
      top: {
        type: [String],
        default: 'auto'
      },
      zIndex: {
        type: Number,
        default: 10
      }
    },
    data() {
      return {
        child: null,
        stickyHeight: 0,
        parsedTop: parseFloat(this.top, 10),
        position: 'static'
      };
    },
    watch: {
      position(cur) {
        this.child.style.position = cur;
        console.info(cur);
        switch (cur) {
          case 'sticky':
            this.child.style.position = 'fixed';
            this.child.style.top = this.top;
            break;
          case 'absolute':
            this.child.style.position = 'fixed';
            this.child.style.top = this.top;
            break;
          case 'static':
          default:
            this.child.style.position = 'relative';
            this.child.style.top = 'auto';
        }
      }
    },
    methods: {
      scrollHandler() {
        let offset = this.$el.getBoundingClientRect();
        let poffset = this.$el.parentElement.getBoundingClientRect();
        // 元素原本的位置在 sticky 位置下面
        let isStatic = offset.top > this.parsedTop;
        // 父元素位置在 viewport 位置上面
        let isAbsolute = poffset.bottom < this.parsedTop + this.stickyHeight;
        console.info('1:', isStatic);
        console.info('1:',isAbsolute);
        if (isStatic) {
          this.position = 'static';
        }
        else if (isAbsolute) {
          this.position = 'absolute';
        }
        else {
          this.position = 'sticky';
        }
      }
    },
    render(h) {
      return (<div class="zmui-sticky" style={{top: this.top, bottom: this.bottom, zIndex: this.zIndex}}>
                  {this.$slots.default}
              </div>)
    },
    mounted() {
      // 保证 this.$el 已经插入文档
      this.$nextTick(() => {
        let computedStyle = window.getComputedStyle(this.$el);
        let position = computedStyle.position;
        let stickySupport = position.indexOf('sticky') > -1;
        let child = this.$el.firstElementChild;
        if (child) {
          this.child = child;
          child.style.zIndex = this.zIndex;
          this.stickyHeight = parseFloat(computedStyle.height, 10);
          this.$el.style.position = 'static';
          this.$el.style.height = computedStyle.height;
          window.addEventListener('scroll', this.scrollHandler, true);
          this.scrollHandler();

        }
      });
    },
    destroyed(){
      window.removeEventListener('scroll', this.scrollHandler, true);
    }
  };
</script>

<style>
  .zmui-sticky{
    position: -webkit-sticky;
    position: sticky;
  }
</style>
