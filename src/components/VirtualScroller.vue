<template>
  <div
    id="virtual-list"
    ref="scroller"
    class="virtual-scroll-list-container"
    @scroll="scrollEvent($event)"
    @touchstart="touchstartHandle"
    @touchmove="touchmoveHandle"
    @touchend="touchendHandle"
  >
    <div
      class="virtual-scroll-list-phantom"
      :style="{
        'min-height': minListHeight + (enableScrollUp ? 40 : 0) + 'px',
      }"
    />
    <div
      ref="actualContentRef"
      class="virtual-scroll-list"
      :style="{ transform: getTransform }"
    >
      <div v-show="isShow.isRefresh" ref="refresh" class="refresh">
        <div class="flex justify-center align-center">
          <span class="circle-rotate" />
          <span> 重新整理 </span>
        </div>
      </div>
      <slot
        v-for="item in visibleData"
        :start="start"
        :index="getCache(item[uniKey]).index"
        :end="end"
        :uniKey="uniKey"
        :item="item"
        :height="getCache(item[uniKey]).height"
      />
      <div v-show="isShow.isLoading" class="load m-t-4">
        <div class="flex justify-center align-center">
          <span class="circle-rotate" />
          <span> 加载中 </span>
        </div>
      </div>
      <span v-if="!isChatMode" class="finished-text">
        <slot name="finishedText">没有更多内容</slot>
      </span>
    </div>
  </div>
</template>

<script>
import { scrollElementToBottom, debounce } from "@/utils";

