<template>
  <div id="content">
    <Loading v-if="isLoading" />
    <mt-index-list id="index_list" v-else>
      <mt-index-section index="热门">
        <!-- <Scroller> -->
        <mt-cell
          v-for="item in hotList"
          :key="item.id"
          :title="item.nm"
          @click.native="handleToCity(item.nm,item.id)"
        ></mt-cell>
        <!-- </Scroller> -->
      </mt-index-section>
      <!-- <Scroller> -->
      <mt-index-section v-for="item in cityList" :key="item.index" :index="item.index">
        <mt-cell
          v-for="city in item.list"
          :title="city.nm"
          :key="city.id"
          @click.native="handleToCity(city.nm,city.id)"
        ></mt-cell>
      </mt-index-section>
      <!-- </Scroller> -->
    </mt-index-list>
  </div>
</template>

<script>
export default {
  name: "CityList",
  data() {
    return {
      cityList: [],
      hotList: [],
      isLoading: true
    };
  },
  mounted() {
    let cityList = window.sessionStorage.getItem("cityList");
    let hotList = window.sessionStorage.getItem("hotList");
    if (cityList && hotList) {
      this.cityList = JSON.parse(cityList);
      this.hotList = JSON.parse(hotList);
      this.isLoading = false;
    } else {
      this.axios.get("/api/cityList").then(res => {
        if (res.data.msg === "ok") {
          console.log(res.data);
          let cities = res.data.data.cities;
          let { cityList, hotList } = this.formatCity(cities);
          this.cityList = cityList;
          this.hotList = hotList;
          this.isLoading = false;
          window.sessionStorage.setItem("cityList", JSON.stringify(cityList));
          window.sessionStorage.setItem("hotList", JSON.stringify(hotList));
        }
      });
    }
  },
  methods: {
    handleToCity(nm, id) {
      this.$store.commit("city/CITY_INFO", { nm, id });
      window.sessionStorage.setItem('nowNM',nm)
      window.sessionStorage.setItem('nowID',id)
      this.$router.push('/movie/nowplaying')
    },
    formatCity(cities) {
      let cityList = [],
        hotList = [];
      for (let i = 0; i < cities.length; i++) {
        if (cities[i].isHot === 1) {
          hotList.push(cities[i]);
          this.hotList = hotList;
        }
        let firstLetter = cities[i].py.slice(0, 1).toUpperCase();
        if (toComCity(firstLetter)) {
          cityList.push({
            index: firstLetter,
            list: [
              {
                nm: cities[i].nm,
                id: cities[i].id
              }
            ]
          });
        } else {
          for (let j = 0; j < cityList.length; j++) {
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push({
                nm: cities[i].nm,
                id: cities[i].id
              });
            }
          }
        }
      }
      cityList.sort((a, b) => {
        if (a.index > b.index) {
          return 1;
        } else if (a.index < b.index) {
          return -1;
        } else {
          return 0;
        }
      });
      console.log(this.hotList);
      function toComCity(firstLetter) {
        for (let i = 0; i < cityList.length; i++) {
          if (firstLetter == cityList[i].index) return false;
        }
        return true;
      }
      return { cityList, hotList };
    }
  }
};
</script>

<style scoped>
/* #index_list {
  height: 100%;
} */
#content {
  display: flex;
}
</style>