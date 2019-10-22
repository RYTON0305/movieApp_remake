<template>
<div class="cont">
<div id="tabbar" >
    <ul>
      <router-link tag='li' to='/movie'>
        <i class="iconfont icon-dianying"></i>
        <br />电影
      </router-link>
      <router-link tag='li' to="/cinema">
        <i class="iconfont icon-huabankaobei"></i>
        <br />影院
      </router-link>
      <router-link tag='li' to="/mine">
        <i class="iconfont icon-weibiaoti--"></i>
        <br />我的
      </router-link>
    </ul>
  </div>
</div>
  
</template>

<script>
export default {
  name: "Tabbar"
};
</script>

<style scoped>
.cont {
  height: 50px;
}
#tabbar {
  position:fixed;
  bottom: 0;
  /* z-index: 999; */
  height: 50px;
  width: 100%;
  background-color: #fff;
  box-shadow: #eee 0 0px 10px 0px;
}
ul {

  height: 100%;
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  padding: 0;
  margin: 0;
}
li {
  padding: 5px 0;
  height: 100%;
  flex: 1;
  text-align: center;
  font-size: 14px;
}
.iconfont {
  font-size: 20px;
  line-height: 25px;
}
 .router-link-active {
   color: #F39C12
  }
</style>