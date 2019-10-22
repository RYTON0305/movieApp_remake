<template>
  <div id="content">
    <Loading v-if="isLoading" />
    <Scroller v-else>
      <ul class="List">
        <mt-loadmore :top-method="loadTop" ref="loadmore">
          <li class="listItem" v-for="item in comingList" :key="item.id">
            <div class="movieimg">
              <div class="listimg" @click="handleToDetail(item.id)" >
                <!-- <img src="" alt=""> -->
                <img :src="item.img|setWH('170.130')" alt />
              </div>
            </div>
            <div class="movietext">
              <div @click="handleToDetail(item.id)">{{item.nm}}</div>
              <div>{{item.wish}}人想看</div>
              <div>主演:{{item.star}}</div>
              <div>{{item.rt}}上映</div>
            </div>
            <div class="ticket">
              <button>预售</button>
            </div>
          </li>
        </mt-loadmore>
      </ul>
    </Scroller>
  </div>
</template>

<script>
export default {
  name: "ComingSoon",
  data() {
    return {
      comingList: [],
      isLoading: true,
      preCityID: -1
    };
  },
  methods: {
    handleToDetail(movieID){
      this.$router.push('/movie/detail/coming/'+movieID)
    },
    loadTop() {
      let cityID = this.$store.state.city.id;
      // if (this.preCityID === cityID) return;
      // this.isLoading = true;
      this.axios.get("/api/movieComingList?cityId=" + cityID).then(res => {
        console.log(res);
        if (res.data.msg === "ok") {
          let comingList = res.data.data.comingList;
          this.comingList = comingList;
          console.log(comingList);
          // this.isLoading = false;
          this.preCityID = cityID;
        }
      });
      // this.$refs.loadmore.onTopLoaded()
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded();
      }, 500);
    }
  },
  activated() {
    let cityID = this.$store.state.city.id;
    if (this.preCityID === cityID) return;
    this.isLoading = true;
    this.axios.get("/api/movieComingList?cityId=" + cityID).then(res => {
      console.log(res);
      if (res.data.msg === "ok") {
        let comingList = res.data.data.comingList;
        this.comingList = comingList;
        console.log(comingList);
        this.isLoading = false;
        this.preCityID = cityID;
      }
    });
  }
};
</script>

<style scoped>
.listimg img {
  max-width: 100%;
  max-width: 100%;
}
.List {
  background-color: #fff;
}
.listItem {
  /* margin:0 10px; */
  display: flex;
  border-bottom: #eee solid 1px;
}
.listItem > div {
  height: 100px;
}
.movieimg {
  flex: 3;
  background-color: #fff;
}
.movietext {
  flex: 7;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding-left: 5px;
}
.movietext div:first-child {
  flex: 1.5;
  line-height: 33px;
  color: #000;
  font-weight: 800;
  font-size: 18px;
}
.movietext div {
  flex: 1;
  font-size: 12px;
  color: #777;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 220px;
}
.ticket {
  flex: 2;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ticket button {
  font-size: 14px;
  color: #fff;
  background-color: #f39c12;
  border-radius: 4px;
  border: 0;
  padding: 5px;
  font-family: "微软雅黑";
}
.listimg {
  background-color:#fff;
  width: 60px;
  height: 80px;
  margin: 10px auto;
}
</style>