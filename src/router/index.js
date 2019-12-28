import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Comment from "../views/Comment.vue"

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: Comment,
        children: [{
            path: '',
            name: 'home',
            component: Home,
        }]
    },
    {
        path: '/paging',
        component: Comment,
        children: [{
            path: '',
            name: 'paging',
            component: () =>
                import ('../views/Paging')
        }]
    },
    {
        path: '/statisti',
        component: Comment,
        children: [{
            path: '',
            name: 'statisti',
            component: () =>
                import ('../views/Statisti')
        }]
    },
    {
        path: '/see',
        component: Comment,
        children: [{
            path: '',
            name: 'see',
            component: () =>
                import ('../views/See')
        }]
    },
    {
        path: '/compile',
        component: Comment,
        children: [{
            path: '',
            name: 'compile',
            component: () =>
                import ('../views/Compile')
        }]
    },
    {
        path: '/count',
        component: Comment,
        children: [{
            path: '',
            name: 'count',
            component: () =>
                import ('../views/Count')
        }]
    },
    {
        path: '/upload',
        component: Comment,
        children: [{
            path: '',
            name: 'upload',
            component: () =>
                import ('../views/Upload')
        }]
    },
    {
        path: '/export',
        component: Comment,
        children: [{
            path: '',
            name: 'export',
            component: () =>
                import ('../views/Export')
        }]
    },
    {
        path: '/Logout',
        component: Comment,
        children: [{
            path: '',
            name: 'logout',
            component: () =>
                import ('../views/Logout')
        }]
    },
    {
        path: '/label',
        component: Comment,
        children: [{
            path: '',
            name: 'label',
            component: () =>
                import ('../views/Label')
        }]
    },
    {
        path: '/release',
        component: Comment,
        children: [{
            path: '',
            name: 'release',
            component: () =>
                import ('../views/Release')
        }]
    },
    {
        path: '/publish',
        component: Comment,
        children: [{
            path: '',
            name: 'publish',
            component: () =>
                import ('../views/Publish')
        }]
    },
    {
        path: '/Sign',
        name: 'sigin',
        component: () =>
            import ('../views/Sign.vue')
    },
    {
        path: '/Register',
        name: 'register',
        component: () =>
            import ('../views/Register.vue')
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    let user = localStorage.getItem('name')
    if (to.path === '/Sign' || to.path === '/Register') {
        next()
    } else {
        user ? next() : next('/Sign')
        console.log(to);
    }
})
export default router