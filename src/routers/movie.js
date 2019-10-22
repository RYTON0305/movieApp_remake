export default {
  path: '/movie',
  component: () => import('@/views/Movie'),
  children: [
    {
      path: 'city',
      component: () => import('@/components/CityList')
    }, {
      path: 'nowplaying',
      component: () => import('@/components/NowPlaying')
    }, {
      path: 'comingsoon',
      component: () => import('@/components/ComingSoon')
    }, {
      path: 'search',
      component: () => import('@/components/Search')
    },
    {
      path: 'detail/now/:movieID',
      components: {
        detail: () => import('@/components/Detail')
      }, props: {
        detail: true
      }
    },
    {
      path: 'detail/coming/:movieID',
      components: {
        detail: () => import('@/components/Detail')
      }, props: {
        detail: true
      }
    },
    {
      path: '/movie',
      redirect: '/movie/nowplaying'
    }
  ]
}