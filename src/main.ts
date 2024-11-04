import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css';
import { ElementUI } from "@/common/config/ElementUI";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import VueCookies from 'vue3-cookies'

NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });

router.beforeEach((to, from, next) => {
    NProgress.start();
    switch (to.path) {
        case "/test":
            document.title = <string>to.meta.title;
            next();
            break;
        case "/":
            next();
            break;
        default:
            next({ path: "/" });
    }
});

router.afterEach(() => {
    NProgress.done();
});

createApp(App)
    .use(router)
    .use(ElementUI)
    .use(VueCookies)
    .mount('#app')
