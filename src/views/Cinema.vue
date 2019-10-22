<template>
  <div id="main">
    <Header title="影院"></Header>
    <div id="wrapper">
      <div class="cont">
        <div id="fixfix">
          <ul class="nav">
            <router-link tag="li" to="/mine">
              全城
              <i class="iconfont icon-sanjiaoxing"></i>
            </router-link>
            <router-link tag="li" to="/mine">
              品牌
              <i class="iconfont icon-sanjiaoxing"></i>
            </router-link>
            <router-link tag="li" to="/mine">
              特色
              <i class="iconfont icon-sanjiaoxing"></i>
            </router-link>
          </ul>
        </div>
      </div>
      <div id="content">
        <Loading v-if="isLoading" />
        <Scroller v-else>
          <ul class="cinemaList">
            <mt-loadmore :top-method="loadTop" ref="loadmore">
              <li v-for="item in cinemas" :key="item.id" class="cinemaItem">
                <div class="cinemaInfo">
                  <span class="cinemaName">{{item.nm}}</span>
                  <span class="priceContent">
                    <span class="price">{{item.sellPrice}}</span>
                    元起
                  </span>
                </div>
                <div class="cinemaAddress">
                  <span class="addr">{{item.addr}}</span>
                  <span>{{item.distance}}</span>
                </div>
                <div class="cinemaCard">
                  <div
                    v-for="(tagValue,tagKey) in item.tag"
                    v-if="tagValue===1"
                    :class="tagKey|cardClass"
                    :key="tagKey"
                  >{{tagKey|cardFormat}}</div>
                </div>
              </li>
            </mt-loadmore>
          </ul>
        </Scroller>
      </div>
    </div>
    <Tabbar />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Tabbar from "@/components/Tabbar";
export default {
  name: "Cinema",
  components: {
    Header,
    Tabbar
  },
  filters: {
    cardFormat: tag => {
      let card = [
        { tag: "allowRefund", value: "退" },
        { tag: "snack", value: "小吃" },
        { tag: "endorse", value: "改签" },
        { tag: "sell", value: "折扣卡" }
      ];
      for (let i = 0; i < card.length; i++) {
        if (tag === card[i].tag) {
          return card[i].value;
        }
      }
    },
    cardClass: tag => {
      let card = [
        { tag: "allowRefund", value: "blue" },
        { tag: "snack", value: "orange" },
        { tag: "endorse", value: "blue" },
        { tag: "sell", value: "orange" }
      ];
      for (let i = 0; i < card.length; i++) {
        if (tag === card[i].tag) {
          return card[i].value;
        }
      }
    }
  },
  data() {
    return {
      cinemas: [],
      isLoading: true
    };
  },
  methods: {
    loadTop() {
      let cityID = this.$store.state.city.id;
      // if (cityID === this.preCityID) return;
      // this.isLoading = true;
      this.axios.get("/api/cinemaList?cityId=" + cityID).then(res => {
        if (res.data.msg === "ok") {
          console.log(res);
          let cinemas = res.data.data.cinemas;
          this.cinemas = cinemas;
          this.preCityID = cityID;
          // this.isLoading = false;
        }
      });
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded();
      }, 500);
    }
  },
  activated() {
    let cityID = this.$store.state.city.id;
    if (cityID === this.preCityID) return;
    this.isLoading = true;
    this.axios.get("/api/cinemaList?cityId=" + cityID).then(res => {
      if (res.data.msg === "ok") {
        console.log(res);
        let cinemas = res.data.data.cinemas;
        this.cinemas = cinemas;
        this.preCityID = cityID;
        this.isLoading = false;
      }
    });
  }
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
  font-weight: 600;
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

.cinemaList {
  padding: 20px;
}

.cinemaItem {
  height: 100px;
  border-bottom: #eee solid 1px;
  margin-bottom: 20px;
}
.cinemaItem:last-of-type {
  margin-bottom: 0;
  border: 0;
}

.cinemaItem > div {
  margin-bottom: 10px;
}
.cinemaInfo span:nth-of-type(2) {
  color: red;
}
.cinemaName {
  display: inline-block;
  width: 70%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.price {
  font-size: 18px;
  margin-left: 10px;
}
.priceContent {
  float: right;
}

.cinemaAddress,
.cinemaCard {
  font-size: 14px;
}
.cinemaAddress {
  color: #666;
}
.cinemaAddress span:last-child {
  float: right;
}
.addr {
  display: inline-block;
  max-width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.cinemaCard div {
  display: inline-block;
  color: #f39c12;
  border: #f39c12 1px solid;
  padding: 0 3px;
  margin: 0 5px 10px 0;
  border-radius: 2px;
}
.orange {
  color: #f39c12 !important;
}
.blue {
  border-color: #03a9f4 !important;
  color: #03a9f4 !important;
}
</style>