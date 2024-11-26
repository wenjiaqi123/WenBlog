import {defineConfig} from 'vitepress'
// import {generate_sidebar} from './utils/generate_sidebar.js'
import generate_nav from './utils/generate_nav.js'
import generate_sidebar from './utils/generate_sidebar.js'

export default defineConfig({
    /**
     * 站点配置
     */
    lang: 'zh',
    title: "Blog",
    titleTemplate: '闻',
    description: "闻家奇",
    head: [['link', {rel: 'icon', href: '/favicon.ico'}]],
    srcDir: 'src',      //配置了 srcDir,注意需要把类似 public 的文件夹放在 src 下
    appearance: true,   //配置了 appearance,可以在主题配置中配置 appearance
    lastUpdated: true,  //开启最后更新时间,时间是根据提交到 Github 上时间计算的,需要部署之后才能看到效果
    lastUpdatedText: '最后更新时间',
    markdown: {         //配置 markdown
        lineNumbers: true,      //开启行号
        image: {
            lazyLoading: true,  //开启图片懒加载
        }
    },
    vite: {},
    vue: {},
    ignoreDeadLinks: true,  //忽略死链接


    /**
     * 默认主题配置
     */
    themeConfig: {
        i18nRouting: true,      //开启国际化路由,需要添加多语言配置
        logo: '/logo.jpg',      //配置 logo,logo 放在 public 文件夹下
        siteTitle: '闻家奇',     //配置 logo 后面的站点标题
        search: {               //开启搜索
            provider: 'local',
            options: {
                translations: {
                    button: {
                        buttonText: "搜一搜",          //搜索框的 placeholder
                        buttonAriaLabel: "搜索文档",

                    },
                    modal: {                            //搜索结果的弹窗
                        resetButtonTitle: "清除搜索条件",
                        displayDetails: "显示详情",
                        noResultsText: "未找到相关结果,尝试更换关键词",
                        footer: {
                            selectText: "确定",
                            navigateText: "切换",
                            closeText: "关闭",
                        },
                    },
                },
            }
        },
        darkModeSwitchLabel: "深浅模式",
        nav: generate_nav(),

        /**
         * 基本使用:可以 [] 类型,单侧边栏,手动指定,切换上面的 nav 时 sidebar不会变化,除非手动修改,应用场景较少
         * 多侧边栏:但是也不会使用,因为不好维护,应用场景较少
         *             '/guide': [
         *                 {
         *                     text: 'first_chapter',
         *                     collapsed: true,
         *                     items: [
         *                         {text: 'one', link: '/guide/first_chapter/one'},
         *                         {text: 'two', link: '/guide/first_chapter/two'},
         *                     ]
         *                 },
         *                 {
         *                     text: 'secondary_chapter',
         *                     collapsed: true,
         *                     items: [
         *                         {text: 'three', link: '/guide/secondary_chapter/three'},
         *                         {text: 'four', link: '/guide/secondary_chapter/four'},
         *                     ]
         *                 }
         *             ],
         *  多侧边栏:脚本自动生成,根据 markdown 文件夹生成,应用场景较多
         */
        sidebar: {
            '/frontend/html': generate_sidebar('/frontend/html'),
            '/frontend/css': generate_sidebar('/frontend/css'),
            '/frontend/javaScript': generate_sidebar('/frontend/javaScript'),
            '/frontend/vue2': generate_sidebar('/frontend/vue2'),
            '/frontend/vue3': generate_sidebar('/frontend/vue3'),
            '/frontend/miniapp': generate_sidebar('/frontend/miniapp'),
            '/frontend/qt': generate_sidebar('/frontend/qt'),


            '/Java/Maven': generate_sidebar('/Java/Maven'),
            '/Java/Concurrent': generate_sidebar('/Java/Concurrent'),
            '/Java/SpringBoot': generate_sidebar('/Java/SpringBoot'),
            '/Java/SpringMVC': generate_sidebar('/Java/SpringMVC'),
            '/Java/Mybatis': generate_sidebar('/Java/Mybatis'),
            '/Java/SpringDataJPA': generate_sidebar('/Java/SpringDataJPA'),
            '/Java/SpringCloudAlibaba': generate_sidebar('/Java/SpringCloudAlibaba'),
            '/Java/JavaVirtualMachine': generate_sidebar('/Java/JavaVirtualMachine'),

            '/Golang': generate_sidebar('/Golang'),

            '/Database/MySQL': generate_sidebar('/Database/MySQL'),
            '/Database/Redis': generate_sidebar('/Database/Redis'),
            '/Database/Postgresql': generate_sidebar('/Database/Postgresql'),
            '/Database/Design': generate_sidebar('/Database/Design'),
            '/Database/ElasticSearch': generate_sidebar('/Database/ElasticSearch'),
            '/Database/MongoDB': generate_sidebar('/Database/MongoDB'),
            '/Database/Neo4j': generate_sidebar('/Database/Neo4j'),
            '/Database/Milvus': generate_sidebar('/Database/Milvus'),
            '/Database/ClickHouse': generate_sidebar('/Database/ClickHouse'),
            '/Database/HBase': generate_sidebar('/Database/HBase'),


            '/dsa': generate_sidebar('/dsa'),
            '/other/DesignPatterns': generate_sidebar('/other/DesignPatterns'),
            '/other/JetBrains': generate_sidebar('/other/JetBrains'),
        },
        aside: 'left',

        socialLinks: [
            {icon: 'wechat', link: '/social/social_wechat'},
            {icon: 'github', link: 'https://github.com/wenjiaqi123'},
            {icon: 'gitee', link: 'https://gitee.com/wjq303812'},
            {icon: 'csdn', link: 'https://blog.csdn.net/Wen_J_Q'}
        ],
        returnToTopLabel: "返回顶部",
        outline: 'deep',
        docFooter: {
            prev: "上一页",
            next: "下一页"
        },
        footer: {
            // message: 'Released under the MIT License',
            copyright: 'Copyright © wen7'
        },
        // carbonAds: {
        //     code: 'your-carbon-code',
        //     placement: 'your-carbon-placement'
        // }
    }
})