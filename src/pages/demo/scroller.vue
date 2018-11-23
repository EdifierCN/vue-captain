<template>
  <div>
    <divider> 基本使用 </divider>
    <br>
    <divider> 横向滚动 </divider>
    <scroller lock-y :scrollbar-x=false>
      <div class="box1">
        <div class="box1-item" v-for="i in 7"><span>{{' ' + i + ' '}}</span></div>
      </div>
    </scroller>

    <divider> 有滚动条  </divider>
    <scroller lock-y scrollbar-x>
      <div class="box1">
        <div class="box1-item" v-for="i in 7"><span>{{' ' + i + ' '}}</span></div>
      </div>
    </scroller>

    <divider> 无回弹效果 </divider>
    <scroller lock-y scrollbar-x :bounce=false>
      <div class="box1">
        <div class="box1-item" v-for="i in 7"><span>{{' ' + i + ' '}}</span></div>
      </div>
    </scroller>

    <divider> 竖向滚动 scrollTop: {{scrollTop}}</divider>
    <scroller lock-x height="200px" @on-scroll="onScroll" ref="scrollerEvent">
      <div class="box2">
        <p v-for="i in 80">placeholder {{i}}</p>
      </div>
    </scroller>

    <button-cell type="primary" @click.native="$refs.scrollerEvent.reset({top:0})">reset</button-cell>

    <divider> 滚动到底部事件 </divider>
    <scroller lock-x height="200px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
      <div class="box2">
        <p v-for="i in bottomCount">placeholder {{i}}</p>
        <loadmore tip="loading"></loadmore>
      </div>
    </scroller>

    <divider> 有滚动条 </divider>
    <scroller lock-x scrollbar-y height="200px" ref="scroll">
      <div class="box2">
        <p v-for="i in 20" v-if="showList1">placeholder {{ i + '' + i }}</p>
        <p v-for="i in 10" v-if="!showList1">placeholder {{ i }}</p>
        <button-cell style="margin:10px 0;" type="primary" @click.native="onClickButton">{{ 'Button' }}</button-cell>
        <cell-group>
          <cell @click.native="onCellClick" title="Title" value="Value"></cell>
        </cell-group>
      </div>
    </scroller>
    <button-cell @click.native="changeList" type="primary">{{ 'show another list' }}</button-cell>

    <br>
    <br>
    <divider> 下拉刷新、上拉加载 </divider>
    <br>

    <divider> 下拉刷新 </divider>

    <scroller lock-x scrollbar-y use-pulldown :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}" height="200px" @on-pulldown-loading="load2" v-model="status1">
      <div class="box2">
        <p v-for="i in 80">占位 {{i}}</p>
      </div>
    </scroller>

    <divider>custom pulldown html template</divider>
    <scroller lock-x scrollbar-y use-pulldown height="200px" @on-pulldown-loading="load3" ref="demo3" v-model="status2">
      <!--content slot-->
      <div class="box2">
        <p v-for="i in 80">placeholder {{i}}</p>
      </div>

      <!--pulldown slot-->
      <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
        <span v-show="status2.pulldownStatus === 'default'"></span>
        <span class="pulldown-arrow" v-show="status2.pulldownStatus === 'down' || status2.pulldownStatus === 'up'" :class="{'rotate': status2.pulldownStatus === 'up'}">↓</span>
        <span v-show="status2.pulldownStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      </div>
    </scroller>

    <divider> 上拉加载 </divider>

    <scroller lock-x scrollbar-y use-pullup :pullup-config="pullupConfig2" height="200px" ref="demo4" @on-pullup-loading="load4">
      <div class="box2">
        <p v-for="i in n2">占位 {{i}}</p>
      </div>
    </scroller>

    <divider>使用v-model改变pullup状态</divider>
    <scroller lock-x scrollbar-y use-pullup :pullup-config="pullupConfig2" height="200px" ref="demo5" @on-pullup-loading="load5" v-model="demo3Value">
      <div class="box2">
        <p v-for="i in n3">占位 {{i}}</p>
      </div>
    </scroller>

    <p @click="demo3Value.pullupStatus='enabled'" v-show="n3 === 30">重新启用pullup</p>

    <divider>custom pullup html template</divider>
    <scroller lock-x scrollbar-y use-pullup height="200px" v-model="demo4Value" @on-pullup-loading="load6">
      <!--content slot-->
      <div class="box2">
        <p v-for="i in n4">placeholder {{i}}</p>
      </div>

      <!--pullup slot-->
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
        <span v-show="demo4Value.pullupStatus === 'default'"></span>
        <span class="pullup-arrow" v-show="demo4Value.pullupStatus === 'default' || demo4Value.pullupStatus === 'up' || demo4Value.pullupStatus === 'down'" :class="{'rotate': demo4Value.pullupStatus === 'down'}">↑</span>
        <span v-show="demo4Value.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      </div>
    </scroller>

    <divider>更多组合</divider>
    <scroller lock-x scrollbar-y use-pullup use-pulldown height="200px" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status3" ref="scroller">
      <div class="box2">
        <p v-for="i in n">placeholder {{i}}</p>
      </div>
      <!--pullup slot-->
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
        <span v-show="status3.pullupStatus === 'default'"></span>
        <span class="pullup-arrow" v-show="status3.pullupStatus === 'down' || status3.pullupStatus === 'up'" :class="{'rotate': status3.pullupStatus === 'up'}">↑</span>
        <span v-show="status3.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      </div>
    </scroller>
    <cell-group>
      <switch-cell :title="pullupEnabled ? '禁用Pullup' : '启用Pullup'" :value="true" @on-change="changePullupStatus"></switch-cell>
    </cell-group>

    <divider>上拉加载重置</divider>
    <scroller lock-x scrollbar-y use-pullup height="200px" @on-pullup-loading="loadMore1" ref="scroller1">
      <div class="box2">
        <p v-for="j in n1">placeholder {{j}}</p>
      </div>
    </scroller>

  </div>
