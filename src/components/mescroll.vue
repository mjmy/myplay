<template>
  <div>
    <!--mescroll滚动区域的基本结构-->
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <!--内容...-->
      <ul>
        <li v-for="(item, key) in dataList" :key="key">
          <div>{{ item["LangName"] }}</div>
        </li>
      </ul>
    </mescroll-vue>
  </div>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  components: {
    MescrollVue // 注册mescroll组件
  },
  data() {
    return {
      mescroll: null, // mescroll实例对象
      mescrollDown: {
        callback: this.downCallback
      }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: {
        // 上拉加载的配置.
        inited: this.inited,
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        auto: false,
        warpClass: "mescroll-upwarp",
        //以下是一些常用的配置,当然不写也可以的.
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        page: {
          num: 19, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 10 //每页数据条数,默认10
        },
        offset: 100,
        empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: "xxid", //父布局的id (1.3.5版本支持传入dom元素)
          icon: "../img/mescroll-empty.png", //图标,默认null,支持网络图
          tip: "暂无相关数据~" //提示
        }
      },
      dataList: []
    };
  },
  mounted() {
    let url = "http://jcg999.ybzp666.com//gateway.php";
    let payload = {
      c: 177,
      d: {
        gcode: "JDB", //遊戲代碼
        itype: "2", //遊戲分類
        uuid: null
      }
    };
    this.$http.post(url, payload).then(result => {
      console.log(result);
      this.dataList = result.data.d;
    });
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
      this.mescroll.hideUpScroll(false);
    },
    inited(mescroll, upwarp) {},
    downCallback(mescroll) {
      setTimeout(() => {
        this.mescroll.endSuccess();
      }, 1000);
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      console.log(page, mescroll);
      let self = this;
      // 联网请求
      let url = "https://m.jcgdemo.com/gateway.php";
      let payload = {
        c: 177,
        d: {
          gcode: "JDB", //遊戲代碼
          itype: "2", //遊戲分類
          uuid: ""
        }
      };
      this.$http
        .post(url, payload)
        .then(result => {
          console.log(result);
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            // self.mescroll.endSuccess(result.data.length)
            // self.mescroll.optUp;
            // mescroll.endUpScroll(true)
            setTimeout(() => {
              // this.mescroll.showNoMore();
              this.mescroll.endSuccess(19, false);
              // this.mescroll.endUpScroll(false)
              // this.mescroll.endDownScroll();
            }, 500);

            // this.mescroll.showEmpty();
            // setTimeout(()=>{
            // this.mescroll.hideUpScroll(true);
            // this.mescroll.endUpScroll()
            // this.mescroll.endErr()
            // },600)
          });
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          self.mescroll.endErr();
        });
    }
  }
};
</script>

<style>
.mescroll {
  position: fixed;
  top: 100px;
  bottom: 0;
  height: auto;
}
.upwarp-nodata {
}
</style>
