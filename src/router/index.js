import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style
import {getToken} from "@/utils/sessionUtil";
import MarkdownEditor from "@/components/Editor/MarkdownEditor";
Vue.use(Router);

export const constantRoutes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: {
            title: 'Home',
        }
    },
    {
        path: '/photos',
        name: 'photos',
        component: () => import('@/views/photo/index'),
        meta: {
            title: 'Photos',
        }
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/login/index'),
        meta: {
            title: 'Login',
        }
    },
    {
        name: 'new',
        path: '/mEditor',
        component: MarkdownEditor,
        hidden: true,
        meta: {
            title: 'MarkdownEditor',
        }
    },
    {
        name: 'edit',
        path: '/mEditor/:id',
        component: MarkdownEditor,
        hidden: true,
        meta: {
            title: 'MarkdownEditor',
        }
    },
    {
        path: '/articles',
        name: 'article_browse',
        component: () => import('@/views/article/browse'),
        meta: {
            title: 'Articles',
            keepAlive: true
        }
    },
    {
        name: 'article_detail',
        path: '/articles/:id',
        component: () => import('@/views/article/detail'),
        hidden: true,
        meta: {
            title: 'Article Detail',
        }
    },
    {
        name: 'backend_console',
        path: '/console',
        component: () => import('@/views/console/index'),
        hidden: true,
        meta: {
            title: 'Console',
        }
    },
    {
        name: 'ctgManage',
        path: '/console/:panel_name',
        component: () => import('@/views/console/index'),
        hidden: true,
        meta: {
            title: 'Console',
        }
    },
    {
        name: 'prfManage',
        path: '/console/:panel_name',
        component: () => import('@/views/console/index'),
        hidden: true,
        meta: {
            title: 'Console',
        }
    },
    {
        path: '/aboutMe',
        component: () => import('@/views/profile/developerInfo'),
        hidden: true,
        meta: {
            title: 'AboutMe',
        }
    },
    {
        path: '/contactMe',
        component: () => import('@/views/profile/ContactMe'),
        hidden: true,
        meta: {
            title: 'ContactMe',
        }
    },
];
const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
});

const router = createRouter();
const whiteList = ['/login', '/', '/aboutMe', '/contactMe', '/articles', '/photos'];
router.beforeEach(async(to, from, next) => {
    NProgress.start();
    document.title = to.meta.title;

    const hasToken = getToken();

    if (hasToken) {
        if (to.path === '/login') {
            next({ path : '/'});
            NProgress.done();
        } else {
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1 || to.path.startsWith('/articles')) {
            next();
        } else {
            next('/login');
            NProgress.done();
        }
    }

});
router.afterEach(() => {
    NProgress.done();
});
export default router