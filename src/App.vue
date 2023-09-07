<template>
  <div class="box">
    <Navmenu></Navmenu>
    <Home></Home>
    <router-link to="/home"></router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import Home from '@/views/Home.vue'
import Navmenu from '@/views/Navmenu.vue';
export default {
  components:{
    Home,
    Navmenu,
  },
  created() {
      if (this.$router.path !== "/home") //刷新页面时如果此时不在首页，则返回首页
        this.$router.replace("home")
    }
}
</script>

<style lang="less">
@import '@/assets/css/reset.css';

</style>
