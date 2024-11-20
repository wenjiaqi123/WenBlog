import Layout from './Layout.vue'
import busuanzi from 'busuanzi.pure.js'
import VisitorPanel from "./VisitorPanel.vue";
import {inBrowser} from "vitepress";

/**
 * 帮我整合一下
 */
export default {
    Layout,
    NOT_FOUND_ERROR: '404',
    enhanceApp({ app, router, siteData }) {
        app.component('VisitorPanel', VisitorPanel)
        if (inBrowser) {
            router.onAfterRouteChanged = () => {
                busuanzi.fetch();
            };
        }
    }
}