</template>

<script>
  import { Scroller } from '../../ui/components/scroller'
  import { Divider } from '../../ui/components/divider'
  import { Spinner } from '../../ui/components/spinner'
  import { ButtonCell } from '../../ui/components/button'
  import { SwitchCell } from '../../ui/components/switch'
  import { CellGroup, Cell } from '../../ui/components/cell'
  import { Loadmore } from '../../ui/components/loadmore'

  export default {
    components: {
      Scroller,
      Divider,
      Spinner,
      ButtonCell,
      SwitchCell,
      CellGroup,
      Cell,
      Loadmore
    },
    data () {
      return {
        showList1: true,
        scrollTop: 0,
        onFetching: false,
        bottomCount: 20,

        n1: 10,
        status: {
          pulldownStatus: 'default'
        },
        status1: {
          pulldownStatus: 'default'
        },
        status2: {
          pulldownStatus: 'default'
        },

        demo4Value: {
          pullupStatus: 'default'
        },
        n2: 10,
        n3: 10,
        n4: 10,
        demo3Value: {
          pullupStatus: ''
        },
        pullupConfig2: {
          content: '上拉加载更多',
          downContent: '松开进行加载',
          upContent: '上拉加载更多',
          loadingContent: '加载中...'
        },

        n: 10,
        pullupEnabled: true,
        status3: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        }

      }
    },
    mounted () {
      this.$nextTick(() => {
        this.$refs.scrollerEvent.reset({top: 0})
      });
      this.$nextTick(() => {
        this.$refs.scrollerBottom.reset({top: 0})
      })
    },
    methods: {
      onScrollBottom () {
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true;
          setTimeout(() => {
            this.bottomCount += 10;
            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset()
            });
            this.onFetching = false
          }, 2000)
        }
      },
      onScroll (pos) {
        this.scrollTop = pos.top
      },
      onCellClick () {
        window.alert('cell click')
      },
      onClickButton () {
        window.alert('click')
      },
      changeList () {
        this.showList1 = !this.showList1;
        this.$nextTick(() => {
          this.$refs.scroll.reset({
            top: 0
          })
        })
      },

      load2 () {
        setTimeout(() => {
          this.status1.pulldownStatus = 'default'
        }, 2000)
      },
      load3 () {
        setTimeout(() => {
          this.$refs.demo3.donePulldown()
        }, 2000)
      },

      load4 () {
        setTimeout(() => {
          this.n2 += 10
          setTimeout(() => {
            this.$refs.demo5.donePullup()
          }, 100)
          if (this.n2 === 30) { // unload plugin
            setTimeout(() => {
              this.$refs.demo5.disablePullup()
            }, 100)
          }
        }, 2000)
      },
      load5 () {
        setTimeout(() => {
          this.n3 += 10
          setTimeout(() => {
            this.demo3Value.pullupStatus = 'default'
          }, 100)
          console.log('demo3value', JSON.stringify(this.demo3Value))
          if (this.n3 === 30) { // unload plugin
            setTimeout(() => {
              this.demo3Value.pullupStatus = 'disabled'
            }, 100)
          }
        }, 2000)
      },
      load6 () {
        setTimeout(() => {
          this.n4 += 10
          setTimeout(() => {
            this.demo4Value.pullupStatus = 'default'
          }, 10)
        }, 2000)
      },

      loadMore () {
        setTimeout(() => {
          this.n += 10
          setTimeout(() => {
            this.$refs.scroller.donePullup()
          }, 10)
        }, 2000)
      },
      refresh () {
        setTimeout(() => {
          this.n = 10
          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs.scroller.donePulldown()
              this.pullupEnabled && this.$refs.scroller.enablePullup()
            }, 10)
          })
        }, 2000)
      },
      changePullupStatus (enabled) {
        if (enabled) {
          this.$refs.scroller.enablePullup()
          this.pullupEnabled = true
        } else {
          this.$refs.scroller.disablePullup()
          this.pullupEnabled = false
        }
      },
      loadMore1 () {
        setTimeout(() => {
          this.n1 += 10
          this.$nextTick(() => {
            this.$refs.scroller1.donePullup()
            if (this.n1 >= 30) {
              this.$refs.scroller1.disablePullup()
              console.log('No more data, Pullup disabled!')
            }
          })
        }, 2000)
      }

    }
  }
