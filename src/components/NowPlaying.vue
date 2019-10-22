<template>
  <div id="content">
    <Loading v-if="isLoading" />
    <Scroller v-else>
      <ul class="List">
        <mt-loadmore :top-method="loadTop" ref="loadmore">
          <li class="listItem" v-for="item in movieList" :key="item.id">
            <div class="movieimg">
              <div class="listimg" @click="handleToDetail(item.id)">
                <!-- <img src="" alt=""> -->

                <img
                  class="z"
                  @click="handleToDetail(item.id)"
                  :src="item.img|setWH('170.130')"
                  alt
                />
              </div>
            </div>
            <div class="movietext">
              <div @click="handleToDetail(item.id)">{{item.nm}}</div>
              <div>
                观众评
                <span class="score">{{item.sc}}</span>
              </div>
              <div>主演:{{item.star}}</div>
              <div>{{item.showInfo}}</div>
            </div>
            <div class="ticket">
              <button @click="handleToDetail(item.id)">购票</button>
            </div>
          </li>
        </mt-loadmore>
      </ul>
    </Scroller>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  name: "NowPlaying",
  data() {
    return {
      movieList: [],
      isLoading: true,
      preCityID: -1
    };
  },
  mounted() {
    this.axios.get("/api/getLocation").then(res => {
      if (res.data.msg === "ok") {
        console.log(res.data.data);
        let locNM = res.data.data.nm;
        let locID = res.data.data.id;
        if (locID == this.$store.state.city.id) {
          return;
        } else {
          console.log(locID == this.$store.state.city.id);
          MessageBox.confirm("", {
            title: "定位",
            message: "定位到您所在城市为 " + locNM,
            confirmButtonText: "切换定位",
            confirmButtonHighlight: true
          })
            .then(action => {
              if (action == "confirm") {
                this.axios
                  .get("/api/movieOnInfoList?cityId=" + locID)
                  .then(res => {
                    // console.log(res);
                    // if (res.data.msg === "ok") {
                    //   let movieList = res.data.data.movieList;
                    //   this.$store.state.city.id=locID;
                    //   this.$store.state.city.nm=locNM;

                    //   this.movieList = movieList;
                    //   // this.isLoading = false;
                    //   console.log(movieList);
                    //   this.preCityID = locID;
                    // }
                    this.$store.commit("city/CITY_INFO", {
                      nm: locNM,
                      id: locID
                    });
                    window.sessionStorage.setItem("nowNM", locNM);
                    window.sessionStorage.setItem("nowID", locID);
                    window.location.reload();
                  });
              }
            })
            .catch(err => {
              if (err == "cancel") {
                //取消的回调
                console.log("取消");
              }
            });
        }
      }
    });
  },
  activated() {
    let cityID = this.$store.state.city.id;
    if (cityID === this.preCityID) return;
    this.isLoading = true;
    console.log(this.$store.state.city.nm);
    this.axios.get("/api/movieOnInfoList?cityId=" + cityID).then(res => {
      console.log(res);
      if (res.data.msg === "ok") {
        let movieList = res.data.data.movieList;
        this.movieList = movieList;
        this.isLoading = false;
        console.log(movieList);
        this.preCityID = cityID;
      }
    });
  },
  methods: {
    wok() {
      console.log("wok");
    },
    handleToDetail(movieID) {
      console.log("chuan");
      this.$router.push("/movie/detail/now/" + movieID);
    },
    loadTop() {
      let cityID = this.$store.state.city.id;
      // if (cityID === this.preCityID) return;
      // this.isLoading = true;
      console.log(this.$store.state.city.nm);
      this.axios.get("/api/movieOnInfoList?cityId=" + cityID).then(res => {
        console.log(res);
        if (res.data.msg === "ok") {
          let movieList = res.data.data.movieList;
          this.movieList = movieList;
          // this.isLoading = false;
          console.log(movieList);
          this.preCityID = cityID;
        }
      });
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded();
      }, 500);
    }
  }
};
</script>

<style scoped>
.z {
  z-index: 999 !important;
}
.score {
  color: #f39c12;
  font-weight: 600;
  font-size: 14px;
}
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