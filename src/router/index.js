import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Layout',
    component: () => import('@/components/Layout'),
    redirect: '/home'
}, {
    path: '/home',
    name: 'Home',
    component: () => import('@/components/Layout'),
    children: [{
        path: '/',
        component: () => import('@/views/Home/index')
    }]
}, {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/login')
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (!window.sessionStorage.getItem('token') && to.path !== '/login') next('/login')
    if (window.sessionStorage.getItem('token') && to.path === '/login') next('/home')
    next()
})

export default router