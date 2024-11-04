import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: {
            name: "test"
        }
    },
    {
        path: "/test",
        name: "test",
        component: () => import("@/views/DemoTest.vue"),
        meta: {
            title: "例子测试"
        }
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
