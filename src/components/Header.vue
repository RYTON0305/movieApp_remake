<template>
  <div class="cont">
    <header id="header">
     <slot></slot>  <h3 class="title">{{title}}</h3>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  props: ["title"]
};
</script>

<style scoped>
.cont {
  height: 50px;
}
#header {
  position:fixed;
  top:0;
  height: 50px;
  width: 100%;
  background-color: #f1c40f;
}
.title {
  margin: 0;
  height: 100%;
  text-align: center;
  line-height: 50px;
}
</style>