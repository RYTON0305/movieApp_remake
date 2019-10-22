<template>
  <div id="main">
    <Header title="我的"></Header>
    <div id="content">
      <div class="login_body">
        <div>
          <input class="login_text" type="text" placeholder="账户名/手机号/Email" />
        </div>
        <div>
          <input class="login_text" type="text" placeholder="请输入您的密码" />
        </div>
      </div>
      <button id="login_btn">登录</button>
      <div class="login_link">
        <a href="#">立即注册</a><a href="#">找回密码</a>
      </div>
    </div>
  <Tabbar/>

  </div>
</template>

<script>
import Header from "@/components/Header";
import Tabbar from "@/components/Tabbar";
export default {
  name: "Mine",
  components: {
    Header,
    Tabbar
  }
};
</script>

<style scoped>
.login_text {
  width: 100%;
  margin-bottom: 5px;
  height: 40px;
  outline: none;
  border:none;
  text-indent: 10px;
  border-bottom: #eee solid 1px;
  font-size:14px;
}
#login_btn{
  border-radius: 3px;
  display:block;
  width: 90%;
  font-size: 20px;
  height: 50px;
  margin:10px auto;
  background-color: #ffd600;
  color: #fff;
  border: none
}
.login_link a{
  text-decoration: none;
  margin:0 5px;
  font-size:12px;
  color:#ffd600
}
.login_link a:nth-of-type(1){
  float: left;
}
.login_link a:nth-of-type(2){
  float: right;
}
</style>