export default {
  name: "VirtualList",
  props: {
    // 所有列表数据
    list: {
      type: Array,
      default: () => [],
    },
    // 每项预设的高度
    itemDefaultHeight: {
      type: Number,
      default: 200,
    },
    // 唯一值
    uniKey: {
      type: String,
      default: function () {
        return "seq";
      },
      required: false,
    },
    // 可视范围外多渲染几笔
    bufferSize: {
      type: Number,
      default: 0,
    },
    isChatMode: {
      type: Boolean,
      required: false,
      default: function () {
        return false;
      },
    },
    enableScrollDown: {
      // 开启上拉功能  refresh
      type: Boolean,
      required: false,
      default: function () {
        return false;
      },
    },
    enableScrollUp: {
      // 开启下拉功能 loading
      type: Boolean,
      required: false,
      default: function () {
        return false;
      },
    },
    autoLoadMore: {
      // 自动捲到最底就刷新 / 捲到定点，在上拉才刷新
      type: Boolean,
      required: false,
      default: function () {
        return true;
      },
    },
  },
  data() {
    return {
      // scrollTop: 0, // 卷軸位址
      lastScrollTop: 0, // 紀錄最後卷軸位址
      isScrolling: false,
      isLoadMoreEnd: false,

      // 列表预估总高度
      minListHeight: 0,
      // 可视区域高度
      screenHeight: 0,
      // 起始索引
      start: 0,
      // 结束索引
      end: null,
      // 快取高度
      cachedPositions: [],
      // 每一项只记算一次动态高度
      calculateOnce: true,
      // 是不是己捲动到最下面
      autoScrollLoaded: false,

      firstRender: false,

      refreshLoginStatus: "normal", // 组件当前状态：正常浏览模式normal，下拉刷新模式refresh，上拉加载模式loading
      isShow: {
        // 加载动划控制开关
        isRefresh: false,
        isLoading: false,
      },
      startPos: {
        // 手指初始按压位置
        pageY: 0,
        pageX: 0,
      },
      dis: {
        // 手移动距离
        pageY: 0,
        pageX: 0,
      },
      last: {
        pageY: 0,
        pageX: 0,
      },
    };
  },
  computed: {
    // 预期可视范围可显示的列表数
    visibleCount() {
      return Math.ceil(this.screenHeight / this.itemDefaultHeight);
    },
    // 偏移量对应的style
    getTransform() {
      const currentCachedPositions = this.cachedPositions[this.start - 1];

      return `translate3d(0,${
        this.start >= 0 && currentCachedPositions
          ? currentCachedPositions.bottom
          : 0
      }px,0)`;
    },
    // 获取可视范围的资料笔数
    visibleData() {
      if (this.cachedPositions.length === 0) {
        return [];
      }

      return this.list.slice(this.start, this.end + 1);
    },
  },
  watch: {
    list: {
      handler(val) {
        if (val) {
          this.init();
        }

        this.isLoadMoreEnd = false;
      },
      immediate: false,
      deep: true,
    },
  },
  mounted() {
    this.init();
  },
  // activated生命钩子在keep-alive被激活时调用
  activated() {
    // 如果曾滚动过,则还原位置
    if (this.lastScrollTop) {
      const page = this.$refs.scroller;
      page.scrollTop = this.lastScrollTop;
    }
  },

  updated() {
    // 当每一次 component 更新时重新计算一下，目前渲染出来的项目高度，放进 cache 计算
    const that = this;

    if (that.$refs.actualContentRef.childElementCount > 0) {
      const childNodes = that.$refs.actualContentRef.childNodes;

      that.hasLastNode = false;

      childNodes.forEach((node) => {
        if (!node || !node.id || node.id.indexOf("-") === -1) {
          return;
        }

        const elementIdArray = node.id.split("-");

        if (elementIdArray.length === 2) {
          const elementId = Number(elementIdArray[1]);

          if (elementId) {
            const currentCachedPositions = that.cachedPositions.find(
              (x) => x.id === elementId
            );

            if (currentCachedPositions) {
              if (currentCachedPositions.isLast === true) {
                that.hasLastNode = true;
              }
            }
            // 每个 item的高度只会重算一次
            if (
              that.calculateOnce &&
              currentCachedPositions.updated &&
              currentCachedPositions.updated === true
            ) {
              return;
            }

            const rect = node.getBoundingClientRect();
            const { height } = rect;

            const oldHeight = currentCachedPositions.height;
            const dValue = oldHeight - height;

            if (dValue) {
              currentCachedPositions.bottom -= dValue;
              currentCachedPositions.top -= dValue;
              currentCachedPositions.height = height;
              currentCachedPositions.dValue = dValue;
              currentCachedPositions.updated = true;
              that.minListHeight -= dValue;

              for (
                let i = currentCachedPositions.index;
                i < that.cachedPositions.length;
                i++
              ) {
                const cacheItem = that.cachedPositions[i];

                if (cacheItem) {
                  cacheItem.top -= dValue;
                  cacheItem.bottom -= dValue;
                }
              }
            }
          }
        }
      });

      if (that.isChatMode) {
        that.$nextTick(function () {
          if (that.firstRender === false) {
            that.firstRender = true;
            that.$refs.scroller.scrollTop = that.$refs.scroller.scrollHeight;
          } else if (that.autoScrollLoaded === false) {
            scrollElementToBottom("virtual-list");
            if (that.hasLastNode) {
              that.autoScrollLoaded = true;
            }
          }
        });
      }
    }
  },

  methods: {
    init() {
      this.autoScrollLoaded = false;
      this.initCachedPositions();
      this.initPosition();
      this.screenHeight =
        this.$el.clientHeight || this.$el.parentElement.clientHeight;
      this.scrollEvent();

      // 给 list 预设的高度
      this.minListHeight = this.list.length * this.itemDefaultHeight;
    },
    touchstartHandle(e) {
      // 记录起始位置 和 组件距离window顶部的高度
      this.startPos.pageY = e.touches[0].pageY;
      this.startPos.pageX = e.touches[0].pageX;
      // 内容页在可视视窗最顶端或者在指定的位置（父级元素的顶部）
    },
    touchmoveHandle(e) {
      const disY = e.touches[0].pageY - this.startPos.pageY;
      const disX = e.touches[0].pageX - this.startPos.pageX;
      // for android 預設下拉刷新的問題
      if (this.isAndroid) {
        this.preventAndriodRefreshEevnt(e);
      }

      this.last.pageY = e.changedTouches[0].pageY;
      this.last.pageX = e.changedTouches[0].pageX;

      if (disX > 100 && !this.isScrolling) {
        this.dis.pageX = disX;
        this.$emit("scrollRight");
        this.refreshLoginStatus = "right";
      } else if (disX < -100 && !this.isScrolling) {
        this.$emit("scrollLeft");
        this.refreshLoginStatus = "left";
      } else {
        if (this.$refs.scroller.scrollTop <= 0 && disY > 100) {
          this.dis.pageY = disY;
          this.refreshLoginStatus = "refresh";
          this.refreshMove(disY, e);
        } else if (disY < 100) {
          /* //触发上拉加载 */
          if (this.isShow.isLoading) return;
          this.refreshLoginStatus = "loading";
          this.loadingMove(disY);
        }
      }
    },

    preventAndriodRefreshEevnt(e) {
      // 阻止 android 原生事件
      var direction = e.changedTouches[0].pageY > this.last.pageY ? 1 : -1;

      const scrollTop = this.$refs.scroller.scrollTop;

      if (direction > 0 && scrollTop <= 0) {
        e.preventDefault();
      }
    },
    // eslint-disable-next-line no-unused-vars
    loadingMove(dis) {
      // 计算内容页底部距离可视视窗顶部的距离
      if (this.enableScrollUp && !this.autoLoadMore) {
        const disToTop =
          this.$refs.actualContentRef.getBoundingClientRect().bottom;

        // 计算可视视窗的高度
        const clientHeight = document.documentElement.clientHeight;
        if (disToTop <= clientHeight) {
          if (this.refreshLoginStatus === "loading" && this.dis.pageY < 0) {
            this.isShow.isLoading = true;
          }
        }
      }
    },
    refreshMove(dis, e) {
      if (this.enableScrollDown) {
        if (this.isShow.isRefresh) return;
        if (this.refreshLoginStatus === "refresh" && this.dis.pageY > 0) {
          // 下拉刷新成立条件

          this.isShow.isRefresh = true;
          // 下拉到一定距离后，内容页不随touchmove移动
          this.$refs.actualContentRef.style.transform = `translateY(${
            dis < 8 ? dis : 8
          }px)`;

          // for android 預設下拉刷新的問題
          if (this.isAndroid) {
            e.preventDefault();
          }
        }
      }
    },

    touchendHandle(e) {
      if (
        this.refreshLoginStatus === "left" ||
        this.refreshLoginStatus === "right"
      ) {
        this.isShow.isRefresh = false;
        this.isShow.isLoading = false;
      }

      this.refreshLoginStatus === "refresh" && this.refreshToucnend(e);
      this.refreshLoginStatus === "loading" && this.loadingTouchend(e);
    },
    // eslint-disable-next-line no-unused-vars
    refreshToucnend(e) {
      // 加上限定条件，防止不在刷新状态，后面的代码执行
      if (!this.isShow.isRefresh) return;
      // 必须下拉一定距离，才进行异步加载数据
      this.dis.pageY > 10 && this.$emit("scrollDown");

      // 松手后加载动划消失，并且内容页回到原位置
      this.isShow.isRefresh = false;
      this.$refs.actualContentRef.style.transform = `translateY(0px)`;
      this.refreshLoginStatus = "normal";
    },
    // eslint-disable-next-line no-unused-vars
    loadingTouchend(e) {
      // 加上限定条件，防止不在刷新状态，后面的代码执行
      if (!this.isShow.isLoading) return;

      if (this.isLoadMoreEnd === false) {
        this.$emit("scrollUp");

        this.isLoadMoreEnd = true;
      }
      this.isShow.isLoading = false;
      this.refreshLoginStatus = "normal";
    },

    getCache(uniId) {
      const cache = this.cachedPositions.find((x) => x.id === uniId);
      return cache;
    },

    initPosition() {
      if (this.isChatMode) {
        this.end = this.list.length;

        var range = this.visibleCount + this.bufferSize;

        if (this.end - range < 0) {
          this.start = 0;
        } else {
          this.start = this.end - range;
        }
      } else {
        this.start = 0;
        this.end = this.start + this.visibleCount + this.bufferSize;
      }
    },
    // 依照预设每一笔资料都给计算 bottom 及给预设高度
    initCachedPositions() {
      const { itemDefaultHeight } = this;
      this.cachedPositions = [];
      for (let i = 0; i < this.list.length; ++i) {
        this.cachedPositions[i] = {
          id: this.list[i][this.uniKey],
          index: i,
          height: itemDefaultHeight,
          top: i * itemDefaultHeight,
          bottom: (i + 1) * itemDefaultHeight,
          dValue: 0,
          isLast: i + 1 === this.list.length,
        };
      }
    },
    scrollEvent(e) {
      // 当前滚动位置
      const scrollTop = this.$refs.scroller.scrollTop;

      // 绑定事件,滚动时,储存位置到this.scrollTop
      this.lastScrollTop = scrollTop;

      // 處理滑動不可以切換tab
      this.isScrolling = true;
      var scroll;
      clearTimeout(scroll);
      scroll = setTimeout(() => {
        this.isScrolling = false;
      }, 100);

      let index = 0;
      // 此时的开始索引
      const currentCachePostion = this.cachedPositions.filter(
        (x) => scrollTop < x.bottom
      )[0];

      if (currentCachePostion) {
        index = currentCachePostion.index;
      }

      if (index === 0) {
        this.start = 0;
        this.end = index + this.visibleCount + this.bufferSize;
      }

      // 此时的结束索引
      this.start = index - this.bufferSize;
      this.end = index + this.visibleCount + this.bufferSize;

      if (this.list.length > 0 && this.end >= this.list.length) {
        // 自动加载
        if (this.enableScrollUp && this.autoLoadMore) {
          this.isShow.isLoading = true;
          this.loadingTouchend(e);
        }

        this.end = Math.max(this.list.length, this.visibleCount);
        this.start = Math.min(
          this.end - this.visibleCount - this.bufferSize,
          0
        );
      }

      if (this.start < 0) this.start = 0; // 起始筆
    },
    debounceScroll(e) {
      debounce(() => {
        this.scrollEvent(e);
      }, 16.6); // 60Hz
    },
  },
};
</script>

<style scoped lang="scss">
.virtual-scroll-list-container {
  z-index: 1;

  position: relative;
  overflow: auto;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  
  .virtual-scroll-list-phantom {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: -1;
  }

  .virtual-scroll-list {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 998;
  }

  .circle-rotate {
    position: relative;
    border: 10px solid #ccc;
    border-right-color: transparent;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: loadingAnimation 0.75s infinite;
  }

  @keyframes loadingAnimation {
    0% {
      transform: translateX(-50%) rotate(0deg);
    }

    100% {
      transform: translateX(-50%) rotate(360deg);
    }
  }

  .finished-text {
    display: block;
    padding: 24px 0 32px 0;
    font-size: 22px;
    text-align: center;
    color: #7b7c96;
  }

  .disable-hover {
    pointer-events: none;
  }
}
</style>
