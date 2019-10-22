<template>
  <div id="content">
    <div class="searchbox">
      <div class="search_input">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" name id="sbox" v-model="searchValue" />
      </div>
    </div>
    <Loading v-if="isLoading"/>
    <div class="search_result" v-else>
      <h3>搜索电影</h3>
            <div v-if="!Res" style="text-align:center;color:#aaa">
                <br />
                {{resultMsg}}
            </div>
      <ul v-else>
        <li v-for="item in searchList" :key="item.id">
          <div class="movieimg">
            <div class="listimg">
              <!-- <img src="" alt=""> -->
              <img :src="item.img|setWH('170.130')" alt />
            </div>
          </div>
          <div class="movietext">
            <div>
              {{item.nm}}
              <span id="score">{{item.sc}}</span>
            </div>
            <div>{{item.wish}}人想看</div>
            <div>主演:{{item.star}}</div>
            <div>{{item.rt}}上映</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
       isLoading: false,
            searchList: [],
            searchValue: "",
            Res: false,
            resultMsg: "请输入搜索内容"
    };
  },
  watch: {
    searchValue(val) {
      this.isLoading = true;
      // if (!val) {
      //     this.resultMsg = "请输入搜索内容";
      // }
      this.cancelRequest();
      let that = this;

      this.axios
        .get("/api/searchList?cityId=10&kw=" + val, {
          cancelToken: new this.axios.CancelToken(function executor(c) {
            that.source = c;
          })
        })
        .then(res => {
          this.isLoading = false;

          let msg = res.data.msg;
          let movies = res.data.data.movies;
          if (msg && movies) {
            this.searchList = movies.list;
            this.Res = true;
          } else if (!movies && val) {
            this.Res = false;
            this.resultMsg = "抱歉，没有找到";
          } else if (!val && !movies) {
            this.resultMsg = "请输入搜索内容";
            this.Res = false;
          }
        })
        .catch(err => {
          if (this.axios.isCancel(err)) {
            console.log("Request canceled", err.message);
          } else {
            console.log(err);
          }
        });
    }
  },
  methods: {
    cancelRequest() {
      if (typeof this.source === "function") {
        this.source("中止请求");
      }
    }
  }
};
</script>

<style scoped>
#score {
  float: right;
  color: #f39c12;
}
.searchbox {
  padding: 8px 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}
.search_input {
  padding: 0 10px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  line-height: 20px;
}
.search_input i {
  font-size: 16px;
  padding: 4px 0;
}
#sbox {
  border: none;
  font-size: 13px;
  color: #333;
  padding: 4px 0;
  outline: none;
  margin-left: 5px;
  width: 100%;
}

.search_result h3 {
  margin: 0;
  padding: 9px 15px;
  font-size: 15px;
  color: #999;
  border-bottom: 1px solid #eee;
}
.listimg img {
  max-width: 100%;
  max-width: 100%;
}
ul {
  background-color: #fff;
  height: 100px;
}
li {
  /* margin:0 10px; */
  display: flex;
  border-bottom: #eee solid 1px;
}
li > div {
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
  font-size: 15px;
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

.listimg {
  background-color: #fff;
  width: 60px;
  height: 80px;
  margin: 10px auto;
}
</style>