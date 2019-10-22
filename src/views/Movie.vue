<template>
  <div id="main">
    <Header title="电影"></Header>
    <div id="wrapper">
      <div class="cont">
        <div id="fixfix">
          <ul class="nav">
            <router-link tag="li" to="/movie/city">
              {{$store.state.city.nm}}
              <i class="iconfont icon-sanjiaoxing"></i>
            </router-link>
            <router-link tag="li" to="/movie/nowplaying">正在热映</router-link>
            <router-link tag="li" to="/movie/comingsoon">即将上映</router-link>
            <router-link tag="li" to="/movie/search">
              <i class="iconfont icon-sousuo"></i>
            </router-link>
          </ul>
        </div>
      </div>

      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <Tabbar />
    <router-view name="detail"></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Tabbar from "@/components/Tabbar";

export default {
  name: "Movie",
  components: {
    Header,
    Tabbar
  },
 
  methods: {}
};
</script>

<style scoped>


#main {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
#wrapper {
  flex: 1;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
#fixfix {
  width: 100%;
  height: 50px;
  position: fixed;
  top: 50px;
}
.cont {
  height: 50px;
}
.nav {
  display: flex;
  height: 50px;
  border-bottom: 1px solid #eee;
  font-family: "微软雅黑";
  font-size: 15px;
  font-weight: 700;
}
.nav li {
  flex: 1;
  text-align: center;
  line-height: 50px;
}
.nav li:last-child,
.nav li:first-child {
  flex: 0.8;
}
.icon-sanjiaoxing {
  font-size: 10px;
}
.icon-sousuo {
  font-size: 20px;
}
.router-link-active {
  color: #f39c12;
  border-bottom: #f39c12 solid 3px;
}
</style>