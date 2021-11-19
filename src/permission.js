// 权限拦截 导航守卫 路由守卫 router
import router from '@/router' // 引入路由实例
import store from '@/store' // 引入vuex store 实例
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/404'] // no redirect whitelist
// 路由的前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 首先判断有无token
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/') // 跳到首页
    } else {
      next() // 直接放行
    }
  } else {
    // 没有token，判断是不是在白名单中
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login') // 跳到登录界面
    }
  }
  NProgress.done()
})
router.afterEach(function() {
  NProgress.done() // 关闭进度条
})
