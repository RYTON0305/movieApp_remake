<template>
  <div id="content">
    <Header title="影片详情" class="slide-ani">
      <a id="back" @click="handelToBack">&lt;</a>
    </Header>
    <Loading v-if="isLoading"/>
    <div v-else id="wrapper">
      <div class="detail_list_content">
        <div
          class="bgImg"
          :style="{'background-image' : 'url('+ detailMovie.img.replace(/w\.h/,'148.208') +')'}"
        ></div>
        <div class="detail_list_img">
          <img :src="detailMovie.img|setWH('108.150')" alt />
        </div>
        <div class="detail_list_info">
          <h2>{{detailMovie.nm}}</h2>
          <p>{{detailMovie.enm}}</p>
          <p>{{detailMovie.sc}}分</p>
          <p>{{detailMovie.cat}}</p>
          <p>{{detailMovie.fra}}/{{detailMovie.dur}}分钟</p>
          <p>{{detailMovie.pubDesc}}</p>
        </div>
      </div>
      <div class="detail_intro">
        <p>{{detailMovie.dra}}</p>
      </div>
      <div class="detail_photo">
        <!-- <ul>
          <li v-for="item in detailMovie.photos" :key="item"><img :src="item|setWH('150.180')" alt=""></li>
        </ul>-->
        <!-- <mt-swipe :auto="1000" :show-indicators="false" :continuous='true'>
          <mt-swipe-item v-for="item in detailMovie.photos" :key="item">
            <img :src="item|setWH('150.120')" alt />
          </mt-swipe-item>
        </mt-swipe>-->

        <swiper :options="swiperOption">
          <swiper-slide v-for="item in detailMovie.photos" :key="item">
            <img :src="item|setWH('80.60')" alt />
          </swiper-slide>
          <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";

import Header from "@/components/Header";
export default {
  name: "Detail",
  data() {
    return {
      isLoading: true,
      detailMovie: [],
      swiperOption: {
        slidesPerView: 3,
        freeMode: true,
        freeModeSticky: true
        // pagination: {
        //   el: ".swiper-pagination"
        // }
      }
      // swiperSlides: [1, 2, 3, 4, 5]
    };
  },
  props: ["movieID"],
  methods: {
    handelToBack() {
      console.log("tiao");
      this.$router.back();
    }
  },
  mounted() {
    this.isLoading = true;
    this.axios.get("/api/detailmovie?movieId=" + this.movieID).then(res => {
      if (res.data.msg === "ok") {
        let detailMovie = res.data.data.detailMovie;
        this.detailMovie = detailMovie;
        //console.log(detailMovie);
        this.isLoading = false;
      }
    });
  },
  components: {
    Header,
    swiper,
    swiperSlide
  }
};
</script>

<style scoped>
.slide-ani {
  animation: 0.3s slideMove;
}
@keyframes slideMove {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
.bgImg {
  width: 100%;
  height: 100%;
  background-color: #40454d;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  filter: blur(20px);
  background-size: cover;
  background-repeat: no-repeat;
}
#content {
  background-color: #fff;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
}
#wrapper {
  height: 100%;
  /* background-color: lightgreen; */
  overflow: hidden;
}
.detail_list_content::after {
  content: "";
  position: absolute;
  opacity: 0.55;
  width: 100%;
  height: 100%;
  background-color: #40454d;
  top: 0;
  left: 0;
  z-index: 1;
}
.detail_list_content {
  height: 200px;
  width: 100%;
  overflow: hidden;
  position: relative;
  /* display: flex; */

  /* background-color: ; */
}
.detail_photo {
  height: 140px;
  touch-action: pan-x;
  padding-left: 10px;
}

.detail_list_img {
  margin: 20px;
  width: 108px;
  height: 150px;
  background-color: #000;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.detail_list_img img {
  max-width: 108px;
  max-height: 150px;
}

.detail_list_info {
  position: absolute;
  left: 150px;
  top: 20px;
  z-index: 2;
}
.detail_list_info h2 {
  font-size: 20px;
  color: #fff;
  font-weight: normal;
  line-height: 40px;
  margin: 0;
  /* z-index: 2; */
}
.detail_list_info p {
  margin: 0;
  line-height: 20px;
  font-size: 14px;
  color: #ccc;
}
.detail_intro p {
  padding: 15px;
  margin: 0;
}
#back {
  display: inline-block;
  width: 40px;
  line-height: 50px;

  font-size: 20px;
  position: absolute;
  top: 0;
  left: 5px;
}
</style>