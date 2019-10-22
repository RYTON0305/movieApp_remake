const state= {
  nm:window.sessionStorage.getItem('nowNM')||'北京',
  id:window.sessionStorage.getItem('nowID')||'1'
};
const mutations= {
  CITY_INFO(state,playload){
      state.nm=playload.nm;
      state.id=playload.id;
      console.log(state.nm)
  }
};
const actions= {
  // CITY_CHANGE(context,playload){
  //   context.commit('CITY_INFO',playload)
  // }
};
export default{
  namespaced: true,
  state,
  mutations,
  actions,


}