<template>
  <div id="navmenu">
    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
      background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <router-link to="/slider"><el-menu-item index="1">冲淤量展示</el-menu-item></router-link>
      <el-submenu index="2">
        <template slot="title">分析工具(开发中)</template>
        <el-menu-item index="2-1">冲淤量查询</el-menu-item>
        <el-menu-item index="2-2">导出地图</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">切换底图</template>
          <el-menu-item index="2-4-1">瓦片</el-menu-item>
          <el-menu-item index="2-4-2">影像</el-menu-item>
          <el-menu-item index="2-4-3">地形</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import bus from '@/utils/eventBus.js'

export default {
  name: 'Navmenu',

  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
    };
  },
  created() {

  },
  mounted() {
  },

  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less" scoped>
#navmenu {
  position: fixed;
  /* 固定定位，使导航栏脱离文档流 */
  top: 0;
  /* 将导航栏置于页面顶部 */
  left: 0;
  right: 0;
  z-index: 10;
  /* 将 z-index 设置为较高的数值，确保导航栏在最上层 */
}

.el-menu.el-menu--horizontal {
  border-bottom: 0;
}

.el-menu {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-menu-item {
  flex: none;
  margin: 0 16px;
}
</style>