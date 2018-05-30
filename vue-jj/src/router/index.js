import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     console.log(savedPosition)
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // },
  routes: [
    {path: '/', redirect: '/home'},
    {path: '*', redirect: '/home'},
    {
      path: '/home',
      component: () => import('components/home/home'),
      meta: { title: '首页', keepAlive: true },
      children: [
        {
          path: 'add-article',
          component: () => import('components/add-article/add-article'),
          meta: {title: '分享文章'}
        }
      ]
    },
    {
      path: '/boilingPoint',
      component: () => import('components/boiling-point/boiling-point'),
      meta: { title: '沸点', keepAlive: true },
      children: [
        {
          path: 'add-bp',
          component: () => import('components/add-bp/add-bp'),
          meta: {title: '发布沸点'}
        }
      ]
    },
    {
      path: '/search',
      component: () => import('components/search/search'),
      meta: { title: '搜索', keepAlive: true },
      children: [
        {
          path: 'search-article',
          component: () => import('components/search-article/search-article'),
          meta: {title: '搜索'}
        }
      ]
    },
    {
      path: '/myPage',
      component: () => import('components/myPage/myPage'),
      meta: { title: '我', keepAlive: true },
      children: [
        {
          path: 'favor-article',
          component: () => import('components/favor-article/favor-article'),
          meta: {title: '喜欢的文章'}
        },
        {
          path: 'read-article',
          component: () => import('components/read-article/read-article'),
          meta: {title: '阅读过的文章'}
        },
        {
          path: 'user-collect',
          component: () => import('components/user-collect/user-collect'),
          meta: {title: '收藏集'},
          children: [
            {
              path: 'add-collect-list',
              component: () => import('components/add-collect-list/add-collect-list'),
              meta: {title: '新建收藏集'}
            },
            {
              path: 'collect-article/:id',
              component: () => import('components/collect-article/collect-article'),
              meta: {title: '收藏的文章'}
            }
          ]
        }
      ]
    },
    {
      path: '/self-page',
      component: () => import('components/self-page/self-page'),
      meta: {title: '个人主页'},
      children: [
        {
          path: 'edit-info',
          component: () => import('components/edit-info/edit-info'),
          meta: {title: '个人设置'}
        },
        {
          path: 'user-bp',
          component: () => import('components/user-bp/user-bp'),
          meta: {title: '个人沸点'}
        },
        {
          path: 'user-article',
          component: () => import('components/user-article/user-article'),
          meta: {title: '原创文章'}
        },
        {
          path: 'favor-article',
          component: () => import('components/favor-article/favor-article'),
          meta: {title: '喜欢的文章'}
        },
        {
          path: 'user-collect',
          component: () => import('components/user-collect/user-collect'),
          meta: {title: '收藏集'},
          children: [
            {
              path: 'add-collect-list',
              component: () => import('components/add-collect-list/add-collect-list'),
              meta: {title: '新建收藏集'}
            },
            {
              path: 'collect-article/:id',
              component: () => import('components/collect-article/collect-article'),
              meta: {title: '收藏的文章'}
            }
          ]
        }
      ]
    },
    {
      path: '/article-detail',
      component: () => import('components/article-detail/article-detail'),
      meta: { title: '文章详情' },
      children: [
        {
          path: 'add-collect-list',
          component: () => import('components/add-collect-list/add-collect-list'),
          meta: {title: '新建收藏集'}
        }
      ]
    },
    {
      path: '/boiling-point-detail',
      component: () => import('components/boiling-point-detail/boiling-point-detail'),
      meta: {title: '沸点详情'}
    }
  ]
})

router.beforeEach(function (to, from, next) {
  document.title = to.meta.title
  next()
})

export default router
