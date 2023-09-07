<template>
  <div id="chongyuechart">
    <div id="chongyuecharts"></div>
  </div>
</template>

<script>
import bus from '@/utils/eventBus.js'
export default {
  name: 'Chongyuecharts',

  data() {
    return {
      myChart: null, //图表
      chongyulist: [],
      xdata: [],
      chongyuSeries: [],
      chongyuxian_chongyuecharts: '20201',
    };
  },

  created() {
    bus.$on('shareYear', val => {
      this.chongyuxian_chongyuecharts = val + '1'
      if (this.chongyuxian_chongyuecharts == '20191') {
        this.chongyuxian_chongyuecharts = 20202
      }    //仅用在测试
      this.xdata = []
      this.chongyulist = []
      this.chongyuSeries = []
      this.$http(`http://101.43.222.186:5000/geoserver/yellowriver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=yellowriver:${this.chongyuxian_chongyuecharts}&maxFeatures=151&outputFormat=application/json`).then(res => {
        // console.log(this.chongyuxian_chongyuecharts)
        let data = res.data
        this.chongyulist = data.features
        // console.log(this.chongyulist)

        var chartDom = document.getElementById('chongyuecharts');
        this.$echarts.dispose(chartDom); //dispose 方法则是彻底释放ECharts实例占用的所有资源，包括DOM、事件、定时器等,销毁上一个实例。
        this.myChart = this.$echarts.init(chartDom);

        var option;
        option = {
          tooltip: {
            trigger: 'axis'
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          color: ['red'],
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], //test值
            axisLabel: {
              textStyle: {
                color: 'red' // 将 x 轴上的文字设置为红色
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              textStyle: {
                color: 'red' // 将 y 轴上的文字设置为红色
              }
            }
          },
          grid: {
            left: 60,
            // containLabel: true //设置containLabel: true防止标签溢出，计算距离时候会计算容器边到标签的距离，否则计算容器边缘到刻度线的距离。
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260], //test值
              type: 'line'
            }
          ]
        };
        // console.log(this.chongyulist)
        this.xdata = [] //先把这次xdata和chongyuSeries归零，因为shareYear传了两次数据
        this.chongyuSeries = []

        this.chongyulist.forEach(item => {
          this.xdata.push(item.id.slice(6))
          // this.chongyuSeries.push(item.properties.name)
          this.chongyuSeries.push(item.properties.c)
        })
        // console.log(this.xdata)
        // console.log(this.chongyuSeries)
        option.xAxis.data = this.xdata
        option.series[0].data = this.chongyuSeries
        this.myChart.setOption(option);
      })
    })
  },
  mounted() {
    window.addEventListener('resize', this.resizeHandle); /* 窗口变化时自适应 步骤一:监听窗口变化 */
  },
  destroyed() {
    /* 窗口变化时自适应 步骤三 组件被注销时，缩放函数是匿名函数，且仍然在事件监听列表中，
    因此匿名函数和匿名函数中用到的外部变量在组件注销后均不会被清理。
    所以要手动清理 */
    window.removeEventListener('resize', this.resizeHandle)
  },
  methods: {
    resizeHandle() {
      this.myChart.resize() /* 窗口变化时自适应 步骤二 调用echart的 resize() */
    }
  },
};
</script>

<style lang="less" scoped>
#chongyuechart {
  width: 30vw;
  height: 30vw;
  position: fixed;
  /* 固定定位，使导航栏脱离文档流 */
  top: 15%;
  /* 将导航栏置于页面顶部 */
  left: 1%;
  right: 0;
  z-index: 10;
  /* 将 z-index 设置为较高的数值，确保导航栏在最上层 */
}

#chongyuecharts {
  width: 30vw;
  height: 30vw;
  // position: fixed; /* 固定定位，使导航栏脱离文档流 */
  // top: 15%; /* 将导航栏置于页面顶部 */
  // left: 1%;
  // right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  /* 将 z-index 设置为较高的数值，确保导航栏在最上层 */
}
</style>