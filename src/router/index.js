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
        meta: {
            bread: ['首页']
        },
        component: () => import('@/views/Home')
    }]
}, {
    path: '/users',
    name: 'Users',
    component: () => import('@/components/Layout'),
    children: [{
        path: '/',
        meta: {
            bread: ['用户管理', '用户列表']
        },
        component: () => import('@/views/Users')
    }]
}, {
    path: '/roles',
    name: 'Roles',
    component: () => import('@/components/Layout'),
    children: [{
        path: '/',
        meta: {
            bread: ['权限管理', '角色列表']
        },
        component: () => import('@/views/Roles')
    }]
}, {
    path: '/goods',
    name: 'Goods',
    component: () => import('@/components/Layout'),
    children: [{
        path: '/',
        meta: {
            bread: ['商品管理', '商品列表']
        },
        component: () => import('@/views/Goods')
    }]
}, {
    path: '/goods/add',
    name: 'GoodsAdd',
    component: () => import('@/components/Layout'),
    children: [{
        path: '/',
        meta: {
            bread: ['商品管理', '商品添加']
        },
        component: () => import('@/views/Goods/GoodsAdd')
    }]
}, {
    path: '/params',
    name: 'Params',
    component: () => import('@/components/Layout'),
    children: [{
        path: '/',
        meta: {
            bread: ['商品管理', '分类参数']
        },
        component: () => import('@/views/Params')
    }]
}, {
    path: '/categories',
    name: 'Categories',
    component: () => import('@/components/Layout'),
    children: [{
        path: '/',
        meta: {
            bread: ['商品管理', '商品分类']
        },
        component: () => import('@/views/Categories')
    }]
}, {
    path: '/rights',
    name: 'Rights',
    component: () => import('@/components/Layout'),
    children: [{
        path: '/',
        meta: {
            bread: ['权限管理', '权限列表']
        },
        component: () => import('@/views/Rights')
    }]
}, {
    path: '/reports',
    name: 'Rights',
    component: () => import('@/components/Layout'),
    children: [{
        path: '/',
        meta: {
            bread: ['数据统计', '数据报表']
        },
        component: () => import('@/views/Rights')
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