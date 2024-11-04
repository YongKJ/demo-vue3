import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import "@/common/module/yuque/antd.css";
import 'element-plus/dist/index.css';
import {ElementUI} from "@/common/config/ElementUI";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import MavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import 'viewerjs/dist/viewer.css';
import VueViewer from 'v-viewer';
import VueCookies from 'vue3-cookies'
// @ts-ignore
import VueClipboard from 'vue3-clipboard'
// @ts-ignore
import Vue3VideoPlayer from '@cloudgeek/vue3-video-player';
import '@cloudgeek/vue3-video-player/dist/vue3-video-player.css'

VueViewer.setDefaults({
    "inline": false,
    "button": true,
    "navbar": true,
    "title": true,
    "toolbar": true,
    "tooltip": true,
    "movable": true,
    "zoomable": true,
    "rotatable": true,
    "scalable": true,
    "transition": true,
    "fullscreen": true,
    "keyboard": true,
});

NProgress.configure({easing: 'ease', speed: 500, showSpinner: false});

router.beforeEach((to, from, next) => {
    NProgress.start();
    switch (to.path) {
        case "/browse":
        case "/login":
        case "/share":
        case "/sharePlus":
        case "/edit":
        case "/test":
        case "/chatLogin":
        case "/gpt":
        case "/gptLogin":
        case "/answer":
        case "/webrtc":
        case "/janus":
        case "/audio":
        case "/stream":
        case "/janusWorker":
        case "/socketWorker":
        case "/visual":
        case "/proxyLogin":
        case "/shadowSocks":
        case "/agentLogin":
        case "/flyBirdCloud":
        case "/ariaDownload":
        case "/visualDemo":
        case "/treadLogin":
        case "/treadRegister":
        case "/treadReset":
        case "/tread":
            document.title = <string>to.meta.title;
            next();
            break;
        case "/":
            next();
            break;
        default:
            next({path: "/"});
    }
});

router.afterEach(() => {
    NProgress.done();
});

createApp(App)
    .use(router)
    .use(ElementUI)
    .use(VueViewer)
    .use(VueCookies)
    .use(MavonEditor)
    .use(Vue3VideoPlayer, {
        lang: 'zh-CN'
    })
    .use(VueClipboard, {
        autoSetContainer: true,
        appendToBody: false,
    })
    .mount('#app')
