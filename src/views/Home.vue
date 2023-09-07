<!--
地图图层
MapLayer -->
<template>
  <div id="home">
    <div id="baseMap"></div>
  </div>
</template>

<script>
import Map from 'ol/Map'
import View from 'ol/View'
import { defaults as Defaults } from 'ol/control.js'
import { Image as ImageLayer } from 'ol/layer';
import { ImageWMS } from 'ol/source';
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import bus from '@/utils/eventBus.js'

export default {
  data() {
    return {
      // 地图实例对象
      map: null,
      chongyuxian: '20201',
      chongyu_layer: {}
    }
  },
  created() {
    bus.$on('shareYear', val => {
      this.chongyuxian = val + '1'
      if (this.chongyuxian == '20191') {
        this.chongyuxian = 20202
      }    //仅用在测试
      // console.log(this.chongyuxian)
      //冲淤图层
      // const chongyuxian=this.chongyuxian
      // console.log(this.chongyuxian)
      if (this.map != null) {
        this.map.removeLayer(this.chongyu_layer)
      }
      this.chongyu_layer = new ImageLayer({
        source: new ImageWMS({
          ratio: 1, //设置为 1 
          url: 'http://101.43.222.186:5000/geoserver/yellowriver/wms',
          // service=WMS&version=1.1.0&request=GetMap&layers=nurc%3AImg_Sample
          // &bbox=-130.85168%2C20.7052%2C-62.0054%2C54.1141
          // &width=768&height=372&srs=EPSG%3A4326&styles=&format=application/openlayers
          params: {
            //   SERVICE: 'WMS',
            REQUEST: 'GetMap',
            LAYERS: `yellowriver:${this.chongyuxian}`,
            //   STYLES: '',
            VERSION: '1.1.0',
            //   FORMAT: 'image/jpeg',// 这个参数设置不对 不显示
            // SRS: 'EPSG:4326', 
            BBOX: [366754.90200000256, 3852698.397, 597086.1340000033, 3920569.423]
          },//根据图层发布的坐标系更改
          serverType: 'geoserver',
        })
      });
      if (this.map != null) {
        this.map.addLayer(this.chongyu_layer)
      }
      // console.log(this.chongyu_layer)
      // this.chongyuxian=this.chongyu_layer.values_.source.params_.LAYERS.slice(-5)
      // console.log(this.chongyuxian)
    })
  },
  mounted() {
    // 窗口拖拉，更新地图大小
    // window.addEventListener('resize', () => {
    //   if (this.map) {
    //     this.map.updateSize()
    //   }
    // })
    this.$nextTick(() => {
      this.initMap()
    })
  },
  methods: {
    // 加载地图
    initMap() {
      // T=vec_c表示请求的是路网数据，x 表示切片的 x 轴坐标，y 表示切片的y轴坐标，z表示切片所在的缩放级别。
      // 使用 ol.source.XYZ 加载切片，并将获取的数据初始化一个切片图层 ol.layer.Tile：
      // 天地图底图
      var source = new XYZ({
        url: 'https://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=a2db82ff5253ddeeec10a6b79592fea7'
      })
      var tileLayer = new TileLayer({
        title: '天地图',
        source: source
      })
      // 标注图层(就是我们所看见的行政区名称，道路)
      var sourceMark = new XYZ({
        url: 'https://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=a2db82ff5253ddeeec10a6b79592fea7'
      })
      var tileMark = new TileLayer({
        title: '标注图层',
        source: sourceMark
      })


      this.map = new Map({
        target: 'baseMap', // 地图容器 对应id
        layers: [tileLayer, tileMark], // 图层
        view: new View({ // 视图
          projection: 'EPSG:4326', // 坐标系
          // 初始化地图中心 可以去地图坐标拾取网站获取想要的坐标
          center: [113.7918, 34.9445],
          // 缩放
          zoom: 10,
          // 最大缩放
          maxZoom: 18,
          // 最小缩放
          minZoom: 1
        }),
        // 地图自带控件，这里我们不需要，后续自己做类似功能
        controls: new Defaults({
          zoom: false,
          rotate: false
        })
      })
      // // 将地图对象抛出去
      // this.$emit('getMap', this.map)
    }
  }
}
</script>

<style lang='less' scoped>
.box,
#baseMap {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
}
</style>