</script>

<style scoped>
  .box1 {
    height: 100px;
    position: relative;
    width: 1490px;
  }
  .box1-item {
    width: 200px;
    height: 100px;
    background-color: #ccc;
    display:inline-block;
    margin-left: 15px;
    float: left;
    text-align: center;
    line-height: 100px;
  }
  .box1-item:first-child {
    margin-left: 0;
  }
  .box2-wrap {
    height: 300px;
    overflow: hidden;
  }

  .box1 {
    height: 100px;
    position: relative;
    width: 1490px;
  }
  .box1-item {
    width: 200px;
    height: 100px;
    background-color: #ccc;
    display:inline-block;
    margin-left: 15px;
    float: left;
    text-align: center;
    line-height: 100px;
  }
  .box1-item:first-child {
    margin-left: 0;
  }
  .box2-wrap {
    height: 300px;
    overflow: hidden;
  }
  .rotate {
    transform: rotate(-180deg);
  }
  .pulldown-arrow {
    display: inline-block;
    transition: all linear 0.2s;
    color: #666;
    font-size: 25px;
  }

  .box1 {
    height: 100px;
    position: relative;
    width: 1490px;
  }
  .box1-item {
    width: 200px;
    height: 100px;
    background-color: #ccc;
    display:inline-block;
    margin-left: 15px;
    float: left;
    text-align: center;
    line-height: 100px;
  }
  .box1-item:first-child {
    margin-left: 0;
  }
  .box2-wrap {
    height: 300px;
    overflow: hidden;
  }
  .rotate {
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
  }
  .pullup-arrow {
    display: block;
    transition: all linear 0.2s;
    -webkit-transition: all linear 0.2s;
    color: #666;
    font-size: 25px;
  }
</style>
