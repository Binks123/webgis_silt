<template>
  <div>
    <Chongyuecharts></Chongyuecharts>
    <div id="slider">
      <div class="block">
        <span class="demonstration">年份</span>
        <el-slider v-model="value" :step="1" show-stops :min="2019" :max="2021" @input="changeValue">
        </el-slider>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/utils/eventBus.js'
import Chongyuecharts from '@/components/Chongyuecharts.vue';
export default {
  name: 'Slider',
  components: {
    Chongyuecharts
  },
  data() {
    return {
      value: 2019
    };
  },
  created() {

  },
  mounted() {
    bus.$emit('shareYear', 2019)
  },

  methods: {
    changeValue(value) {
      // console.log(value)
      bus.$emit('shareYear', value)
    }
  },
};
</script>

<style lang="less" scoped>
#slider {
  position: fixed;
  /* 固定定位，使导航栏脱离文档流 */
  bottom: 5%;
  left: 25%;
  right: 25%;
  z-index: 10;
}

.demonstration {
  color: white
}
</style>