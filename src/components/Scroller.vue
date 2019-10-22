<template>
  <div ref="sWrapper" id="sWrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroller",
  mounted() {
    let scroll = new BScroll(this.$refs.sWrapper, {
      tap: true,
      probeType: 1,
      click: true
    });
    console.log('scroll')
  }
};
</script>

<style scoped>
#sWrapper {
  height: 100%;
}
</style>